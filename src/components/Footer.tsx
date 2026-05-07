import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/wl-logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="bg-cream inline-block p-3 mb-6">
            <img src={logo} alt="Westchester Luxury Interiors" className="h-12 w-auto" />
          </div>
          <p className="text-sm leading-relaxed opacity-70">
            Where craftsmanship meets elegance. Creating luxury residential, commercial, and institutional spaces across the tri-state area.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-widest mb-6">Services</h4>
          <div className="space-y-3">
            <Link to="/projects/kitchens" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Kitchen Renovation</Link>
            <Link to="/projects/bathrooms" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Bathroom Renovation</Link>
            <Link to="/projects/full-renovation" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Full Home Renovation</Link>
            <Link to="/millwork/built-ins" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Custom Millwork</Link>
            <Link to="/millwork/bars" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Bars & Wine Cellars</Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-widest mb-6">Company</h4>
          <div className="space-y-3">
            <Link to="/about" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">About Us</Link>
            <Link to="/before-after" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Before & After</Link>
            <Link to="/consultation" className="block text-sm opacity-70 hover:opacity-100 transition-opacity">Free Consultation</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-sm uppercase tracking-widest mb-6">Contact</h4>
          <div className="space-y-4">
            <a href="tel:9144670807" className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4 flex-shrink-0" />
              (914) 467-0807
            </a>
            <a href="mailto:info@westchesterluxuryinteriors.com" className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4 flex-shrink-0" />
              info@westchesterluxuryinteriors.com
            </a>
            <div className="flex items-start gap-3 text-sm opacity-70">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              209 North Street, Rye, NY 10580
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs opacity-50">© 2026 Westchester Luxury Interiors. All rights reserved.</p>
        <p className="text-xs opacity-50">Licensed & Insured General Contractor</p>
      </div>
    </div>
  </footer>
);

export default Footer;
