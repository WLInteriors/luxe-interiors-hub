import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import millworkImage from "@/assets/millwork-library.jpg";
import closetImage from "@/assets/closet-custom.jpg";
import barImage from "@/assets/bar-custom.jpg";
import { ArrowRight } from "lucide-react";

const millworkTypes = [
  {
    title: "Built-in Cabinetry & Shelving",
    description: "Custom floor-to-ceiling built-ins designed for your exact space. Libraries, entertainment centers, and display units crafted with precision joinery and premium hardwoods.",
    image: millworkImage,
  },
  {
    title: "Walk-in Closets & Wardrobes",
    description: "Bespoke closet systems with custom drawers, shoe displays, island dressers, and integrated lighting. Every inch optimized for your wardrobe.",
    image: closetImage,
  },
  {
    title: "Bars & Wine Cellars",
    description: "From intimate wet bars to full wine cellars, our team creates stunning entertaining spaces with custom cabinetry, temperature-controlled storage, and elegant finishes.",
    image: barImage,
  },
  {
    title: "Vanities & Bath Cabinetry",
    description: "Custom bathroom vanities built to your specifications. Floating, freestanding, or integrated — every piece crafted for both beauty and durability.",
    image: closetImage,
  },
  {
    title: "Mudrooms & Laundry",
    description: "Functional yet beautiful storage solutions for everyday living. Custom cubbies, bench seating, and organizational systems that keep your home pristine.",
    image: barImage,
  },
  {
    title: "Home Office & Study",
    description: "Productive spaces deserve exceptional design. Custom desks, bookshelves, and file systems integrated seamlessly into your home's architecture.",
    image: millworkImage,
  },
];

const CustomMillwork = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[60vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={millworkImage} alt="Custom millwork" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-brass mb-4">Our Specialty</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream max-w-2xl">Custom Millwork</h1>
        <p className="mt-4 text-lg text-cream/70 max-w-xl">
          Precision joinery, premium materials, and a flawless finish — crafted in our own shop.
        </p>
      </div>
    </section>

    {/* Millwork Types */}
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {millworkTypes.map((item, i) => (
          <div key={item.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i > 0 ? "mt-20 lg:mt-28" : ""}`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <h3 className="font-serif text-2xl lg:text-3xl mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
              <Link to="/consultation" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brass hover:gap-3 transition-all">
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionHeading label="Get Started" title="Let's Create Something Beautiful" description="Every piece of millwork is made to order. Start with a free consultation." />
        <Link to="/consultation" className="inline-flex items-center gap-2 bg-brass text-accent-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-brass-light transition-colors">
          Schedule Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default CustomMillwork;
