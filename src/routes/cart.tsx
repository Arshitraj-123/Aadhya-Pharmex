import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Store, Loader2 } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { CartItem } from "@/components/site/CartItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Aadya Pharmex Healthcare" },
      { name: "description", content: "Review your selected medicines and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = Route.useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalAmount } = useCart();
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to proceed with checkout.");
      navigate({ to: "/login" });
      return;
    }

    if (!user?.retailerId) {
      toast.error("No linked retailer account found. Cannot place order.");
      return;
    }

    setLoading(true);
    try {
      // Format items for the backend
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        qtyOrdered: item.quantity,
        rate: item.product.price, // PTR
        gstRate: 18 // Default 18% GST for demo
      }));

      await api.post("/orders", {
        retailerId: user.retailerId,
        items: orderItems,
        paymentMode: "Cash"
      });

      toast.success("Order placed successfully! Live updates sent to Admin Dashboard.");
      clearCart();
      navigate({ to: "/products" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
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

                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full" variant="outline">
                    <Link to="/products">
                      <Store className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="hero" 
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
