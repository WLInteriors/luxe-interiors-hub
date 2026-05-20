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
import kWhiteModern from "@/assets/wli/kitchen-white-modern.jpg";
import kShakerPantry from "@/assets/wli/kitchen-shaker-pantry.jpg";
import kTwoTone from "@/assets/wli/kitchen-two-tone.jpg";
import kCoastalBlue from "@/assets/wli/kitchen-coastal-blue.jpg";
import kStatementHood from "@/assets/wli/kitchen-statement-hood.jpg";

// Bathrooms
import bMarbleBrass from "@/assets/wli/bath-marble-brass.jpg";
import bSpaMarble from "@/assets/wli/bath-spa-marble.jpg";
import bRoseBrass from "@/assets/wli/bath-rose-brass.jpg";
import bArchedBrass from "@/assets/wli/bath-arched-brass.jpg";
import bFloatingVanity from "@/assets/wli/bath-floating-vanity.jpg";
import bCheckerFloor from "@/assets/wli/bath-checker-floor.jpg";
import bMosaicShower from "@/assets/wli/bath-mosaic-shower.jpg";
import bDoubleVanity from "@/assets/wli/bath-double-vanity.jpg";
import bWalkInGlass from "@/assets/wli/bath-walk-in-glass.jpg";
import bSoakingTub from "@/assets/wli/bath-soaking-tub.jpg";
import bPowderRoom from "@/assets/wli/bath-powder-room.jpg";

// Living
import lSkyline from "@/assets/wli/living-skyline-penthouse.jpg";
import lGlassStair from "@/assets/wli/living-glass-stair.jpg";
import lCantilever from "@/assets/wli/living-cantilever-stair.jpg";
import lPenthouseDining from "@/assets/wli/living-penthouse-dining.jpg";
import lFireplaceBuiltins from "@/assets/wli/living-fireplace-builtins.jpg";
import lCofferedCeiling from "@/assets/wli/living-coffered-ceiling.jpg";
import lWarmTextures from "@/assets/wli/living-warm-textures.jpg";
import lDiningPaneled from "@/assets/wli/dining-paneled-walls.jpg";
import lDiningStatement from "@/assets/wli/dining-statement-light.jpg";

