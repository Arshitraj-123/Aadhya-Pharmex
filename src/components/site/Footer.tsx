import { Link } from "@tanstack/react-router";
import { Pill, Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.05_245)] text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.62 0.16 165) 0%, transparent 40%)" }} />
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
                <Pill className="w-5 h-5"/>
              </div>
              <div>
                <div className="font-bold text-lg">Adhya Pharmex</div>
                <div className="text-[10px] tracking-[0.2em] opacity-70 uppercase">Healthcare</div>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Trusted pharmaceutical distributor delivering premium medicines to 400+ retailers across the country.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-smooth">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-accent-glow transition-smooth">About Us</Link></li>
              <li><Link to="/products" className="hover:text-accent-glow transition-smooth">Our Products</Link></li>
              <li><Link to="/services" className="hover:text-accent-glow transition-smooth">What We Provide</Link></li>
              <li><Link to="/gallery" className="hover:text-accent-glow transition-smooth">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-accent-glow transition-smooth">Blogs & News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/products" search={{ category: "tablets" }}>Tablets</Link></li>
              <li><Link to="/products" search={{ category: "syrups" }}>Syrups</Link></li>
              <li><Link to="/products" search={{ category: "injections" }}>Injections</Link></li>
              <li><Link to="/products" search={{ category: "capsules" }}>Capsules</Link></li>
              <li><Link to="/products" search={{ category: "vitamins" }}>Vitamins</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /><span>14 Pharma Street, Industrial Area, Noida 201301</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /><span>+91 99999 99999</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /><span>hello@medonix.com</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Adhya Pharmex Healthcare. All rights reserved.</p>
          <p>GMP & WHO-GMP Certified · ISO 9001:2015</p>
        </div>
      </div>
    </footer>
  );
}