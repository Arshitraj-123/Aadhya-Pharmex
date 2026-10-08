import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Menu, ShoppingCart, X, LogOut, LayoutDashboard, User, Package, MapPin, ShieldCheck } from "lucide-react";
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
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout, token } = useAuth();

  const getAdminUrl = () => {
    const adminBase = import.meta.env.VITE_ADMIN_URL || "/admin/";
    if (token && user) {
      const sep = adminBase.includes("?") ? "&" : "?";
      return `${adminBase}${sep}token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(user))}`;
    }
    return adminBase;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close account dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitial = user?.fullName?.charAt(0)?.toUpperCase() || "U";

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
            <div className={cn("font-bold text-base sm:text-lg transition-smooth", scrolled ? "text-foreground" : "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]")}>
              Aadya Medicine
            </div>
            <div className={cn("text-[10px] tracking-[0.2em] uppercase transition-smooth", scrolled ? "text-muted-foreground" : "text-white/80")}>Agencies</div>
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
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1B3A6B] text-white px-1 text-[10px] font-bold shadow-md ring-1 ring-white/70">
                {totalItems}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="hidden md:block relative" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full transition-smooth",
                  scrolled ? "hover:bg-secondary text-foreground" : "hover:bg-white/15 text-white"
                )}
              >
                {user?.profilePhoto ? (
                  <img src={user.profilePhoto} alt={user.fullName} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {userInitial}
                  </div>
                )}
                <span className={cn("text-xs font-semibold max-w-[80px] truncate", scrolled ? "" : "text-white")}>
                  {user?.fullName?.split(" ")[0]}
                </span>
                <ChevronDown className={cn("w-3 h-3 transition-transform", accountOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-card/95 backdrop-blur-xl border border-border/60 shadow-elegant overflow-hidden z-50"
                  >
                    {/* User info header */}
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        {user?.profilePhoto ? (
                          <img src={user.profilePhoto} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-base font-bold">
                            {userInitial}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-foreground truncate">{user?.fullName}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{user?.email}</div>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      <Link
                        to="/account"
                        search={{ tab: "profile" }}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-smooth"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/account"
                        search={{ tab: "orders" }}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-smooth"
                      >
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                      <Link
                        to="/account"
                        search={{ tab: "tracking" }}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-smooth"
                      >
                        <MapPin className="w-4 h-4" />
                        Order Tracking
                      </Link>
                      <Link
                        to="/account"
                        search={{ tab: "security" }}
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-smooth"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        Security
                      </Link>

                      {(user?.role === "Admin" || user?.role === "Super Admin") && (
                        <>
                          <div className="mx-3 my-1 border-t border-border/50" />
                          <a
                            href={getAdminUrl()}
                            onClick={() => setAccountOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-smooth"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Admin Panel
                          </a>
                        </>
                      )}
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-border/50 p-2">
                      <button
                        onClick={() => { logout(); setAccountOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-smooth"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <Link
                to="/cart"
                onClick={() => setMobile(false)}
                className="px-4 py-3 rounded-lg hover:bg-primary/10 font-medium flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#1B3A6B]" />
                  My Cart
                </span>
                {totalItems > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1B3A6B] text-white px-2 text-xs font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
              {isAuthenticated ? (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <span className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Logged in as: {user?.fullName} ({user?.role})
                  </span>
                  <Link to="/account" search={{ tab: "profile" }} onClick={() => setMobile(false)} className="px-4 py-3 rounded-lg hover:bg-primary/10 font-medium flex items-center gap-2">
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <Link to="/account" search={{ tab: "orders" }} onClick={() => setMobile(false)} className="px-4 py-3 rounded-lg hover:bg-primary/10 font-medium flex items-center gap-2">
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  {(user?.role === "Admin" || user?.role === "Super Admin") && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={getAdminUrl()} className="flex items-center justify-center gap-1.5">
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