// Bedrooms
import bedPaneled from "@/assets/wli/bedroom-paneled-headboard.jpg";
import bedSerene from "@/assets/wli/bedroom-serene-neutral.jpg";
import bedWarmOak from "@/assets/wli/bedroom-warm-oak.jpg";
import bedWindowBench from "@/assets/wli/bedroom-window-bench.jpg";
import bedSoftModern from "@/assets/wli/bedroom-soft-modern.jpg";

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
import mWalkInCloset from "@/assets/wli/millwork-walk-in-closet.jpg";
import mIslandCloset from "@/assets/wli/millwork-island-closet.jpg";


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
  { label: "Bedrooms", value: "bedrooms" },
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
  { title: "Modern White Kitchen", category: "kitchens", image: kWhiteModern, location: "Rye, NY" },
  { title: "Shaker Kitchen with Pantry", category: "kitchens", image: kShakerPantry, location: "Larchmont, NY" },
  { title: "Two-Tone Family Kitchen", category: "kitchens", image: kTwoTone, location: "Greenwich, CT" },
  { title: "Coastal Blue Kitchen", category: "kitchens", image: kCoastalBlue, location: "Westport, CT" },
  { title: "Statement Hood Kitchen", category: "kitchens", image: kStatementHood, location: "Scarsdale, NY" },

  // Bathrooms
  { title: "Marble & Brass Primary Bath", category: "bathrooms", image: bMarbleBrass, location: "Rye, NY" },
  { title: "Spa-Inspired Master Bath", category: "bathrooms", image: bSpaMarble, location: "Scarsdale, NY" },
  { title: "Rose Vanity Powder Suite", category: "bathrooms", image: bRoseBrass, location: "Bronxville, NY" },
  { title: "Arched Brass Double Vanity", category: "bathrooms", image: bArchedBrass, location: "Greenwich, CT" },
  { title: "Floating Walnut Vanity", category: "bathrooms", image: bFloatingVanity, location: "Rye, NY" },
  { title: "Classic Checkered Bath", category: "bathrooms", image: bCheckerFloor, location: "Larchmont, NY" },
  { title: "Mosaic Tile Shower Bath", category: "bathrooms", image: bMosaicShower, location: "Westchester County, NY" },
  { title: "Double Vanity Primary Bath", category: "bathrooms", image: bDoubleVanity, location: "Scarsdale, NY" },
  { title: "Walk-in Glass Shower Suite", category: "bathrooms", image: bWalkInGlass, location: "Rye, NY" },
  { title: "Freestanding Soaking Tub Bath", category: "bathrooms", image: bSoakingTub, location: "Greenwich, CT" },
  { title: "Designer Powder Room", category: "bathrooms", image: bPowderRoom, location: "Bronxville, NY" },

  // Living Spaces
  { title: "Skyline Penthouse Living Room", category: "living-spaces", image: lSkyline, location: "Manhattan, NY" },
  { title: "Glass Stair Lounge & Dining", category: "living-spaces", image: lGlassStair, location: "Tribeca, NY" },
  { title: "Cantilevered Stair Great Room", category: "living-spaces", image: lCantilever, location: "Manhattan, NY" },
  { title: "Penthouse Living & Dining", category: "living-spaces", image: lPenthouseDining, location: "Manhattan, NY" },
  { title: "Fireplace & Built-Ins Living Room", category: "living-spaces", image: lFireplaceBuiltins, location: "Rye, NY" },
  { title: "Coffered Ceiling Great Room", category: "living-spaces", image: lCofferedCeiling, location: "Scarsdale, NY" },
  { title: "Warm Textured Family Room", category: "living-spaces", image: lWarmTextures, location: "Larchmont, NY" },
  { title: "Paneled Dining Room", category: "living-spaces", image: lDiningPaneled, location: "Bronxville, NY" },
  { title: "Statement-Light Dining Room", category: "living-spaces", image: lDiningStatement, location: "Rye, NY" },

  // Bedrooms
  { title: "Paneled Headboard Primary Suite", category: "bedrooms", image: bedPaneled, location: "Rye, NY" },
  { title: "Serene Neutral Bedroom", category: "bedrooms", image: bedSerene, location: "Scarsdale, NY" },
  { title: "Warm Oak Primary Bedroom", category: "bedrooms", image: bedWarmOak, location: "Greenwich, CT" },
  { title: "Window-Bench Guest Bedroom", category: "bedrooms", image: bedWindowBench, location: "Larchmont, NY" },
  { title: "Soft Modern Bedroom", category: "bedrooms", image: bedSoftModern, location: "Bronxville, NY" },

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
  { title: "Custom Walk-in Closet", category: "millwork", image: mWalkInCloset, location: "Scarsdale, NY" },
  { title: "Boutique Island Closet", category: "millwork", image: mIslandCloset, location: "Greenwich, CT" },

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
              <button
                type="button"
                key={project.title}
                onClick={() => setLightbox(project)}
                className="group relative overflow-hidden aspect-[4/3] cursor-zoom-in text-left"
              >
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg text-cream">{project.title}</h3>
                  <span className="text-xs text-cream/60 uppercase tracking-wide">{project.location}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in cursor-zoom-out"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-5 right-5 text-cream/80 hover:text-cream text-3xl leading-none w-10 h-10 flex items-center justify-center"
          >
            ×
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-6xl w-full max-h-full flex flex-col items-center">
            <img
              src={lightbox.image}
              alt={lightbox.title}
              className="max-h-[85vh] w-auto max-w-full object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <h3 className="font-serif text-xl text-cream">{lightbox.title}</h3>
              <span className="text-xs text-cream/60 uppercase tracking-widest">{lightbox.location}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
