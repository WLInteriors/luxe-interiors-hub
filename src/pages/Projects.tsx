import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";

// Kitchens
import kBrightOpen from "@/assets/wli/kitchen-bright-open.jpg";
import kOakBrass from "@/assets/wli/kitchen-oak-brass.jpg";
import kMarbleIsland from "@/assets/wli/kitchen-marble-island.jpg";
import kDramaticHood from "@/assets/wli/kitchen-dramatic-hood.jpg";
import kWarmOak from "@/assets/wli/kitchen-warm-oak.jpg";

// Bathrooms
import bMarbleBrass from "@/assets/wli/bath-marble-brass.jpg";
import bSpaMarble from "@/assets/wli/bath-spa-marble.jpg";
import bRoseBrass from "@/assets/wli/bath-rose-brass.jpg";
import bArchedBrass from "@/assets/wli/bath-arched-brass.jpg";
import bFloatingVanity from "@/assets/wli/bath-floating-vanity.jpg";
import bCheckerFloor from "@/assets/wli/bath-checker-floor.jpg";

// Living
import lSkyline from "@/assets/wli/living-skyline-penthouse.jpg";
import lGlassStair from "@/assets/wli/living-glass-stair.jpg";
import lCantilever from "@/assets/wli/living-cantilever-stair.jpg";
import lLoftLounge from "@/assets/wli/living-loft-lounge.jpg";
import lFamilyLounge from "@/assets/wli/living-family-lounge.jpg";
import lPenthouseDining from "@/assets/wli/living-penthouse-dining.jpg";

// Full Renovation
import rPenthouseStair from "@/assets/wli/reno-penthouse-stair-kitchen.jpg";
import rOpenFamily from "@/assets/wli/reno-open-family-kitchen.jpg";
import rWholeKitchen from "@/assets/wli/reno-whole-kitchen-transformation.jpg";
import rModernPenthouse from "@/assets/wli/reno-modern-penthouse-kitchen.jpg";
import rHilltop from "@/assets/wli/reno-hilltop-estate-kitchen.jpg";

// Millwork
import mWalnutFluted from "@/assets/wli/millwork-walnut-fluted.jpg";
import mCaneBar from "@/assets/wli/millwork-cane-bar.jpg";
import mReededLib from "@/assets/wli/millwork-reeded-library.jpg";
import mMurphy from "@/assets/wli/millwork-murphy-bed.jpg";
import mOfficeShelving from "@/assets/wli/millwork-office-shelving.jpg";
import mOfficeBridge from "@/assets/wli/millwork-office-bridge-view.jpg";
import mVanityDetail from "@/assets/wli/millwork-vanity-detail.jpg";

// Commercial
import cPrivacy from "@/assets/wli/commercial-privacy-booths.jpg";
import cGlass from "@/assets/wli/commercial-glass-offices.jpg";
import cStorefront from "@/assets/wli/commercial-storefront.jpg";
import cWoodDoors from "@/assets/wli/commercial-wood-doors.jpg";
import cGlassCorridor from "@/assets/wli/commercial-glass-corridor.jpg";

const categories = [
  { label: "All", value: "all" },
  { label: "Kitchens", value: "kitchens" },
  { label: "Bathrooms", value: "bathrooms" },
  { label: "Living Spaces", value: "living-spaces" },
  { label: "Full Renovation", value: "full-renovation" },
  { label: "Millwork", value: "millwork" },
  { label: "Commercial", value: "commercial" },
];

