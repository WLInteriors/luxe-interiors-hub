import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-kitchen.jpg";
import bathroomImage from "@/assets/bathroom-luxury.jpg";
import millworkImage from "@/assets/millwork-library.jpg";
import livingRoom from "@/assets/living-room.jpg";
import closetImage from "@/assets/closet-custom.jpg";
import barImage from "@/assets/bar-custom.jpg";

const categories = [
  { label: "All", value: "all" },
  { label: "Kitchens", value: "kitchens" },
  { label: "Bathrooms", value: "bathrooms" },
  { label: "Full Renovation", value: "renovation" },
  { label: "Millwork", value: "millwork" },
];

const projects = [
  { title: "Modern Farmhouse Kitchen", category: "kitchens", image: heroImage, location: "Scarsdale, NY" },
  { title: "Spa-Inspired Master Bath", category: "bathrooms", image: bathroomImage, location: "Rye, NY" },
  { title: "Custom Library & Study", category: "millwork", image: millworkImage, location: "Greenwich, CT" },
  { title: "Contemporary Great Room", category: "renovation", image: livingRoom, location: "Bronxville, NY" },
  { title: "Bespoke Walk-in Closet", category: "millwork", image: closetImage, location: "Larchmont, NY" },
  { title: "Gentleman's Bar", category: "millwork", image: barImage, location: "Rye, NY" },
];

import { useState } from "react";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Portfolio"
            title="Completed Projects"
            description="Explore our collection of luxury renovations and custom millwork across Westchester and Fairfield counties."
          />

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-5 py-2 text-sm uppercase tracking-wide transition-colors ${
                  filter === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <div key={project.title} className="group relative overflow-hidden aspect-[4/3] cursor-pointer">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg text-cream">{project.title}</h3>
                  <span className="text-xs text-cream/60 uppercase tracking-wide">{project.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
