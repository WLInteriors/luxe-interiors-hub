import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";

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
import kClassicIsland from "@/assets/wli/kitchen-replacement-luxury.jpg";
import kStairBar from "@/assets/wli/kitchen-stair-bar.jpg";

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

// Living
import lSkyline from "@/assets/wli/living-skyline-penthouse.png";
import lFireplaceBuiltins from "@/assets/wli/living-fireplace-builtins.jpg";
import lCofferedCeiling from "@/assets/wli/living-coffered-ceiling.jpg";
import lDiningPaneled from "@/assets/wli/dining-paneled-walls.jpg";
import lDiningStatement from "@/assets/wli/dining-statement-light.jpg";

// Bedrooms
import bedPaneled from "@/assets/wli/bedroom-paneled-headboard.jpg";
import bedSerene from "@/assets/wli/bedroom-serene-neutral.jpg";
import bedSereneWide from "@/assets/wli/bedroom-serene-wide.jpg";
import bedWarmOak from "@/assets/wli/bedroom-warm-oak.jpg";
import bedWarmOakAlt from "@/assets/wli/bedroom-warm-oak-alt.jpg";
import bedWindowBench from "@/assets/wli/bedroom-window-bench.jpg";
import bedSoftModern from "@/assets/wli/bedroom-soft-modern.jpg";
import bedSoftModernAlt from "@/assets/wli/bedroom-soft-modern-alt.jpg";
import bedLoftBunkWide from "@/assets/wli/bedroom-loft-bunk-wide.jpg";

// Full Renovation
import rPenthouseStair from "@/assets/wli/reno-penthouse-stair-kitchen.jpg";
import rWholeKitchen from "@/assets/wli/reno-whole-kitchen-transformation.jpg";
import rModernPenthouse from "@/assets/wli/reno-modern-penthouse-kitchen.jpg";
import rHilltop from "@/assets/wli/reno-hilltop-estate-kitchen.jpg";
import rOpenFamily from "@/assets/wli/reno-open-family-kitchen.jpg";
import rLivingExtra from "@/assets/wli/living-room-2.jpg";
import rGlassStair from "@/assets/wli/living-glass-stair.jpg";
import rCantilever from "@/assets/wli/living-cantilever-stair.jpg";
import rPenthouseDining from "@/assets/wli/living-penthouse-dining.jpg";

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
import cBankAtm from "@/assets/wli/commercial-bank-atm.jpg";
import cGlassSuite from "@/assets/wli/commercial-glass-office-suite.jpg";
import cLobbyLounge from "@/assets/wli/commercial-lobby-lounge.jpg";

