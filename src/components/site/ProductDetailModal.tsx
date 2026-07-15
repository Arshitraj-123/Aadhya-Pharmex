import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, Mail, ShieldCheck, Truck, Award, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";
import { products, type Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
};

export function ProductDetailModal({ product, open, onClose }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const quantity = getItemQuantity(product?.id ?? "");

  useEffect(() => {
    setActiveImg(0);
    setZoom(false);
  }, [product?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!product) return null;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const thumbs = [product.image, product.image, product.image, product.image];
  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 24, stiffness: 260 }}
            className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-card shadow-elegant"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 hover:bg-background border border-border flex items-center justify-center shadow-md transition-smooth hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-10">
              {/* LEFT: Image + thumbnails */}
              <div>
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted cursor-zoom-in"
                  onMouseEnter={() => setZoom(true)}
                  onMouseLeave={() => setZoom(false)}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setZoomPos({
                      x: ((e.clientX - r.left) / r.width) * 100,
                      y: ((e.clientY - r.top) / r.height) * 100,
                    });
                  }}
                >
                  <img
                    src={thumbs[activeImg]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: zoom ? "scale(1.8)" : "scale(1)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }}
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold shadow-md">
                    {discount}% OFF
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {thumbs.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-smooth ${
                        activeImg === i ? "border-primary shadow-glow" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <img src={t} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT: Details */}
              <div>
                <button className="text-xs uppercase tracking-widest text-primary font-bold mb-2 hover:underline">
                  {product.brand}
                </button>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h2>

                <div className="flex items-baseline gap-3 mt-5 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: "oklch(0.55 0.18 155)" }}>
                    ₹{product.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">MRP ₹{product.mrp}</span>
                  <span className="text-sm font-semibold px-2 py-0.5 rounded-md bg-accent/15 text-accent">
                    Save ₹{product.mrp - product.price}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <Row label="Packing">
                    <span className="font-semibold">{product.packing}</span>
                  </Row>
                  <Row label="Composition">
                    <button className="font-semibold text-primary hover:underline capitalize">
                      {product.composition}
                    </button>
                  </Row>
                  <Row label="Category">
                    <span className="font-semibold capitalize">{product.category}</span>
                  </Row>
                </div>

                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

                <div className="mt-6">
                  {quantity > 0 ? (
                    <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-background/80 p-1">
                      <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(product.id, quantity - 1)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="min-w-8 text-center text-sm font-semibold">{quantity}</span>
                      <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full" onClick={() => updateQuantity(product.id, quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => addItem(product)}>
                      Add to Cart
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Button asChild size="lg" variant="whatsapp" className="flex-1 min-w-[180px]">
                    <a
                      href={whatsappLink(`Hi, I want to buy ${product.name} (₹${product.price}, ${product.packing})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4" /> Buy via WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="lg" className="flex-1 min-w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to="/contact" onClick={onClose}>
                      <Mail className="w-4 h-4" /> Enquiry Now
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: ShieldCheck, label: "Authentic" },
                    { icon: Truck, label: "Fast Delivery" },
                    { icon: Award, label: "GMP Certified" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center gap-1">
                      <b.icon className="w-5 h-5 text-primary" />
                      <span className="text-[11px] font-medium text-muted-foreground">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar composition */}
            {similar.length > 0 && (
              <div className="px-6 md:px-10 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">
                    Check more medicines with <span className="text-gradient-primary">similar composition</span>
                  </h3>
                  <Link
                    to="/products"
                    search={{ category: product.category }}
                    onClick={onClose}
                    className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline"
                  >
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {similar.map((p) => (
                    <Link
                      key={p.id}
                      to="/products/$id"
                      params={{ id: p.id }}
                      onClick={onClose}
                      className="group rounded-xl border border-border hover:border-primary p-3 transition-smooth bg-background"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-smooth" />
                      </div>
                      <div className="text-xs font-semibold line-clamp-1">{p.name}</div>
                      <div className="text-sm font-bold text-primary mt-1">₹{p.price}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="px-6 md:px-10 pb-8">
              <div className="rounded-xl bg-muted/50 border border-border p-4 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> The information provided is for reference only and is not a
                substitute for professional medical advice. Medicines should be used only on prescription from a registered
                medical practitioner. Adhya Pharmex Healthcare is a licensed pharmaceutical distributor and dispenses products in
                accordance with applicable laws and regulations.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 text-sm">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold w-28 shrink-0">{label}</span>
      <span>{children}</span>
    </div>
  );
}