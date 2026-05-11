import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-kitchen.jpg";
import bathroomImage from "@/assets/wli/bath-marble-brass.jpg";
import millworkImage from "@/assets/millwork-library.jpg";
import livingRoomFullReno from "@/assets/wli/living-room-2.jpg";
import aboutImage from "@/assets/wli/kitchen-7.jpg";

import closetImage from "@/assets/closet-custom.jpg";
import barImage from "@/assets/bar-custom.jpg";
import librariesImage from "@/assets/wli/library-builtin.jpg";
import { ArrowRight, Star, Shield, Ruler, Leaf } from "lucide-react";

const services = [
  {
    title: "Kitchen & Bath",
    description: "Transform your most-used spaces into stunning, functional showpieces with premium finishes and timeless design.",
    image: bathroomImage,
    link: "/projects/kitchens",
  },
  {
    title: "Custom Millwork",
    description: "From built-ins and cabinetry to specialty trim, we design and fabricate pieces that elevate any space.",
    image: millworkImage,
    link: "/millwork/built-ins",
  },
  {
    title: "Full Renovations",
    description: "Complete gut renovations to expert framing, drywall, finishes, flooring — handled with precision and care.",
    image: livingRoomFullReno,
    link: "/projects/full-renovation",
  },
];

const millworkShowcase = [
  { title: "Walk-in Closets", image: closetImage, link: "/millwork/closets" },
  { title: "Custom Bars", image: barImage, link: "/millwork/bars" },
  { title: "Built-in Libraries", image: librariesImage, link: "/millwork/built-ins" },
];

const testimonials = [
  {
    text: "WL Interiors transformed our dated kitchen into a breathtaking space. The attention to detail and craftsmanship is unmatched.",
    author: "Sarah M.",
    location: "Scarsdale, NY",
  },
  {
    text: "From design to completion, the team was professional, communicative, and delivered beyond our expectations. Truly luxury quality.",
    author: "David & Karen T.",
    location: "Rye, NY",
  },
  {
    text: "The custom millwork in our home office is a work of art. Every guest comments on the quality. Couldn't be happier.",
    author: "Michael R.",
    location: "Greenwich, CT",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[90vh] min-h-[600px] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Luxury kitchen renovation by Westchester Luxury Interiors" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-brass mb-6 animate-fade-in">
            Westchester's Premier General Contractor
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] text-cream animate-fade-in-up">
            Luxury Interior Design & Renovation
          </h1>
          <p className="mt-6 text-lg text-cream/80 leading-relaxed animate-fade-in-up animation-delay-200">
            Where craftsmanship meets elegance. Custom millwork, full renovations, and bespoke interiors for discerning homeowners.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Link to="/consultation" className="inline-flex items-center justify-center gap-2 bg-brass text-accent-foreground px-8 py-4 text-sm uppercase tracking-widest hover:bg-brass-light transition-colors">
              Get Your Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/projects/kitchens" className="inline-flex items-center justify-center gap-2 border border-cream/40 text-cream px-8 py-4 text-sm uppercase tracking-widest hover:bg-cream/10 transition-colors">
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Trust Bar */}
    <section className="bg-primary text-primary-foreground py-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap justify-center gap-8 lg:gap-16">
        {[
          { icon: Shield, text: "Licensed & Insured" },
          { icon: Star, text: "5-Star Rated" },
          { icon: Ruler, text: "Custom Millwork Shop" },
          { icon: Leaf, text: "Green Building Options" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-sm tracking-wide">
            <Icon className="w-4 h-4 text-brass" />
            <span className="opacity-80">{text}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="What We Do"
          title="Build Your Dream Space"
          description="From concept to completion, we deliver exceptional craftsmanship across every trade."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <Link key={service.title} to={service.link} className="group">
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <h3 className="font-serif text-xl lg:text-2xl text-cream mb-2">{service.title}</h3>
                  <p className="text-sm text-cream/70 leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-brass text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Custom Millwork Showcase */}
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Signature Craft"
          title="Custom Millwork"
          description="Our in-house millwork shop creates bespoke cabinetry, built-ins, and architectural details with precision joinery and premium materials."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {millworkShowcase.map((item) => (
            <Link key={item.title} to={item.link} className="group relative overflow-hidden aspect-[4/3]">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
              <div className="absolute bottom-6 left-6">
                <h3 className="font-serif text-xl text-cream">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* About Teaser */}
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <img src={aboutImage} alt="Custom kitchen renovation by Westchester Luxury Interiors" className="w-full aspect-[4/3] object-cover" loading="lazy" width={1200} height={800} />
            <div className="absolute -bottom-6 -right-6 bg-brass text-accent-foreground p-6 hidden lg:block">
              <span className="font-serif text-3xl font-bold">20+</span>
              <span className="block text-xs uppercase tracking-widest mt-1">Years Experience</span>
            </div>
          </div>
          <div>
            <SectionHeading
              label="About WL Interiors"
              title="Craftsmanship That Stands the Test of Time"
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our mission is to create homes and commercial spaces that showcase exceptional craftsmanship while being beautiful, functional, and sustainable. We believe in utilizing high-quality materials and innovative building techniques to deliver custom renovations that create environments designed to stand the test of time.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At WL Interiors, we believe that every space tells a story. Our philosophy revolves around marrying craftsmanship with elegance, ensuring that each project reflects the unique personality of our clients.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-brass hover:gap-3 transition-all">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Client Stories"
          title="What Our Clients Say"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="border border-primary-foreground/10 p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brass text-brass" />
                ))}
              </div>
              <p className="text-sm leading-relaxed opacity-80 mb-6">"{t.text}"</p>
              <div>
                <span className="text-sm font-medium">{t.author}</span>
                <span className="block text-xs opacity-50 mt-1">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <SectionHeading
          label="Start Your Project"
          title="Ready to Transform Your Space?"
          description="Schedule a complimentary consultation and let us bring your vision to life."
        />
        <Link to="/consultation" className="inline-flex items-center gap-2 bg-brass text-accent-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-brass-light transition-colors">
          Schedule Free Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
