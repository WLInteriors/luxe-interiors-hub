import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import logo from "@/assets/wl-logo.png";

const projectLinks = [
  { label: "Kitchens", to: "/projects/kitchens" },
  { label: "Bathrooms", to: "/projects/bathrooms" },
  { label: "Living Spaces", to: "/projects/living-spaces" },
  { label: "Full Home Renovation", to: "/projects/full-renovation" },
  { label: "Commercial", to: "/projects/commercial" },
];

const millworkLinks = [
  { label: "Vanities", to: "/millwork/vanities" },
  { label: "Built-ins", to: "/millwork/built-ins" },
  { label: "Closets", to: "/millwork/closets" },
  { label: "Bars & Wine Cellars", to: "/millwork/bars" },
  { label: "Mudrooms & Laundry", to: "/millwork/mudrooms" },
  { label: "Office", to: "/millwork/office" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Westchester Luxury Interiors" className="h-14 w-auto" width={1024} height={1024} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`text-sm tracking-wide uppercase transition-colors hover:text-brass ${isActive("/") ? "text-brass" : "text-foreground"}`}>
              Home
            </Link>

            <div className="relative" onMouseEnter={() => setDropdown("projects")} onMouseLeave={() => setDropdown(null)}>
              <Link to="/projects" className="flex items-center gap-1 text-sm tracking-wide uppercase transition-colors hover:text-brass">
                Projects <ChevronDown className="w-3 h-3" />
              </Link>
              {dropdown === "projects" && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border border-border shadow-xl py-2 min-w-[220px]">
                    {projectLinks.map((link) => (
                      <Link key={link.to} to={link.to} className="block px-5 py-2.5 text-sm hover:bg-secondary transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setDropdown("millwork")} onMouseLeave={() => setDropdown(null)}>
              <Link to="/millwork" className="flex items-center gap-1 text-sm tracking-wide uppercase transition-colors hover:text-brass">
                Custom Millwork <ChevronDown className="w-3 h-3" />
              </Link>
              {dropdown === "millwork" && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background border border-border shadow-xl py-2 min-w-[220px]">
                    {millworkLinks.map((link) => (
                      <Link key={link.to} to={link.to} className="block px-5 py-2.5 text-sm hover:bg-secondary transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/before-after" className="text-sm tracking-wide uppercase transition-colors hover:text-brass">
              Before & After
            </Link>
            <Link to="/about" className="text-sm tracking-wide uppercase transition-colors hover:text-brass">
              About
            </Link>
          </div>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:9144670807" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              (914) 467-0807
            </a>
            <Link to="/consultation" className="bg-primary text-primary-foreground px-6 py-2.5 text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors">
              Free Consultation
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-6 py-6 space-y-4">
            <Link to="/" className="block text-sm uppercase tracking-wide" onClick={() => setOpen(false)}>Home</Link>
            <div>
              <Link to="/projects" onClick={() => setOpen(false)} className="text-xs uppercase tracking-widest text-muted-foreground">Projects</Link>
              <div className="mt-2 space-y-2 pl-4">
                {projectLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="block text-sm" onClick={() => setOpen(false)}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <Link to="/millwork" onClick={() => setOpen(false)} className="text-xs uppercase tracking-widest text-muted-foreground">Custom Millwork</Link>
              <div className="mt-2 space-y-2 pl-4">
                {millworkLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="block text-sm" onClick={() => setOpen(false)}>{link.label}</Link>
                ))}
              </div>
            </div>
            <Link to="/before-after" className="block text-sm uppercase tracking-wide" onClick={() => setOpen(false)}>Before & After</Link>
            <Link to="/about" className="block text-sm uppercase tracking-wide" onClick={() => setOpen(false)}>About</Link>
            <Link to="/consultation" className="block bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-wide text-center" onClick={() => setOpen(false)}>
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
