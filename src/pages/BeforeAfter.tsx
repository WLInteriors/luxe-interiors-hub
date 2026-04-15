import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImage from "@/assets/hero-kitchen.jpg";
import bathroomImage from "@/assets/bathroom-luxury.jpg";
import livingRoom from "@/assets/living-room.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const beforeAfterItems = [
  {
    title: "Kitchen Transformation",
    location: "Scarsdale, NY",
    description: "A dated 1990s kitchen transformed into a modern masterpiece with custom navy cabinetry, marble countertops, and brass fixtures.",
    beforeImage: livingRoom,
    afterImage: heroImage,
  },
  {
    title: "Master Bathroom Renovation",
    location: "Rye, NY",
    description: "Outdated tile and fixtures replaced with a spa-inspired retreat featuring a freestanding marble tub and custom vanity.",
    beforeImage: heroImage,
    afterImage: bathroomImage,
  },
  {
    title: "Living Room Redesign",
    location: "Greenwich, CT",
    description: "Cramped rooms opened into a stunning great room with floor-to-ceiling windows and custom millwork throughout.",
    beforeImage: bathroomImage,
    afterImage: livingRoom,
  },
];

const BeforeAfterSlider = ({ before, after }: { before: string; after: string }) => {
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
      <span className="absolute top-4 left-4 bg-foreground/70 text-cream text-xs uppercase tracking-widest px-3 py-1">Before</span>
      <span className="absolute top-4 right-4 bg-brass text-accent-foreground text-xs uppercase tracking-widest px-3 py-1">After</span>
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
                <BeforeAfterSlider before={item.beforeImage} after={item.afterImage} />
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
