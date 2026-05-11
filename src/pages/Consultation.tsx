import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const Consultation = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
                      <input
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
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project Type</label>
                      <select
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
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Tell Us About Your Project</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-border py-3 text-sm focus:border-brass outline-none transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors">
                    Send Inquiry
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
