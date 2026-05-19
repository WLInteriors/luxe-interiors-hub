import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import baBeforeLiving from "@/assets/wli/ba-before-living.jpg";
import baAfterLiving from "@/assets/wli/ba-after-living.jpg";
import baBeforeKitchen from "@/assets/wli/ba-before-kitchen.jpg";
import baAfterKitchen from "@/assets/wli/ba-after-kitchen.jpg";
import baBeforeMurphy from "@/assets/wli/ba-before-murphy.jpg";
import baAfterMurphy from "@/assets/wli/ba-after-murphy.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const beforeAfterItems = [
  {
    title: "Living Room Modernization",
    location: "New York, NY",
    description: "A dated apartment living room with worn hardwood, dark accent walls, and aging fixtures was reimagined as a bright, contemporary space featuring a custom walnut slat accent wall, refinished wide-plank flooring, and refreshed millwork throughout.",
    beforeImage: baBeforeLiving,
    afterImage: baAfterLiving,
  },
  {
    title: "Kitchen & Floor Renovation",
    location: "New York, NY",
    description: "Severely damaged subfloor and a cramped pass-through were rebuilt from the studs out — new luxury vinyl plank flooring, white shaker cabinetry, marble-look subway backsplash, granite peninsula, and stainless appliances.",
    beforeImage: baBeforeKitchen,
    afterImage: baAfterKitchen,
  },
  {
    title: "Custom Murphy Bed Suite",
    location: "Westchester County, NY",
    description: "A dual-purpose guest suite featuring a custom white oak Murphy bed that disappears flush into a millwork wall when closed, then folds down to reveal a hotel-grade queen bed. Integrated bookshelves with warm LED lighting, grasscloth panels, brass reading sconces, and a sculptural rope chandelier — all built in-house.",
    beforeImage: baBeforeMurphy,
    afterImage: baAfterMurphy,
    beforeLabel: "Closed",
    afterLabel: "Open",
  },
];

const BeforeAfterSlider = ({ before, after, beforeLabel = "Before", afterLabel = "After" }: { before: string; after: string; beforeLabel?: string; afterLabel?: string }) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative overflow-hidden aspect-[16/10] cursor-col-resize select-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition(((e.clientX - rect.left) / rect.width) * 100);
      }}
      onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const touch = e.touches[0];
        setPosition(((touch.clientX - rect.left) / rect.width) * 100);
      }}
    >
      {/* After (full) */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ minWidth: `${100 / (position / 100)}%` }} />
      </div>
      {/* Slider Line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-cream/80 shadow-lg" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cream/90 flex items-center justify-center shadow-lg">
          <ChevronLeft className="w-3 h-3 text-foreground" />
          <ChevronRight className="w-3 h-3 text-foreground" />
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-4 left-4 bg-foreground/70 text-cream text-xs uppercase tracking-widest px-3 py-1">{beforeLabel}</span>
      <span className="absolute top-4 right-4 bg-brass text-accent-foreground text-xs uppercase tracking-widest px-3 py-1">{afterLabel}</span>
    </div>
  );
};

const BeforeAfter = () => (
  <Layout>
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Transformations"
          title="Before & After"
          description="See the dramatic transformations we deliver. Drag the slider to reveal the before and after."
        />

        <div className="space-y-20">
          {beforeAfterItems.map((item) => (
            <div key={item.title} className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <BeforeAfterSlider before={item.beforeImage} after={item.afterImage} beforeLabel={item.beforeLabel} afterLabel={item.afterLabel} />
              </div>
              <div className="lg:col-span-2">
                <span className="text-xs uppercase tracking-widest text-brass">{item.location}</span>
                <h3 className="font-serif text-2xl lg:text-3xl mt-2 mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default BeforeAfter;
