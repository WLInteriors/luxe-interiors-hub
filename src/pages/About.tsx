import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import livingRoom from "@/assets/living-room.jpg";
import heroImage from "@/assets/hero-kitchen.jpg";
import { ArrowRight, Award, Users, Clock, Hammer } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", description: "Every detail matters. We hold ourselves to the highest standards of craftsmanship." },
  { icon: Users, title: "Communication", description: "From consultation to final walkthrough, we collaborate closely at every step." },
  { icon: Clock, title: "Reliability", description: "We respect your time and deliver on schedule without compromising quality." },
  { icon: Hammer, title: "Craftsmanship", description: "Our in-house team of artisans brings decades of specialized expertise." },
];

const processSteps = [
  { num: "01", title: "Consultation", description: "We discuss your vision, budget, and timeline in a complimentary meeting." },
  { num: "02", title: "Design & Planning", description: "Our team creates detailed plans, 3D renderings, and material selections." },
  { num: "03", title: "Fabrication", description: "Custom millwork and components are built in our shop to exact specifications." },
  { num: "04", title: "Installation", description: "Expert crews bring the design to life with meticulous attention to detail." },
  { num: "05", title: "Final Walkthrough", description: "We review every element together to ensure your complete satisfaction." },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] flex items-center">
      <div className="absolute inset-0">
        <img src={livingRoom} alt="WL Interiors renovation" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-brass mb-4">Our Story</span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream">About WL Interiors</h1>
      </div>
    </section>

    {/* Story */}
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeading label="Who We Are" title="Building Legacy, One Home at a Time" align="left" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              With over two decades of experience serving Westchester County and the surrounding tri-state area, WL Interiors has earned a reputation as one of the region's most trusted luxury general contractors.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our in-house millwork shop sets us apart — allowing us to design, fabricate, and install custom cabinetry, built-ins, and architectural details with unparalleled quality control.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that every space tells a story. Our philosophy revolves around marrying craftsmanship with elegance, ensuring that each project reflects the unique personality of our clients while embracing sustainable design practices.
            </p>
          </div>
          <img src={heroImage} alt="Kitchen by WL Interiors" className="w-full aspect-[4/3] object-cover" loading="lazy" />
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading label="Our Values" title="What Drives Us" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-brass/10 flex items-center justify-center">
                <v.icon className="w-6 h-6 text-brass" />
              </div>
              <h3 className="font-serif text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process */}
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading label="Our Process" title="How We Work" description="A transparent, collaborative process from start to finish." />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {processSteps.map((step) => (
            <div key={step.num} className="text-center">
              <span className="font-serif text-3xl text-brass">{step.num}</span>
              <h4 className="font-serif text-lg mt-3 mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <SectionHeading label="Get Started" title="Let's Build Something Extraordinary" />
        <Link to="/consultation" className="inline-flex items-center gap-2 bg-brass text-accent-foreground px-10 py-4 text-sm uppercase tracking-widest hover:bg-brass-light transition-colors">
          Schedule Free Consultation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </Layout>
);

export default About;
