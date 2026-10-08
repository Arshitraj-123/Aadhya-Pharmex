import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Download,
  MapPin,
  ShoppingBag,
  Phone,
  MessageCircle,
  FileText,
  Package,
  ArrowRight,
  Store,
  Clock,
  Shield,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { whatsappLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import api from "@/lib/axios";
import { toast } from "sonner";

// ── Types ───────────────────────────────────────────────────────────────
type OrderLineItem = {
  productName: string;
  quantity: number;
  rate: number;
  gstRate: number;
  lineTotal: number;
};

type OrderSuccessState = {
  orderId: string;
  orderMongoId?: string;
  items: OrderLineItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
  paymentMode: "online" | "cod";
  timestamp: string;
};

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Aadhya Medicine Agencies" },
      { name: "description", content: "Your order has been placed successfully. View your order details and download invoice." },
    ],
  }),
  component: OrderSuccessPage,
});

// ── Animated Checkmark ──────────────────────────────────────────────────
function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
      className="relative mx-auto mb-6"
    >
      {/* Outer glow ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="absolute inset-0 w-28 h-28 rounded-full bg-emerald-500/20 blur-xl"
      />
      {/* Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
        className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
      >
        {/* SVG Checkmark with stroke animation */}
        <svg viewBox="0 0 52 52" className="h-14 w-14">
          <motion.path
            d="M14 27 l8 8 16-16"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      {/* Sparkle particles */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={deg}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ delay: 0.7 + i * 0.05, duration: 0.6 }}
          className="absolute w-2 h-2 rounded-full bg-emerald-400"
          style={{
            top: `${50 - 48 * Math.cos((deg * Math.PI) / 180)}%`,
            left: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </motion.div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────────
function OrderSuccessPage() {
  const navigate = Route.useNavigate();
  const router = useRouter();
  const [downloading, setDownloading] = useState(false);

  // Get order data from router state
  const orderState = (router.state.location.state as { orderData?: OrderSuccessState })?.orderData;

  // Redirect if no order data (direct URL access)
  useEffect(() => {
    if (!orderState) {
      navigate({ to: "/products" });
    }
  }, [orderState, navigate]);

  if (!orderState) return null;

  const {
    orderId,
    orderMongoId,
    items,
    subtotal,
    cgst,
    sgst,
    grandTotal,
    paymentMode,
    timestamp,
  } = orderState;

  const formatCurrency = (val: number) => `₹${val.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formattedDate = new Date(timestamp).toLocaleString("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  });

  // ── Invoice PDF Download ────────────────────────────────────────────
  const handleDownloadInvoice = async () => {
    if (!orderMongoId) {
      toast.info("Invoice will be available once the order is processed.");
      return;
    }
    setDownloading(true);
    try {
      const response = await api.get(`/invoices/${orderMongoId}/pdf`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `AadhyaInvoice-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Invoice downloaded successfully!");
    } catch {
      toast.info("Invoice PDF is being generated. It will be available in your Account → Orders section shortly.");
    } finally {
      setDownloading(false);
    }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <PageShell>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
            {/* ── SECTION 1 — Success Header ──────────────────────────── */}
            <motion.div variants={fadeUp} className="text-center">
              <AnimatedCheckmark />

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-foreground"
              >
                Order Placed{" "}
                <span className="text-emerald-600">Successfully!</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-4 space-y-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1B3A6B]/10 px-5 py-2 text-[#1B3A6B] font-bold text-lg tracking-wide">
                  <FileText className="h-5 w-5" />
                  {orderId}
                </div>
                <p className="text-muted-foreground text-sm">
                  Thank you for ordering from{" "}
                  <strong className="text-foreground">Aadhya Medicine Agencies</strong>
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {formattedDate}
                </p>
              </motion.div>
            </motion.div>

            {/* ── SECTION 2 — Order Summary Card ─────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 border-b border-border/60 bg-[#1B3A6B]/[0.03] px-6 py-4">
                <Package className="h-5 w-5 text-[#1B3A6B]" />
                <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
                <div className="ml-auto">
                  {paymentMode === "online" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-500/20">
                      <Shield className="h-3 w-3" />
                      Paid Online via Razorpay
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-500/20">
                      <Clock className="h-3 w-3" />
                      Cash on Delivery
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-6 py-3 font-semibold">#</th>
                      <th className="px-6 py-3 font-semibold">Product</th>
                      <th className="px-6 py-3 font-semibold text-center">Qty</th>
                      <th className="px-6 py-3 font-semibold text-right">Rate</th>
                      <th className="px-6 py-3 font-semibold text-center">GST</th>
                      <th className="px-6 py-3 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-3.5 text-muted-foreground">{index + 1}</td>
                        <td className="px-6 py-3.5 font-medium text-foreground">{item.productName}</td>
                        <td className="px-6 py-3.5 text-center">{item.quantity}</td>
                        <td className="px-6 py-3.5 text-right">{formatCurrency(item.rate)}</td>
                        <td className="px-6 py-3.5 text-center">
                          <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            item.gstRate === 0 ? "bg-gray-100 text-gray-600" :
                            item.gstRate === 5 ? "bg-blue-50 text-blue-700" :
                            "bg-violet-50 text-violet-700"
                          }`}>
                            {item.gstRate === 0 ? "NIL" : `${item.gstRate}%`}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-semibold">{formatCurrency(item.lineTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden px-4 py-3 space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="rounded-xl border border-border/40 bg-muted/20 p-3.5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.productName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {item.quantity} × {formatCurrency(item.rate)}
                          {item.gstRate > 0 && ` · GST ${item.gstRate}%`}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground text-sm ml-3">{formatCurrency(item.lineTotal)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border/60 bg-muted/20 px-6 py-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal (Taxable Amount)</span>
                  <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>CGST</span>
                  <span className="font-medium text-foreground">{formatCurrency(cgst)}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>SGST</span>
                  <span className="font-medium text-foreground">{formatCurrency(sgst)}</span>
                </div>
                <div className="my-2 border-t border-border/60" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">Grand Total</span>
                  <span className="text-xl font-bold text-[#1B3A6B]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </motion.div>

            {/* ── SECTION 3 — Seller Details ──────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-border/60 bg-card shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-5 w-5 text-[#1B3A6B]" />
                <h2 className="text-lg font-semibold text-foreground">Seller Details</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <p className="font-bold text-foreground text-base">Aadhya Medicine Agencies</p>
                  <p className="text-muted-foreground leading-relaxed flex gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#1B3A6B]" />
                    Nagar Nigam Number 14/1679, Kishanpura, Saharanpur, Uttar Pradesh 247001
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#1B3A6B]" />
                    +91 72175 21744
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="rounded-xl bg-muted/40 p-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">GSTIN</span>
                      <span className="font-mono font-bold text-foreground text-xs">09MHMPK6914Q1Z5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Drug License</span>
                      <span className="font-mono font-bold text-foreground text-xs">DL-BR-PAT-123456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">State Code</span>
                      <span className="font-mono font-bold text-foreground text-xs">09 – Uttar Pradesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── SECTION 4 — Action Buttons ──────────────────────────── */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                size="lg"
                className="flex-1 bg-[#1B3A6B] hover:bg-[#152e55] text-white font-semibold shadow-md h-12"
                onClick={handleDownloadInvoice}
                disabled={downloading}
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading ? "Downloading..." : "Download Invoice PDF"}
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="flex-1 h-12 font-semibold border-[#1B3A6B]/30 text-[#1B3A6B] hover:bg-[#1B3A6B]/5"
              >
                <Link to="/account" search={{ tab: "orders" }}>
                  <Package className="h-4 w-4 mr-2" />
                  Track My Order
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="flex-1 h-12 font-semibold text-muted-foreground hover:text-foreground"
              >
                <Link to="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </motion.div>

            {/* ── SECTION 5 — WhatsApp Confirmation Strip ────────────── */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-50/80 to-emerald-100/40 dark:from-emerald-950/20 dark:to-emerald-900/10 p-5"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 flex-shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="font-semibold text-foreground text-sm">
                    Order confirmation sent to your WhatsApp
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    For queries, message us on WhatsApp
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <a
                    href={whatsappLink(`Hi, I just placed order ${orderId}. Please confirm.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    +91 72175 21744
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