const projects = [
  // Kitchens
  { title: "Bright Open-Concept Kitchen", category: "kitchens", image: kBrightOpen, location: "Westchester County, NY" },
  { title: "White Oak & Brass Kitchen", category: "kitchens", image: kOakBrass, location: "Scarsdale, NY" },
  { title: "Marble Island Kitchen", category: "kitchens", image: kMarbleIsland, location: "Greenwich, CT" },
  { title: "Black Hood & Waterfall Island", category: "kitchens", image: kDramaticHood, location: "Rye, NY" },
  { title: "Warm Oak Family Kitchen", category: "kitchens", image: kWarmOak, location: "Larchmont, NY" },

  // Bathrooms
  { title: "Marble & Brass Primary Bath", category: "bathrooms", image: bMarbleBrass, location: "Rye, NY" },
  { title: "Spa-Inspired Master Bath", category: "bathrooms", image: bSpaMarble, location: "Scarsdale, NY" },
  { title: "Rose Vanity Powder Suite", category: "bathrooms", image: bRoseBrass, location: "Bronxville, NY" },
  { title: "Arched Brass Double Vanity", category: "bathrooms", image: bArchedBrass, location: "Greenwich, CT" },
  { title: "Floating Walnut Vanity", category: "bathrooms", image: bFloatingVanity, location: "Rye, NY" },
  { title: "Classic Checkered Bath", category: "bathrooms", image: bCheckerFloor, location: "Larchmont, NY" },

  // Living Spaces
  { title: "Skyline Penthouse Living Room", category: "living-spaces", image: lSkyline, location: "Manhattan, NY" },
  { title: "Glass Stair Lounge & Dining", category: "living-spaces", image: lGlassStair, location: "Tribeca, NY" },
  { title: "Cantilevered Stair Great Room", category: "living-spaces", image: lCantilever, location: "Manhattan, NY" },
  { title: "Hudson View Loft Lounge", category: "living-spaces", image: lLoftLounge, location: "Manhattan, NY" },
  { title: "Family Lounge & Dining", category: "living-spaces", image: lFamilyLounge, location: "Westchester County, NY" },
  { title: "Penthouse Living & Dining", category: "living-spaces", image: lPenthouseDining, location: "Manhattan, NY" },

  // Full Renovation
  { title: "Tri-Level Penthouse Renovation", category: "full-renovation", image: rPenthouseStair, location: "Tribeca, NY" },
  { title: "Open-Concept Family Kitchen Renovation", category: "full-renovation", image: rOpenFamily, location: "Scarsdale, NY" },
  { title: "Whole-Home Kitchen Transformation", category: "full-renovation", image: rWholeKitchen, location: "Greenwich, CT" },
  { title: "Modern Penthouse Kitchen Renovation", category: "full-renovation", image: rModernPenthouse, location: "Manhattan, NY" },
  { title: "Hilltop Estate Kitchen Renovation", category: "full-renovation", image: rHilltop, location: "Westchester County, NY" },

  // Millwork
  { title: "Walnut Fluted Credenza Wall", category: "millwork", image: mWalnutFluted, location: "Rye, NY" },
  { title: "Black & Brass Cane Bar", category: "millwork", image: mCaneBar, location: "Greenwich, CT" },
  { title: "Reeded Glass Walnut Library", category: "millwork", image: mReededLib, location: "Larchmont, NY" },
  { title: "Custom Oak Murphy Bed Wall", category: "millwork", image: mMurphy, location: "Scarsdale, NY" },
  { title: "Floating Office Shelving", category: "millwork", image: mOfficeShelving, location: "Manhattan, NY" },
  { title: "Bridge-View Home Office", category: "millwork", image: mOfficeBridge, location: "Manhattan, NY" },
  { title: "Floating Walnut Vanity (Detail)", category: "millwork", image: mVanityDetail, location: "Rye, NY" },

  // Commercial
  { title: "White-Brick Privacy Booths", category: "commercial", image: cPrivacy, location: "New York, NY" },
  { title: "Black-Framed Glass Offices", category: "commercial", image: cGlass, location: "White Plains, NY" },
  { title: "Boutique Café Storefront", category: "commercial", image: cStorefront, location: "New York, NY" },
  { title: "Custom Wood Office Doors", category: "commercial", image: cWoodDoors, location: "New York, NY" },
  { title: "Glass Office Corridor", category: "commercial", image: cGlassCorridor, location: "White Plains, NY" },
];

const Projects = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState(category ?? "all");
  const [lightbox, setLightbox] = useState<null | { image: string; title: string; location: string }>(null);

  useEffect(() => {
    setFilter(category ?? "all");
  }, [category]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Layout>
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Portfolio"
            title="Completed Projects"
            description="Explore our collection of luxury renovations and custom millwork delivered across the tri-state area. We also welcome fabrication-only commissions for designers, architects, and homeowners nationwide."
          />

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
