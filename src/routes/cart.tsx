import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Store, Loader2, Lock, AlertTriangle, CreditCard, Banknote, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CartItem } from "@/components/site/CartItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Aadya Medicine Agencies" },
      { name: "description", content: "Review your selected medicines and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

// ── Razorpay Script Loader ──────────────────────────────────────────────
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("razorpay-checkout-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.head.appendChild(script);
  });
}

// ── Razorpay Window Type ────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: any;
  }
}

function CartPage() {
  const navigate = Route.useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Load Razorpay script on mount
  useEffect(() => {
    loadRazorpayScript()
      .then(() => setRazorpayReady(true))
      .catch((err) => {
        console.error(err);
        setRazorpayReady(false);
      });
  }, []);

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  const [demoCheckoutOpen, setDemoCheckoutOpen] = useState(false);
  const [demoOrderInfo, setDemoOrderInfo] = useState<any>(null);

  const completePaymentVerification = async (
    orderId: string,
    paymentId = `pay_demo_${Date.now()}`,
    signature = `sig_demo_${Date.now()}`
  ) => {
    setLoading(true);
    try {
      const cartItemsPayload = items.map((item) => ({
        productId: item.product.id,
        qtyOrdered: item.quantity,
        rate: item.product.price,
        gstRate: item.product.gstRate ?? 18,
      }));

      const { data: verifyData } = await api.post("/verify-payment", {
        order_id: orderId,
        payment_id: paymentId,
        signature: signature,
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        cartItems: cartItemsPayload,
        retailerId: user?.retailerId,
      });

      // Build order-success state from cart items
      const orderItems = items.map((item) => {
        const gst = item.product.gstRate ?? 18;
        const base = item.product.price * item.quantity;
        return {
          productName: item.product.name,
          quantity: item.quantity,
          rate: item.product.price,
          gstRate: gst,
          lineTotal: base * (1 + gst / 100),
        };
      });
      const subtotal = orderItems.reduce((s, i) => s + i.rate * i.quantity, 0);
      const cgst = orderItems.reduce((s, i) => s + (i.rate * i.quantity * i.gstRate) / 200, 0);
      const sgst = cgst;

      clearCart();
      navigate({
        to: "/order-success",
        state: {
          orderData: {
            orderId: verifyData.orderId,
            orderMongoId: verifyData.orderMongoId,
            items: orderItems,
            subtotal,
            cgst,
            sgst,
            grandTotal: verifyData.totalValue,
            paymentMode: "online" as const,
            timestamp: new Date().toISOString(),
          },
        } as any,
      });
    } catch (verifyErr: any) {
      toast.error(verifyErr.response?.data?.message || "Payment verification failed. Contact support.");
    } finally {
      setLoading(false);
    }
  };

  // ── Razorpay Online Payment Flow ────────────────────────────────────
  const handleRazorpayCheckout = async () => {
    if (!user?.retailerId) {
      toast.error("Retailer verification required: Your account is not yet linked to an authorized pharmacy store.");
      navigate({ to: "/account" });
      return;
    }

    // Filter out outdated/mock products from old local storage
    const invalidItems = items.filter(item => !/^[0-9a-fA-F]{24}$/.test(item.product.id));
    if (invalidItems.length > 0) {
      toast.error("Outdated items detected in your cart. Removing them automatically.");
      invalidItems.forEach(item => removeItem(item.product.id));
      return;
    }

    if (!RAZORPAY_KEY_ID || !razorpayReady) {
      toast.error("Payment gateway is not configured. Please try Cash on Delivery or contact support.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Create Razorpay order via backend (minimum 100 paise)
      const amountInPaise = Math.round(totalAmount * 100);
      if (amountInPaise < 100) {
        toast.error("Minimum order amount for Razorpay checkout is ₹1.00 (100 paise).");
        setLoading(false);
        return;
      }

      const { data: orderData } = await api.post("/create-order", {
        amount: amountInPaise,
        currency: "INR",
        receipt: `cart_${Date.now()}`,
      });

      // If backend returned demo_mode (e.g. test key inactive upstream), open in-page test checkout dialog
      if (orderData.demo_mode) {
        setLoading(false);
        setDemoOrderInfo(orderData);
        setDemoCheckoutOpen(true);
        return;
      }

      // Step 2: Open official Razorpay checkout modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Aadhya Medicine Agencies",
        description: "Pharmaceutical Medicine Order",
        order_id: orderData.order_id || orderData.razorpay_order_id,
        prefill: {
          name: user?.fullName || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#1B3A6B",
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          await completePaymentVerification(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment was cancelled. Your cart items are safe.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setLoading(false);
        toast.error(`Payment failed: ${response.error?.description || "Unknown error"}. Please try again.`);
      });
      razorpay.open();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  // ── Cash on Delivery Flow ───────────────────────────────────────────
  const handleCodCheckout = async () => {
    if (!user?.retailerId) {
      toast.error("Retailer verification required: Your account is not yet linked to an authorized pharmacy store.");
      navigate({ to: "/account" });
      return;
    }

    const invalidItems = items.filter(item => !/^[0-9a-fA-F]{24}$/.test(item.product.id));
    if (invalidItems.length > 0) {
      toast.error("Outdated items detected in your cart. Removing them automatically.");
      invalidItems.forEach(item => removeItem(item.product.id));
      return;
    }

    setLoading(true);
    try {
      const orderPayload = items.map((item) => ({
        productId: item.product.id,
        qtyOrdered: item.quantity,
        rate: item.product.price,
        gstRate: item.product.gstRate ?? 18,
      }));

      const { data: orderRes } = await api.post("/orders", {
        retailerId: user.retailerId,
        items: orderPayload,
        paymentMode: "Cash",
      });

      // Build order-success state from cart items
      const successItems = items.map((item) => {
        const gst = item.product.gstRate ?? 18;
        const base = item.product.price * item.quantity;
        return {
          productName: item.product.name,
          quantity: item.quantity,
          rate: item.product.price,
          gstRate: gst,
          lineTotal: base * (1 + gst / 100),
        };
      });
      const subtotal = successItems.reduce((s, i) => s + i.rate * i.quantity, 0);
      const cgst = successItems.reduce((s, i) => s + (i.rate * i.quantity * i.gstRate) / 200, 0);
      const sgst = cgst;
      const grandTotal = subtotal + cgst + sgst;

      clearCart();
      navigate({
        to: "/order-success",
        state: {
          orderData: {
            orderId: orderRes.order?.orderId || `ORD-${Date.now()}`,
            orderMongoId: orderRes.order?._id,
            items: successItems,
            subtotal,
            cgst,
            sgst,
            grandTotal,
            paymentMode: "cod" as const,
            timestamp: new Date().toISOString(),
          },
        } as any,
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Main Checkout Handler ───────────────────────────────────────────
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.info("Please sign in to complete your order");
      navigate({
        to: "/login",
        search: { redirect: "/cart" },
      });
      return;
    }

    if (paymentMethod === "online") {
      await handleRazorpayCheckout();
    } else {
      await handleCodCheckout();
    }
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Shopping Cart" title="Your selected essentials" subtitle="Everything you need for a smooth and convenient order experience." />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-border/60 bg-card/80 p-8 text-center shadow-sm md:p-12"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Your cart is feeling a little empty</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                Browse our premium medicine range and add your essentials to begin a seamless order experience.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link to="/products">
                  <Store className="h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onIncrease={(productId) => updateQuantity(productId, (items.find((entry) => entry.product.id === productId)?.quantity ?? 0) + 1)}
                    onDecrease={(productId) => updateQuantity(productId, (items.find((entry) => entry.product.id === productId)?.quantity ?? 0) - 1)}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <motion.aside
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">{totalItems} items</span>
                </div>

                <div className="mt-6 space-y-4 border-y border-border/60 py-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Total Items</span>
                    <span className="font-semibold text-foreground">{totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estimated Total</span>
                    <span className="font-semibold text-foreground">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

                {/* ── Payment Method Selector ─────────────────────────────── */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Payment Method</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Pay Online Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("online")}
                      className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                        paymentMethod === "online"
                          ? "border-[#1B3A6B] bg-[#1B3A6B]/5 shadow-md ring-1 ring-[#1B3A6B]/20"
                          : "border-border/60 bg-card hover:border-[#1B3A6B]/40 hover:bg-[#1B3A6B]/[0.02]"
                      }`}
                    >
                      {paymentMethod === "online" && (
                        <div className="absolute -top-1.5 -right-1.5">
                          <CheckCircle2 className="h-5 w-5 text-[#1B3A6B] fill-[#1B3A6B]/10" />
                        </div>
                      )}
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "online" ? "bg-[#1B3A6B]/10 text-[#1B3A6B]" : "bg-muted text-muted-foreground"
                      }`}>
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${paymentMethod === "online" ? "text-[#1B3A6B]" : "text-foreground"}`}>Pay Online</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">UPI · Cards · Net Banking</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        <span className="text-[9px] font-medium text-emerald-700">Secure Payment</span>
                      </div>
                    </button>

                    {/* Cash on Delivery Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                        paymentMethod === "cod"
                          ? "border-[#1B3A6B] bg-[#1B3A6B]/5 shadow-md ring-1 ring-[#1B3A6B]/20"
                          : "border-border/60 bg-card hover:border-[#1B3A6B]/40 hover:bg-[#1B3A6B]/[0.02]"
                      }`}
                    >
                      {paymentMethod === "cod" && (
                        <div className="absolute -top-1.5 -right-1.5">
                          <CheckCircle2 className="h-5 w-5 text-[#1B3A6B] fill-[#1B3A6B]/10" />
                        </div>
                      )}
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === "cod" ? "bg-[#1B3A6B]/10 text-[#1B3A6B]" : "bg-muted text-muted-foreground"
                      }`}>
                        <Banknote className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${paymentMethod === "cod" ? "text-[#1B3A6B]" : "text-foreground"}`}>Cash on Delivery</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">Pay at time of delivery</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Lock className="h-3 w-3 text-amber-600" />
                        <span className="text-[9px] font-medium text-amber-700">Trusted Retailers</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {isAuthenticated && !user?.retailerId && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-800 dark:text-amber-300">
                      <div className="font-semibold flex items-center gap-1.5 mb-1 text-sm">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Retailer Store Verification
                      </div>
                      Your user account is not yet linked to an authorized pharmacy store. Please link or register your pharmacy profile to enable wholesale order dispatch.
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs h-7 border-amber-600/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20"
                          onClick={() => navigate({ to: "/account" })}
                        >
                          Complete Store Profile
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}

                  <Button asChild className="w-full" variant="outline">
                    <Link to="/products">
                      <Store className="h-4 w-4 mr-1.5" />
                      Continue Shopping
                    </Link>
                  </Button>

                  <Button 
                    className="w-full bg-[#1B3A6B] hover:bg-[#152e55] text-white font-semibold h-11 shadow-md transition-smooth" 
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {paymentMethod === "online" ? "Processing Payment..." : "Placing Order..."}
                      </>
                    ) : (
                      <>
                        {paymentMethod === "online" ? (
                          <>
                            <CreditCard className="h-4 w-4 mr-1.5" />
                            Pay {formatCurrency(totalAmount)}
                          </>
                        ) : (
                          <>
                            Proceed to Checkout
                            <ArrowRight className="h-4 w-4 ml-1.5" />
                          </>
                        )}
                      </>
                    )}
                  </Button>

                  {/* Razorpay Trust Badge */}
                  {paymentMethod === "online" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center gap-2 pt-2 text-[10px] text-muted-foreground"
                    >
                      <Lock className="h-3 w-3" />
                      <span>Secured by <strong>Razorpay</strong> · 256-bit SSL Encryption</span>
                    </motion.div>
                  )}
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </section>

      {/* Razorpay Test Mode Dialog */}
      <Dialog open={demoCheckoutOpen} onOpenChange={(open) => {
        if (!open) {
          setDemoCheckoutOpen(false);
          setLoading(false);
          toast.info("Payment was cancelled. Your cart items are safe.");
        }
      }}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
          <div className="bg-[#1B3A6B] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-lg border border-white/20">
                ₹
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">Razorpay Standard Checkout</h3>
                <p className="text-xs text-blue-200 mt-0.5">Test Simulation · Aadya Medicine Agencies</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-blue-200 uppercase tracking-wider">Total</div>
              <div className="text-xl font-bold">{formatCurrency(totalAmount)}</div>
            </div>
          </div>

          <div className="p-5 space-y-4 bg-background">
            <div className="p-3 bg-muted/60 rounded-xl border border-border/70 text-xs space-y-1.5">
              <div className="flex justify-between text-muted-foreground">
                <span>Order Reference:</span>
                <span className="font-mono text-foreground font-semibold">{demoOrderInfo?.order_id}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Pharmacy:</span>
                <span className="text-foreground font-medium">{user?.fullName || "Retailer Store"}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Items:</span>
                <span className="text-foreground font-medium">{totalItems} products</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Select Test Instrument
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl border-2 border-primary bg-primary/5 font-semibold text-primary shadow-xs">
                  💳 Test Card
                  <div className="text-[10px] text-muted-foreground font-normal mt-0.5">4111 •••• 1111</div>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card font-medium text-foreground">
                  📱 Test UPI
                  <div className="text-[10px] text-muted-foreground mt-0.5">success@rzp</div>
                </div>
                <div className="p-3 rounded-xl border border-border bg-card font-medium text-foreground">
                  🏦 NetBanking
                  <div className="text-[10px] text-muted-foreground mt-0.5">HDFC / ICICI</div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button
                className="w-full bg-[#1B3A6B] hover:bg-[#152e55] text-white font-semibold h-11 shadow-md transition-smooth"
                disabled={loading}
                onClick={async () => {
                  setDemoCheckoutOpen(false);
                  await completePaymentVerification(demoOrderInfo?.order_id || `order_demo_${Date.now()}`);
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Complete Test Payment (Success)
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs h-9"
                onClick={() => {
                  setDemoCheckoutOpen(false);
                  setLoading(false);
                  toast.error("Payment failed: Bank transaction declined (Test Mode).");
                }}
              >
                Simulate Payment Failure
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-1">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Razorpay 256-bit SSL · Signature HMAC Verification Enabled</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
