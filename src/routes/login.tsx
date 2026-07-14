import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Retailer Login — Adhya Pharmex Healthcare" },
      { name: "description", content: "Login to your Adhya Pharmex Healthcare retailer account to manage orders and access exclusive features." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful! Welcome back.");
      setFormData({ email: "", password: "" });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageShell>
      <PageHeader eyebrow="Retailer Login" title="Access Your Account" subtitle="Sign in to manage your orders, track deliveries, and explore exclusive retailer benefits." />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 h-11 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 h-11 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {/* Remember & Forgot */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Button
                type="submit"
                disabled={loading}
                variant="hero"
                size="lg"
                className="w-full"
              >
                <LogIn className="w-4 h-4" />
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-muted-foreground"
            >
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create one here
              </Link>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="relative py-4"
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <span className="relative inline-block left-1/2 -translate-x-1/2 px-3 bg-background text-xs text-muted-foreground">
                Or continue as
              </span>
            </motion.div>

            {/* Guest Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button variant="outline" size="lg" className="w-full">
                Continue as Guest
              </Button>
            </motion.div>
          </motion.form>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 space-y-3"
          >
            {[
              {
                title: "Order Tracking",
                desc: "Real-time updates on your orders",
              },
              {
                title: "Bulk Discounts",
                desc: "Exclusive pricing for registered retailers",
              },
              {
                title: "Fast Support",
                desc: "Priority customer service 24/7",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="p-4 rounded-xl border border-border/50 bg-card hover:bg-card/80 transition-smooth hover:shadow-md"
              >
                <h4 className="font-semibold text-foreground">{card.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
