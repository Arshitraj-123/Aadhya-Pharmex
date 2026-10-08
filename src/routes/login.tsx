import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck, CheckCircle2, KeyRound, RefreshCw, ArrowLeft } from "lucide-react";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

type LoginSearch = {
  redirect?: string;
  registeredEmail?: string;
  autoFill?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    registeredEmail: typeof search.registeredEmail === "string" ? search.registeredEmail : undefined,
    autoFill: typeof search.autoFill === "string" ? search.autoFill : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Retailer Login — Aadya Medicine Agencies" },
      { name: "description", content: "Login to your Aadya Medicine Agencies retailer account to manage orders and access exclusive features." },
    ],
  }),
  component: LoginPage,
});

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

function LoginPage() {
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
  const [authStep, setAuthStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resending, setResending] = useState(false);
  const [autoFillNotice, setAutoFillNotice] = useState<string | null>(null);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Google Link Account dialog
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkEmail, setLinkEmail] = useState("");
  const [linkPassword, setLinkPassword] = useState("");
  const [linkCredential, setLinkCredential] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Countdown timer for 2FA resend
  useEffect(() => {
    let timer: any;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Auto-fill credentials after successful 2-step registration verification
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("autofill_login");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.email) {
          setFormData({
            email: parsed.email,
            password: parsed.password || "",
          });
          if (parsed.verificationToken) {
            setVerificationToken(parsed.verificationToken);
          }
          setAutoFillNotice(
            parsed.isGoogle
              ? `Account verified for ${parsed.email}. Click Continue with Google or enter your password to sign in.`
              : `Registration verified! Your registered email and password are auto-filled below. Simply press Sign In to continue.`
          );
          toast.success("Account verified! Credentials auto-filled.");
        }
        sessionStorage.removeItem("autofill_login");
      } else if (search?.registeredEmail) {
        setFormData((prev) => ({ ...prev, email: search.registeredEmail! }));
        setAutoFillNotice(`Account verified for ${search.registeredEmail}. Please enter your password and click Sign In.`);
      }
    } catch (e) {
      console.error("Autofill retrieval error:", e);
    }
  }, [search?.registeredEmail]);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    loadGoogleScript()
      .then(() => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback,
          });
          const container = document.getElementById("google-signin-btn");
          if (container) {
            window.google.accounts.id.renderButton(container, {
              theme: "outline",
              size: "large",
              width: "100%",
              text: "continue_with",
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
      
      // If retailer is non-registered and requires 2-step OTP verification:
      if (res.data.requiresOtp) {
        toast.info(res.data.message || "New retailer registration: 2-step verification code sent.");
        navigate({
          to: "/signup",
          search: {
            googleEmail: res.data.email,
            verifyOtp: "true",
            redirect: search?.redirect,
          },
        });
        return;
      }

      login(res.data.token, res.data.user);
      toast.success(res.data.message || "Login successful!");
      const target = getRedirectTarget();
      navigate({ to: target as any });
    } catch (err: any) {
      if (err.response?.data?.code === "ACCOUNT_EXISTS_LINK_REQUIRED") {
        setLinkEmail(err.response.data.email);
        setLinkCredential(response.credential);
        setShowLinkDialog(true);
        toast.info("An account with this email already exists. Please verify your password to link.");
      } else {
        toast.error(err.response?.data?.message || "Google sign-in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAccount = async () => {
    if (!linkPassword) {
      toast.error("Please enter your password");
      return;
    }
    setLinkLoading(true);
    try {
      const res = await api.post("/auth/link-google", {
        credential: linkCredential,
        email: linkEmail,
        password: linkPassword,
      });
      login(res.data.token, res.data.user);
      toast.success("Google account linked successfully!");
      setShowLinkDialog(false);
      const target = getRedirectTarget();
      navigate({ to: target as any });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to link account");
    } finally {
      setLinkLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authStep === 1) {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }
      setLoading(true);
      try {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
          verificationToken: verificationToken || undefined,
        });

        // Instant login if registration was just verified via verificationToken:
        if (res.data.token) {
          login(res.data.token, res.data.user);
          toast.success(res.data.message || "Sign In successful! Welcome to Aadya Medicine Agencies.");
          const target = getRedirectTarget();
          navigate({ to: target as any });
          return;
        }

        toast.success(res.data.message || "Credentials verified! 2FA verification code sent via Hostinger Business Email.");
        setAuthStep(2);
        setResendCountdown(30);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    } else {
      if (otp.length !== 4) {
        toast.error("Please enter the 4-digit OTP");
        return;
      }
      setLoading(true);
      try {
        const res = await api.post("/auth/login-verify", {
          email: formData.email,
          otp,
        });
        login(res.data.token, res.data.user);
        toast.success("Login successful! Welcome back.");
        const target = getRedirectTarget();
        navigate({ to: target as any });
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Invalid OTP");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendLoginOtp = async () => {
    if (resendCountdown > 0 || resending) return;
    setResending(true);
    try {
      const res = await api.post("/auth/resend-otp", {
        email: formData.email,
        purpose: "login",
      });
      toast.success(res.data.message || "Fresh 2FA code sent via Hostinger Business Email!");
      setResendCountdown(30);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
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
          {search?.redirect === "/cart" && (
            <div className="mb-6 rounded-2xl border border-[#1B3A6B]/30 bg-[#1B3A6B]/10 p-4 text-center text-sm font-medium text-[#1B3A6B] shadow-sm">
              <span className="font-bold">Cart Checkout:</span> Please sign in to complete your order and proceed with checkout.
            </div>
          )}

          {autoFillNotice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-900 dark:text-emerald-200 text-sm font-medium shadow-sm flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-emerald-950 dark:text-emerald-100">Account Verified Successfully!</p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">{autoFillNotice}</p>
              </div>
            </motion.div>
          )}

          <motion.form
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            {authStep === 1 ? (
              <>
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

                {/* Google Divider & Sign-In */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative py-4"
                >
                  <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
                  <span className="relative inline-block left-1/2 -translate-x-1/2 px-3 bg-background text-xs text-muted-foreground">
                    Or continue with
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  {GOOGLE_CLIENT_ID ? (
                    <div id="google-signin-btn" className="flex justify-center" />
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
                      Continue with Google
                    </Button>
                  )}
                </motion.div>
              </>
            ) : (
              <>
                {/* OTP Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-8 ring-primary/5">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-1">Two-Factor Authentication</h2>
                  <p className="text-sm text-muted-foreground mb-2">
                    Enter the 4-digit code sent to:
                    <br />
                    <strong className="text-foreground font-semibold">{formData.email}</strong>
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-6 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Hostinger Business Email Secured
                  </div>
                  
                  <div className="relative max-w-[200px] mx-auto">
                    <input
                      type="text"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      className="w-full text-center tracking-[0.75em] text-2xl font-bold h-14 rounded-xl bg-secondary border border-border focus:border-primary outline-none transition-smooth text-foreground shadow-inner"
                      autoFocus
                    />
                  </div>
                </motion.div>

                {/* Verify Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pt-2 space-y-3"
                >
                  <Button
                    type="submit"
                    disabled={loading || otp.length !== 4}
                    variant="hero"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </Button>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                    <button
                      type="button"
                      onClick={handleResendLoginOtp}
                      disabled={resendCountdown > 0 || resending}
                      className="text-primary font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                      {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend 2FA Code"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthStep(1)}
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                    </button>
                  </div>
                </motion.div>
              </>
            )}

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-sm text-muted-foreground"
            >
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                search={search?.redirect ? { redirect: search.redirect } : undefined}
                className="text-primary font-semibold hover:underline"
              >
                Create one here
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
                    An account exists with <strong>{linkEmail}</strong>. Enter your password to link Google sign-in.
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
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => { setShowLinkDialog(false); setLinkPassword(""); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="hero"
                    className="flex-1"
                    disabled={linkLoading}
                    onClick={handleLinkAccount}
                  >
                    {linkLoading ? "Linking..." : "Link & Sign In"}
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

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
