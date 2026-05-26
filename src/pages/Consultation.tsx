import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { Phone, Mail, MapPin, Send, Paperclip, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB per file
const MAX_TOTAL_BYTES = 75 * 1024 * 1024; // 75 MB combined
const ALLOWED_MIME = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "image/heif",
  "video/mp4", "video/quicktime", "video/webm",
];
const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|heic|heif|mp4|mov|webm)$/i;

const formatBytes = (b: number) => b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`;

const Consultation = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const next = [...files];
    let rejected: string | null = null;
    for (const f of Array.from(incoming)) {
      if (next.length >= MAX_FILES) { rejected = `Max ${MAX_FILES} files.`; break; }
      const mimeOk = ALLOWED_MIME.includes(f.type);
      const extOk = ALLOWED_EXT.test(f.name);
      if (!mimeOk && !extOk) { rejected = `"${f.name}" isn't an allowed photo or video.`; continue; }
      if (f.size > MAX_FILE_BYTES) { rejected = `"${f.name}" exceeds ${formatBytes(MAX_FILE_BYTES)}.`; continue; }
      const total = next.reduce((s, x) => s + x.size, 0) + f.size;
      if (total > MAX_TOTAL_BYTES) { rejected = `Total attachments exceed ${formatBytes(MAX_TOTAL_BYTES)}.`; break; }
      if (next.some(x => x.name === f.name && x.size === f.size)) continue;
      next.push(f);
    }
    if (rejected) toast({ title: "Some files weren't added", description: rejected, variant: "destructive" });
    setFiles(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => setFiles(files.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const id = crypto.randomUUID();

    // Upload attachments first
    const attachments: { name: string; path: string; size: number; type: string }[] = [];
    for (const f of files) {
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${id}/${Date.now()}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("consultation-uploads")
        .upload(path, f, { contentType: f.type, upsert: false });
      if (upErr) {
        console.error("Upload failed", upErr);
        toast({ title: "Upload failed", description: `Couldn't upload "${f.name}". Please try again.`, variant: "destructive" });
        setSubmitting(false);
        return;
      }
      attachments.push({ name: f.name, path, size: f.size, type: f.type });
    }

    const payload = {
      id,
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      project_type: form.project || null,
      message: form.message || null,
      attachments,
    };

    const { error } = await supabase.functions.invoke("submit-consultation", { body: payload });

    if (error) {
      console.error("Failed to submit inquiry", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us at (914) 467-0807.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <Layout>
      <SEO
        title="Free Consultation | WL Interiors"
        description="Schedule a complimentary consultation with WL Interiors. Tell us about your renovation or millwork project — we'll respond within 24 hours."
        path="/consultation"
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="sr-only">Schedule Your Free Consultation</h1>
          <SectionHeading
            label="Get In Touch"
            title="Schedule Your Free Consultation"
            description="Tell us about your project and we'll get back to you within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-secondary p-12 text-center">
                  <div className="w-16 h-16 bg-brass/10 mx-auto mb-6 flex items-center justify-center">
                    <Send className="w-8 h-8 text-brass" />
                  </div>
                  <h3 className="font-serif text-2xl mb-3">Thank You!</h3>
                  <p className="text-muted-foreground">We've received your inquiry and will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="consult-name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                      <input
                        id="consult-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="consult-email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
                      <input
                        id="consult-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="consult-phone" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Phone</label>
                      <input
                        id="consult-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="consult-project" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project Type</label>
                      <select
                        id="consult-project"
                        value={form.project}
                        onChange={(e) => setForm({ ...form, project: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      >
                        <option value="">Select...</option>
                        <option value="kitchen">Kitchen Renovation</option>
                        <option value="bathroom">Bathroom Renovation</option>
                        <option value="full">Full Home Renovation</option>
                        <option value="millwork">Custom Millwork</option>
                        <option value="commercial">Commercial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="consult-message" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Tell Us About Your Project</label>
                    <textarea
                      id="consult-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                      Photos & Videos (optional)
                    </label>
                    <input
                      ref={fileInputRef}
                      id="consult-files"
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,video/mp4,video/quicktime,video/webm"
                      onChange={(e) => addFiles(e.target.files)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="consult-files"
                      className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 text-xs uppercase tracking-widest cursor-pointer hover:border-brass transition-colors"
                    >
                      <Paperclip className="w-4 h-4" />
                      Attach Files
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      Up to {MAX_FILES} files, {formatBytes(MAX_FILE_BYTES)} each ({formatBytes(MAX_TOTAL_BYTES)} total). Images and videos only.
                    </p>
                    {files.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {files.map((f, i) => (
                          <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 text-sm bg-secondary px-3 py-2">
                            <span className="truncate">{f.name} <span className="text-muted-foreground text-xs">({formatBytes(f.size)})</span></span>
                            <button
                              type="button"
                              onClick={() => removeFile(i)}
                              aria-label={`Remove ${f.name}`}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button type="submit" disabled={submitting} className="bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60">
                    {submitting ? "Sending…" : "Send Inquiry"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-secondary p-8">
                <h3 className="font-serif text-lg mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <a href="tel:9144670807" className="flex items-center gap-4 text-sm hover:text-brass transition-colors">
                    <Phone className="w-5 h-5 text-brass flex-shrink-0" />
                    (914) 467-0807
                  </a>
                  <a href="mailto:info@westchesterluxuryinteriors.com" className="flex items-center gap-4 text-sm hover:text-brass transition-colors break-all">
                    <Mail className="w-5 h-5 text-brass flex-shrink-0" />
                    info@westchesterluxuryinteriors.com
                  </a>
                  <div className="flex items-start gap-4 text-sm">
                    <MapPin className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" />
                    209 North Street<br />Rye, NY 10580
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-8">
                <h3 className="font-serif text-lg mb-3">Why Choose Us?</h3>
                <ul className="space-y-3 text-sm opacity-80">
                  <li>✓ Hundreds of luxury projects delivered</li>
                  <li>✓ In-house millwork shop</li>
                  <li>✓ Licensed & fully insured</li>
                  <li>✓ Transparent pricing</li>
                  <li>✓ Green building options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultation;