// New batch
import kWarmOakMarble from "@/assets/wli/kitchen-warm-oak-marble.jpg";
import kWhiteChandelierRound from "@/assets/wli/kitchen-white-chandelier-round.jpg";
import kWarmWoodWineWall from "@/assets/wli/kitchen-warm-wood-wine-wall.jpg";
import kDarkMoodySlate from "@/assets/wli/kitchen-dark-moody-slate.jpg";
import bDarkMarbleWalnut from "@/assets/wli/bath-dark-marble-walnut-vanity.jpg";
import bCurvedWalnutBrass from "@/assets/wli/bath-curved-walnut-vanity-brass.jpg";
import bGrayDoubleVanityTub from "@/assets/wli/bath-gray-double-vanity-tub.jpg";
import bModernTroughSink from "@/assets/wli/bath-modern-trough-sink.jpg";
import bMarbleTubShowerSuite from "@/assets/wli/bath-marble-tub-shower-suite.jpg";
import bDarkWoodBrassDouble from "@/assets/wli/bath-dark-wood-brass-double.jpg";
import lBrightWindowsLounge from "@/assets/wli/living-bright-windows-lounge.jpg";
import lClassicCofferedFireplace from "@/assets/wli/living-classic-coffered-fireplace.jpg";
import mRadiatorWindowBench from "@/assets/wli/millwork-radiator-window-bench.jpg";
import mTraditionalVanityTower from "@/assets/wli/millwork-traditional-vanity-tower.jpg";
import mBlackPanelFireplace from "@/assets/wli/millwork-black-panel-fireplace.jpg";
import mWalkinClosetAisle from "@/assets/wli/millwork-walkin-closet-aisle.jpg";
import mMarbleBrassBar from "@/assets/wli/millwork-marble-brass-bar.jpg";
import mReededGreenPantry from "@/assets/wli/millwork-reeded-green-pantry.jpg";
import mCabinFireplaceNook from "@/assets/wli/millwork-cabin-fireplace-nook.jpg";
import mWallpaperedCloset from "@/assets/wli/millwork-wallpapered-closet.jpg";
import mMudroomSlatBench from "@/assets/wli/millwork-mudroom-slat-bench.jpg";
import mGrayBuiltinsShelves from "@/assets/wli/millwork-gray-builtins-shelves.png";
import cBankEntrance from "@/assets/wli/commercial-bank-entrance.jpg";
import cWoodDoors from "@/assets/wli/commercial-wood-doors.jpg";
import cOfficeKitchen from "@/assets/wli/commercial-office-kitchen.png";

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
  { title: "Bright Open-Concept Kitchen", category: "kitchens", image: kBrightOpen },
  { title: "White Oak & Brass Kitchen", category: "kitchens", image: kOakBrass },
  { title: "Marble Island Kitchen", category: "kitchens", image: kMarbleIsland },
  { title: "Black Hood & Waterfall Island", category: "kitchens", image: kDramaticHood },
  { title: "Warm Oak Family Kitchen", category: "kitchens", image: kWarmOak },
  { title: "Modern White Kitchen", category: "kitchens", image: kWhiteModern },
  { title: "Shaker Kitchen with Pantry", category: "kitchens", image: kShakerPantry },
  { title: "Two-Tone Family Kitchen", category: "kitchens", image: kTwoTone },
  { title: "Coastal Blue Kitchen", category: "kitchens", image: kCoastalBlue },
  { title: "Statement Hood Kitchen", category: "kitchens", image: kStatementHood },
  { title: "Luxury Stone-Backsplash Kitchen", category: "kitchens", image: kClassicIsland },
  { title: "Stair-Side Bar Kitchen", category: "kitchens", image: kStairBar },
  { title: "Warm Wood Kitchen with Wine Wall", category: "kitchens", image: kWarmWoodWineWall },

  // Bathrooms
  { title: "Marble & Brass Primary Bath", category: "bathrooms", image: bMarbleBrass },
  { title: "Spa-Inspired Master Bath", category: "bathrooms", image: bSpaMarble },
  { title: "Rose Vanity Powder Suite", category: "bathrooms", image: bRoseBrass },
  { title: "Arched Brass Double Vanity", category: "bathrooms", image: bArchedBrass },
  { title: "Floating Walnut Vanity", category: "bathrooms", image: bFloatingVanity },
  { title: "Classic Checkered Bath", category: "bathrooms", image: bCheckerFloor },
  { title: "Mosaic Tile Shower Bath", category: "bathrooms", image: bMosaicShower },
  { title: "Double Vanity Primary Bath", category: "bathrooms", image: bDoubleVanity },
  { title: "Walk-in Glass Shower Suite", category: "bathrooms", image: bWalkInGlass },
  { title: "Dark Marble & Walnut Bath", category: "bathrooms", image: bDarkMarbleWalnut },
  { title: "Curved Walnut Vanity with Brass", category: "bathrooms", image: bCurvedWalnutBrass },
  { title: "Gray Double Vanity Primary Bath", category: "bathrooms", image: bGrayDoubleVanityTub },
  { title: "Marble Tub & Shower Suite", category: "bathrooms", image: bMarbleTubShowerSuite },
  { title: "Dark Wood & Brass Double Vanity", category: "bathrooms", image: bDarkWoodBrassDouble },

  // Living Spaces
  
  { title: "Fireplace & Built-Ins Living Room", category: "living-spaces", image: lFireplaceBuiltins },
  { title: "Coffered Ceiling Great Room", category: "living-spaces", image: lCofferedCeiling },
  { title: "Paneled Dining Room", category: "living-spaces", image: lDiningPaneled },
  { title: "Statement-Light Dining Room", category: "living-spaces", image: lDiningStatement },
  { title: "Bright Windowed Family Room", category: "living-spaces", image: lBrightWindowsLounge },
  { title: "Classic Coffered Living Room with Fireplace", category: "living-spaces", image: lClassicCofferedFireplace },
  

  // Bedrooms
  { title: "Paneled Headboard Primary Suite", category: "bedrooms", image: bedPaneled },
  { title: "Warm Oak Primary Bedroom", category: "bedrooms", image: bedWarmOak },
  { title: "Warm Oak Primary Bedroom (Alt View)", category: "bedrooms", image: bedWarmOakAlt },
  { title: "Window-Bench Guest Bedroom", category: "bedrooms", image: bedWindowBench },
  { title: "Soft Modern Bedroom", category: "bedrooms", image: bedSoftModern },
  { title: "Soft Modern Bedroom (Alt View)", category: "bedrooms", image: bedSoftModernAlt },
  { title: "Loft Bunk Bedroom (Wide View)", category: "bedrooms", image: bedLoftBunkWide },

  // Full Renovation
  { title: "Tri-Level Penthouse Renovation", category: "full-renovation", image: rPenthouseStair },
  { title: "Whole-Home Kitchen Transformation", category: "full-renovation", image: rWholeKitchen },
  { title: "Modern Penthouse Kitchen Renovation", category: "full-renovation", image: rModernPenthouse },
  { title: "Hilltop Estate Renovation", category: "full-renovation", image: rHilltop },
  { title: "Open Family-Home Renovation", category: "full-renovation", image: rOpenFamily },
  { title: "Living Room Renovation", category: "full-renovation", image: rLivingExtra },
  { title: "Penthouse Dining Renovation", category: "full-renovation", image: rPenthouseDining },
  { title: "Penthouse Glass Stair Renovation", category: "full-renovation", image: rGlassStair },
  { title: "Cantilever Stair Renovation", category: "full-renovation", image: rCantilever },

  // Millwork
  { title: "Walnut Fluted Credenza Wall", category: "millwork", image: mWalnutFluted },
  { title: "Black & Brass Cane Bar", category: "millwork", image: mCaneBar },
  { title: "Reeded Glass Walnut Library", category: "millwork", image: mReededLib },
  { title: "Custom Oak Murphy Bed Wall", category: "millwork", image: mMurphy },
  { title: "Floating Office Shelving", category: "millwork", image: mOfficeShelving },
  { title: "Bridge-View Home Office", category: "millwork", image: mOfficeBridge },
  { title: "Floating Walnut Vanity (Detail)", category: "millwork", image: mVanityDetail },
  { title: "Custom Walk-in Closet", category: "millwork", image: mWalkInCloset },
  { title: "Boutique Island Closet", category: "millwork", image: mIslandCloset },
  { title: "Custom Radiator Window Bench", category: "millwork", image: mRadiatorWindowBench },
  { title: "Traditional Vanity & Storage Tower", category: "millwork", image: mTraditionalVanityTower },
  { title: "Black Paneled Fireplace Wall", category: "millwork", image: mBlackPanelFireplace },
  { title: "Custom Walk-in Closet Aisle", category: "millwork", image: mWalkinClosetAisle },
  { title: "Marble & Brass Wet Bar", category: "millwork", image: mMarbleBrassBar },
  { title: "Reeded Sage Pantry", category: "millwork", image: mReededGreenPantry },
  { title: "Cabin Built-In Fireplace Nook", category: "millwork", image: mCabinFireplaceNook },
  { title: "Wallpapered Walk-in Closet", category: "millwork", image: mWallpaperedCloset },
  { title: "Slat-Wood Mudroom Bench", category: "millwork", image: mMudroomSlatBench },
  { title: "Custom Round Oak Dining Table", category: "millwork", image: kWhiteChandelierRound },
  { title: "Painted Built-In Shelving", category: "millwork", image: mGrayBuiltinsShelves },

  // Commercial
  { title: "White-Brick Privacy Booths", category: "commercial", image: cPrivacy },
  { title: "Black-Framed Glass Offices", category: "commercial", image: cGlass },
  { title: "Boutique Café Storefront", category: "commercial", image: cStorefront },
  { title: "Bank ATM Lobby Build-Out", category: "commercial", image: cBankAtm },
  { title: "Executive Glass Office Suite", category: "commercial", image: cGlassSuite },
  { title: "Corporate Lobby Lounge", category: "commercial", image: cLobbyLounge },
  { title: "Bank Branch Entrance", category: "commercial", image: cBankEntrance },
  { title: "Custom Wood Office Doors", category: "commercial", image: cWoodDoors },
  { title: "Commercial Kitchen with Custom Paneling", category: "commercial", image: kDarkMoodySlate },
  { title: "Commercial Office Kitchen", category: "commercial", image: cOfficeKitchen },
];

const Projects = () => {
  const { category } = useParams();
  const [filter, setFilter] = useState(category ?? "all");
  const [lightbox, setLightbox] = useState<null | { image: string; title: string }>(null);

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
  const activeCategory = categories.find((c) => c.value === filter);
  const pageTitle = filter === "all"
    ? "Projects | WL Interiors Portfolio"
    : `${activeCategory?.label ?? "Projects"} | WL Interiors`;
  const pageDescription = filter === "all"
    ? "Explore our portfolio of luxury kitchens, bathrooms, living spaces, full renovations, custom millwork, and commercial projects across the tri-state area."
    : `${activeCategory?.label ?? "Project"} portfolio from WL Interiors — luxury renovations and custom millwork delivered across the tri-state area.`;

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={filter === "all" ? "/projects" : `/projects/${filter}`}
      />
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="sr-only">{pageTitle}</h1>
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
            </figcaption>
          </figure>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
