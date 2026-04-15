interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ label, title, description, align = "center" }: SectionHeadingProps) => (
  <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}>
    {label && (
      <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-brass mb-4">{label}</span>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium leading-tight">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeading;
