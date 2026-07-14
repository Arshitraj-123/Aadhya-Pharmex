import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Building2,
  MapPin,
  UserCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Retailer Signup — Adhya Pharmex Healthcare" },
      { name: "description", content: "Register as a retailer with Adhya Pharmex Healthcare to access our comprehensive pharmaceutical catalog and exclusive benefits." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.storeName ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Signup successful! Welcome to Adhya Pharmex.");
      setFormData({
        fullName: "",
        storeName: "",
        email: "",
        phone: "",
        city: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Become a Retailer"
        title="Join Our Network"
        subtitle="Register as a partner retailer and access 8000+ pharmaceutical products with exclusive benefits."
      />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {/* Personal Information */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
              <h3 className="font-semibold text-foreground">Personal Information</h3>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
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
                    className="w-full pl-11 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99999 99999"
                    className="w-full pl-11 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>
            </div>

            {/* Store Information */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
              <h3 className="font-semibold text-foreground">Store Information</h3>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="relative"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Store Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Your Pharmacy Name"
                    className="w-full pl-11 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground"
                  >
                    <option value="">Select City</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </motion.div>
            </div>

            {/* Security */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm space-y-4">
              <h3 className="font-semibold text-foreground">Security</h3>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
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
                    className="w-full pl-11 pr-11 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none transition-smooth text-sm text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Terms & Conditions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-start gap-3"
            >
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-primary mt-1 cursor-pointer"
              />
              <label className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="submit"
                disabled={loading}
                variant="hero"
                size="lg"
                className="w-full"
              >
                <UserCheck className="w-4 h-4" />
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-center text-sm text-muted-foreground"
            >
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in here
              </Link>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </PageShell>
  );
}
