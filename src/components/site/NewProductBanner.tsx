import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
  MessageCircle,
  ShieldCheck,
  Package,
  Bell,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveProductImage } from "@/data/productImages";
import { useCart } from "@/hooks/useCart";
import { whatsappLink } from "@/lib/whatsapp";
import { ProductDetailModal } from "@/components/site/ProductDetailModal";
import type { Product } from "@/data/products";
import api from "@/lib/axios";

// Fallback images
import tablet from "@/assets/product-tablet.jpg";
import syrup from "@/assets/product-syrup.jpg";
import injection from "@/assets/product-injection.jpg";
import capsule from "@/assets/product-capsule.jpg";
import ointment from "@/assets/product-ointment.jpg";
import drops from "@/assets/product-drops.jpg";

function getCategoryFallback(cat: string) {
  const lower = (cat || "").toLowerCase();
  if (lower.includes("syrup")) return syrup;
  if (lower.includes("injection") || lower.includes("surgical")) return injection;
  if (lower.includes("capsule")) return capsule;
  if (lower.includes("ointment") || lower.includes("cream")) return ointment;
  if (lower.includes("drop")) return drops;
  return tablet;
}

export type AnnouncementProduct = {
  _id: string;
  id?: string;
  name: string;
  tradeName?: string;
  genericName?: string;
  category: string;
  schedule?: string;
  mrp: number;
  packing?: string;
  description?: string;
  brand?: string;
  company?: string;
  imageUrl?: string;
  announcedAt?: string;
};

export function NewProductBanner() {
  const [announcements, setAnnouncements] = useState<AnnouncementProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addItem } = useCart();

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get("/products/announcements");
      if (res.data?.announcements && Array.isArray(res.data.announcements)) {
        setAnnouncements(res.data.announcements);
      }
    } catch (err) {
      console.warn("Could not fetch announcements from API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Check session dismissal
    const dismissed = sessionStorage.getItem("announcement_banner_dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }

    // Refresh every 45 seconds for new additions
    const interval = setInterval(fetchAnnouncements, 45000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("announcement_banner_dismissed", "true");
  };

  const handleRestore = () => {
    setIsDismissed(false);
    sessionStorage.removeItem("announcement_banner_dismissed");
  };

  if (loading || announcements.length === 0) {
    return null;
  }

  const current = announcements[currentIndex] || announcements[0];
  const categoryName = (current.category || "General").replace(/-/g, " ").toUpperCase();
  const fallbackImg = getCategoryFallback(current.category);
  const resolvedImg = resolveProductImage(current.tradeName || current.name, fallbackImg).image;

  // Adapt to Product format for Cart and Detail Modal
  const productForCart: Product = {
    id: current._id,
    name: current.tradeName || current.name,
    brand: current.brand || current.company || "Aadya Medicine Agencies",
    category: current.category || "counter-products",
    image: resolvedImg,
    mrp: current.mrp || 100,
    price: current.mrp || 100, // Safe public pricing
    packing: current.packing || "Standard Pack",
    composition: current.genericName || "Standard formulation",
    description: current.description || "Freshly added to our authorized product category by administration."
  };

  const handleAddToCart = () => {
    addItem(productForCart);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleOpenDetails = () => {
    setSelectedProduct(productForCart);
    setModalOpen(true);
  };

  const nextAnnouncement = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <>
      <AnimatePresence>
        {!isDismissed ? (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full relative z-40 bg-gradient-to-r from-slate-950 via-[#072417] to-slate-950 text-white border-b border-emerald-500/30 shadow-xl overflow-hidden"
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute -top-20 left-1/4 w-96 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 right-1/4 w-96 h-40 bg-teal-500/20 blur-3xl rounded-full" />
            </div>

            <div className="container mx-auto px-4 py-3 sm:py-3.5 relative">
              {/* Header Badge Row */}
              <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    ✨ NEW PRODUCT IS ADDED IN OUR CATEGORY: {categoryName}
                  </span>

                  {announcements.length > 1 && (
                    <span className="text-[11px] text-emerald-300/70 hidden sm:inline-block">
                      ({currentIndex + 1} of {announcements.length} new updates)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {announcements.length > 1 && (
                    <div className="flex items-center gap-1 mr-1">
                      <button
                        onClick={prevAnnouncement}
                        aria-label="Previous update"
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={nextAnnouncement}
                        aria-label="Next update"
                        className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleDismiss}
                    aria-label="Dismiss banner"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Product Showcase Card */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    onClick={handleOpenDetails}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-white/95 p-1.5 flex-shrink-0 flex items-center justify-center shadow-md cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={resolvedImg}
                      alt={current.tradeName || current.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={handleOpenDetails}
                        className="text-base sm:text-lg font-bold text-white tracking-tight cursor-pointer hover:text-emerald-300 transition-colors truncate"
                      >
                        {current.tradeName || current.name}
                      </h3>
                      {current.schedule && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                          Schedule {current.schedule}
                        </span>
                      )}
                    </div>

                    {current.genericName && (
                      <p className="text-xs text-emerald-200/80 font-medium truncate mt-0.5">
                        {current.genericName}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-300 flex-wrap mt-1">
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <Package className="w-3 h-3 text-emerald-400" />
                        {current.packing || "Standard Pack"}
                      </span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-300 font-medium">
                        {current.brand || current.company || "Aadya Pharma"}
                      </span>
                      {current.description && (
                        <>
                          <span className="text-slate-500 hidden sm:inline">·</span>
                          <span className="text-slate-300/80 hidden sm:inline truncate max-w-xs">
                            {current.description}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Pricing (MRP Only as per Modification 1) & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10 flex-shrink-0">
                  <div className="text-left md:text-right pr-2">
                    <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      MRP
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white">
                      ₹{current.mrp}
                    </div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Ready in Stock
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={handleAddToCart}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-9 px-3.5 shadow-md transition-bounce"
                    >
                      {addedSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add to Cart
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleOpenDetails}
                      className="border-white/20 bg-white/10 hover:bg-white/20 text-white font-medium text-xs h-9 px-3"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> Details
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="whatsapp"
                      className="text-xs h-9 px-3"
                    >
                      <a
                        href={whatsappLink(
                          `Hi Aadya Medicine Agencies, I noticed the new product "${current.tradeName || current.name}" added to category ${current.category}. Please share trade enquiry details.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-1" /> Inquire
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating Restore Trigger */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-5 right-5 z-40"
          >
            <button
              onClick={handleRestore}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/90 text-white border border-emerald-500/50 shadow-2xl backdrop-blur-md hover:bg-slate-800 transition-all hover:scale-105"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <Bell className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-semibold text-slate-200">
                New Product Added: <span className="text-emerald-400">{current.tradeName || current.name}</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
