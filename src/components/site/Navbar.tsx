import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Menu, ShoppingCart, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/site/BrandLogo";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

const aboutItems = [
  { to: "/about", label: "Overview" },
  { to: "/about/history", label: "Company History" },
  { to: "/about/mission", label: "Mission & Vision" },
  { to: "/about/ceo", label: "CEO Desk" },
  { to: "/about/certifications", label: "Certifications & Accreditations" },
  { to: "/about/testimonials", label: "Testimonials" },
  { to: "/about/brands", label: "Brands We Work With" },
] as const;

const provideItems = [
  { to: "/services", label: "Distribution Network" },
  { to: "/services#supply", label: "Bulk Supply" },
  { to: "/services#cold", label: "Cold Chain Logistics" },
  { to: "/services#consult", label: "Pharma Consultation" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth",
        scrolled
          ? "py-2 shadow-md backdrop-blur-xl bg-[oklch(0.97_0.025_115/0.95)] border-b border-border/60"
          : "py-4 backdrop-blur-md bg-[oklch(0.32_0.09_150/0.55)] border-b border-white/10",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className={cn(
            "w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-bounce overflow-hidden",
            scrolled ? "shadow-md" : "shadow-glow ring-1 ring-white/30",
          )}>
            <BrandLogo className="w-7 h-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
          </div>
          <div className="leading-tight whitespace-nowrap">
            <div className={cn("font-bold text-base sm:text-lg transition-smooth", scrolled ? "text-foreground" : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]")}>Aadya Pharmex</div>
            <div className={cn("text-[10px] tracking-[0.2em] uppercase transition-smooth", scrolled ? "text-muted-foreground" : "text-white/80")}>Healthcare</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/" label="Home" scrolled={scrolled} />
          <Dropdown label="About Us" items={aboutItems} active={open === "about"} onOpen={() => setOpen("about")} onClose={() => setOpen(null)} scrolled={scrolled} />
          <Dropdown label="What We Provide" items={provideItems} active={open === "provide"} onOpen={() => setOpen("provide")} onClose={() => setOpen(null)} scrolled={scrolled} />
          <NavLink to="/products" label="Our Products" scrolled={scrolled} />
          <NavLink to="/brands" label="Brands" scrolled={scrolled} />
          <NavLink to="/gallery" label="Gallery" scrolled={scrolled} />
          {/* <NavLink to="/blog" label="Blogs & News" scrolled={scrolled} /> */}
          <NavLink to="/contact" label="Contact Us" scrolled={scrolled} />
        </nav>

        <div className="flex items-center gap-2">
          <button className={cn("hidden md:flex w-10 h-10 items-center justify-center rounded-full transition-smooth", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/15 text-white")} aria-label="Search">
            <Search className="w-4 h-4" />
          </button>
          <Link
            to="/cart"
            className={cn("relative flex h-10 w-10 items-center justify-center rounded-full transition-smooth", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/15 text-white")}
            aria-label="Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <span className={cn("text-xs font-semibold px-2.5 py-1 rounded bg-secondary", scrolled ? "text-foreground" : "text-white bg-white/10")}>
                Hi, {user?.fullName.split(" ")[0]}
              </span>
              {(user?.role === "Admin" || user?.role === "Super Admin") && (
                <Button asChild variant="outline" size="sm">
                  <a href={import.meta.env.DEV ? "http://localhost:5173" : "https://pharma-app-a2im.onrender.com"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Panel
                  </a>
                </Button>
              )}
              <Button onClick={logout} variant="hero" size="sm" className="flex items-center gap-1.5">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
          <button onClick={() => setMobile(!mobile)} className={cn("lg:hidden w-10 h-10 flex items-center justify-center rounded-full", scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/15 text-white")} aria-label="Menu">
            {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/services", label: "What We Provide" },
                { to: "/products", label: "Our Products" },
                { to: "/brands", label: "Brands" },
                { to: "/gallery", label: "Gallery" },
                { to: "/blog", label: "Blogs & News" },
                { to: "/contact", label: "Contact Us" },
              ].map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={() => setMobile(false)}
                  className="px-4 py-3 rounded-lg hover:bg-primary/10 font-medium"
                >
                  {it.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <span className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Logged in as: {user?.fullName} ({user?.role})
                  </span>
                  {(user?.role === "Admin" || user?.role === "Super Admin") && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={import.meta.env.DEV ? "http://localhost:5173" : "https://pharma-app-a2im.onrender.com"} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Panel
                      </a>
                    </Button>
                  )}
                  <Button onClick={() => { logout(); setMobile(false); }} variant="hero" size="sm" className="w-full flex items-center justify-center gap-1.5">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to="/login" onClick={() => setMobile(false)}>Sign In</Link>
                  </Button>
                  <Button asChild variant="hero" size="sm" className="flex-1">
                    <Link to="/signup" onClick={() => setMobile(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ to, label, scrolled }: { to: string; label: string; scrolled: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-smooth story-link",
        scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-accent",
      )}
      activeProps={{ className: scrolled ? "text-primary font-semibold" : "text-accent font-semibold" }}
    >
      {label}
    </Link>
  );
}

function Dropdown({
  label,
  items,
  active,
  onOpen,
  onClose,
  scrolled,
}: {
  label: string;
  items: ReadonlyArray<{ to: string; label: string }>;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  scrolled: boolean;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-1",
        scrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-accent",
      )}>
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", active && "rotate-180")} />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 pt-3 w-64"
          >
            <div className="glass rounded-2xl shadow-elegant p-2 border border-border/50">
              {items.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={onClose}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-smooth"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}