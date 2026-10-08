import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  ShieldCheck,
} from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

// Google Identity Services loader
function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-gsi-script")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "google-gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
}

type SignupSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>): SignupSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Retailer Signup — Aadya Medicine Agencies" },
      { name: "description", content: "Register as a retailer with Aadya Medicine Agencies to access our comprehensive pharmaceutical catalog and exclusive benefits." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { login } = useAuth();

  const getRedirectTarget = () => {
    if (search?.redirect) return search.redirect;
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const r = urlParams.get("redirect");
      if (r) return r;
    }
    return "/";
  };

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

  // Google link dialog state
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkEmail, setLinkEmail] = useState("");
  const [linkPassword, setLinkPassword] = useState("");
  const [linkCredential, setLinkCredential] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    loadGoogleScript()
      .then(() => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
          });
          const container = document.getElementById("google-signup-btn");
          if (container) {
            window.google.accounts.id.renderButton(container, {
              theme: "outline",
              size: "large",
              width: "100%",
              text: "signup_with",
              shape: "pill",
            });
          }
        }
      })
      .catch(console.error);
  }, [GOOGLE_CLIENT_ID]);

  const handleGoogleCallback = async (response: { credential: string }) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/google", { credential: response.credential });
      login(res.data.token, res.data.user);
      toast.success(res.data.message || "Account created with Google!");
      const target = getRedirectTarget();
      navigate({ to: target as any });
    } catch (err: any) {
      if (err.response?.data?.code === "ACCOUNT_EXISTS_LINK_REQUIRED") {
        setLinkEmail(err.response.data.email);
        setLinkCredential(response.credential);
        setShowLinkDialog(true);
        toast.info("An account with this email exists. Verify your password to link Google.");
      } else {
        toast.error(err.response?.data?.message || "Google sign-up failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAccount = async () => {
    if (!linkPassword) { toast.error("Please enter your password"); return; }
    setLinkLoading(true);
    try {
      const res = await api.post("/auth/link-google", { credential: linkCredential, email: linkEmail, password: linkPassword });
      login(res.data.token, res.data.user);
      toast.success("Google account linked!");
      setShowLinkDialog(false);
      const target = getRedirectTarget();
      navigate({ to: target as any });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to link account");
    } finally {
      setLinkLoading(false);
    }
  };

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    try {
      await api.post("/auth/register", {
        fullName: formData.fullName,
        storeName: formData.storeName,
        email: formData.email,
        password: formData.password,
        role: "Retailer",
        city: formData.city
      });
      toast.success("Signup successful! Welcome to Aadya Medicine Agencies.");
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
      navigate({
        to: "/login",
        search: search?.redirect ? { redirect: search.redirect } : undefined,
      });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
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

            {/* Google Divider & Sign-Up */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52 }}
              className="relative py-4"
            >
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <span className="relative inline-block left-1/2 -translate-x-1/2 px-3 bg-background text-xs text-muted-foreground">
                Or sign up with
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.53 }}
            >
              {GOOGLE_CLIENT_ID ? (
                <div id="google-signup-btn" className="flex justify-center" />
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center gap-2"
                  onClick={() => toast.info("Google Sign-In requires VITE_GOOGLE_CLIENT_ID in .env")}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </Button>
              )}
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-center text-sm text-muted-foreground"
            >
              Already have an account?{" "}
              <Link 
                to="/login" 
                search={search?.redirect ? { redirect: search.redirect } : undefined}
                className="text-primary font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </motion.div>
          </motion.form>

          {/* Account Linking Dialog */}
          {showLinkDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-2xl border border-border shadow-elegant p-6 max-w-sm w-full space-y-4"
              >
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">Link Your Google Account</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    An account exists with <strong>{linkEmail}</strong>. Enter your password to link.
                  </p>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={linkPassword}
                    onChange={(e) => setLinkPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 h-11 rounded-lg bg-secondary border border-border focus:border-primary outline-none text-foreground"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => { setShowLinkDialog(false); setLinkPassword(""); }}>Cancel</Button>
                  <Button variant="hero" className="flex-1" disabled={linkLoading} onClick={handleLinkAccount}>
                    {linkLoading ? "Linking..." : "Link & Sign In"}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
