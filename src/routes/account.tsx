import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  User, Package, MapPin, ShieldCheck, Mail, Lock, Phone, Building2,
  Eye, EyeOff, ChevronRight, Calendar, Clock, Truck, CheckCircle2,
  XCircle, AlertCircle, Edit3, Save, X, RefreshCw, Hash, CreditCard
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { io, Socket } from "socket.io-client";

type AccountSearch = { tab?: string; orderId?: string };

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): AccountSearch => ({
    tab: (search.tab as string) || "profile",
    orderId: search.orderId as string,
  }),
  head: () => ({
    meta: [
      { title: "My Account — Aadya Medicine Agencies" },
      { name: "description", content: "Manage your profile, orders, and security settings." },
    ],
  }),
  component: AccountPage,
});

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-indigo-100 text-indigo-700",
  Dispatched: "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-teal-100 text-teal-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
  "Credit Hold": "bg-orange-100 text-orange-700",
};

const TRACKING_STEPS = ["Pending", "Confirmed", "Processing", "Dispatched", "Out for Delivery", "Delivered"];

function AccountPage() {
  const { tab, orderId } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { user, token, isAuthenticated, updateUser, refreshUser, logout } = useAuth();
  const socketRef = useRef<Socket | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  // Refresh profile on mount
  useEffect(() => {
    if (token) refreshUser();
  }, [token]);

  // Socket.IO connection for real-time updates
  useEffect(() => {
    if (!token) return;
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const socket = io(API_URL, { auth: { token }, transports: ["websocket", "polling"] });
    socketRef.current = socket;

    socket.on("order:status-updated", (data: any) => {
      toast.info(`Order ${data.order?.orderId || data.orderId} status changed to ${data.status}`);
      // Trigger re-fetch in orders tab
      window.dispatchEvent(new CustomEvent("order-updated", { detail: data }));
    });

    socket.on("orders:cancelled", (data: any) => {
      toast.warning(`Order ${data.order?.orderId || data.orderId} was cancelled`);
      window.dispatchEvent(new CustomEvent("order-updated", { detail: data }));
    });

    return () => { socket.disconnect(); };
  }, [token]);

  if (!isAuthenticated || !user) return null;

  const tabs = [
    { key: "profile", label: "My Profile", icon: User },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "tracking", label: "Order Tracking", icon: MapPin },
    { key: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    <PageShell>
      <section className="py-8 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Account Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground mt-1">Manage your profile, orders, and security settings</p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Tabs */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-64 shrink-0"
            >
              <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
                {/* Mini profile */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    {user.profilePhoto ? (
                      <img src={user.profilePhoto} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
                        {user.fullName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-foreground truncate">{user.fullName}</div>
                      <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                      <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tab navigation */}
                <nav className="p-2">
                  {tabs.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => navigate({ search: { tab: t.key } })}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                        tab === t.key
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <t.icon className="w-4 h-4" />
                      {t.label}
                      {tab === t.key && <ChevronRight className="w-3 h-3 ml-auto" />}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Content Area */}
            <motion.main
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-w-0"
            >
              {tab === "profile" && <ProfileSection user={user} updateUser={updateUser} />}
              {tab === "orders" && <OrdersSection navigate={navigate} />}
              {tab === "tracking" && <TrackingSection orderId={orderId} navigate={navigate} />}
              {tab === "security" && <SecuritySection user={user} />}
            </motion.main>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROFILE SECTION
   ═══════════════════════════════════════════════════════════════════════ */
function ProfileSection({ user, updateUser }: { user: any; updateUser: (u: any) => void }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    phone: user.phone || "",
    address: user.address || "",
    storeName: user.storeName || "",
    city: user.city || ""
  });

  // Email change OTP flow
  const [emailModal, setEmailModal] = useState(false);
  const [emailStep, setEmailStep] = useState<1 | 2>(1);
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const { login, token } = useAuth();

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const res = await api.put("/users/me", form);
      const updatedStoreName = res.data.retailerId?.name || form.storeName;
      const updatedCity = res.data.retailerId?.city || form.city;
      updateUser({
        fullName: res.data.fullName,
        phone: res.data.phone,
        address: res.data.address,
        storeName: updatedStoreName,
        city: updatedCity
      });
      toast.success("Profile and pharmacy details updated successfully");
      setEditing(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestEmailOtp = async () => {
    if (!newEmail) { toast.error("Enter new email"); return; }
    setEmailLoading(true);
    try {
      await api.post("/auth/request-email-change", { newEmail });
      toast.success("OTP sent to new email");
      setEmailStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (emailOtp.length !== 4) { toast.error("Enter 4-digit OTP"); return; }
    setEmailLoading(true);
    try {
      const res = await api.post("/auth/verify-email-change", { newEmail, otp: emailOtp });
      login(res.data.token, res.data.user);
      toast.success("Email updated successfully");
      setEmailModal(false);
      setNewEmail("");
      setEmailOtp("");
      setEmailStep(1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to verify OTP");
    } finally {
      setEmailLoading(false);
    }
  };

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })
    : "N/A";

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5" />
        <div className="p-6 -mt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {user.profilePhoto ? (
              <img src={user.profilePhoto} alt="" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-card shadow-lg" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold ring-4 ring-card shadow-lg">
                {user.fullName?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{user.fullName}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {user.role}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Member since {memberSince}
                </span>
                {user.authProvider && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {user.authProvider === "both" ? "Local + Google" : user.authProvider === "google" ? "Google" : "Local"} Auth
                  </span>
                )}
              </div>
            </div>
            <Button
              variant={editing ? "outline" : "hero"}
              size="sm"
              onClick={() => {
                if (editing) {
                  setForm({
                    fullName: user.fullName || "",
                    phone: user.phone || "",
                    address: user.address || "",
                    storeName: user.storeName || "",
                    city: user.city || ""
                  });
                }
                setEditing(!editing);
              }}
            >
              {editing ? <><X className="w-4 h-4" /> Cancel</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <h3 className="font-semibold text-foreground">Personal & Account Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Full Name</label>
            {editing ? (
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:border-primary outline-none" />
            ) : (
              <p className="text-sm text-foreground font-medium">{user.fullName}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email Address</label>
            <div className="flex items-center gap-2">
              <p className="text-sm text-foreground font-medium">{user.email}</p>
              <button onClick={() => setEmailModal(true)} className="text-[10px] font-semibold text-primary hover:underline">Change</button>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Phone Number</label>
            {editing ? (
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 99999 99999" className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:border-primary outline-none" />
            ) : (
              <p className="text-sm text-foreground font-medium">{user.phone || "Not set"}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Address / Store Location</label>
            {editing ? (
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full address" className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:border-primary outline-none" />
            ) : (
              <p className="text-sm text-foreground font-medium">{user.address || "Not set"}</p>
            )}
          </div>
        </div>

        {/* Store / Pharmacy Details */}
        <div className="pt-4 border-t border-border/50">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-primary" /> Pharmacy / Store Details (Syncs with Admin)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Store Name</label>
              {editing ? (
                <input
                  value={form.storeName}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                  placeholder="e.g. City Health Pharmacy"
                  className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:border-primary outline-none"
                />
              ) : (
                <p className="text-sm font-medium text-foreground">{user.storeName || "Not set"}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">City / Town</label>
              {editing ? (
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="e.g. Patna, Muzaffarpur"
                  className="w-full h-10 rounded-lg bg-secondary border border-border px-3 text-sm text-foreground focus:border-primary outline-none"
                />
              ) : (
                <p className="text-sm font-medium text-foreground">{user.city || "Not set"}</p>
              )}
            </div>
          </div>
        </div>

        {editing && (
          <div className="flex justify-end pt-3">
            <Button variant="hero" size="sm" disabled={loading} onClick={handleSaveProfile}>
              <Save className="w-4 h-4" /> {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      {/* Email Change Modal */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border shadow-elegant p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-lg text-foreground text-center">{emailStep === 1 ? "Change Email Address" : "Verify OTP"}</h3>
            {emailStep === 1 ? (
              <>
                <p className="text-sm text-muted-foreground text-center">Enter your new email address. An OTP will be sent for verification.</p>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@email.com" className="w-full h-11 rounded-lg bg-secondary border border-border px-4 text-foreground focus:border-primary outline-none" />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => { setEmailModal(false); setNewEmail(""); }}>Cancel</Button>
                  <Button variant="hero" className="flex-1" disabled={emailLoading} onClick={handleRequestEmailOtp}>
                    {emailLoading ? "Sending..." : "Send OTP"}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground text-center">Enter the 4-digit OTP sent to <strong>{newEmail}</strong></p>
                <input type="text" maxLength={4} value={emailOtp} onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, ""))} placeholder="••••" className="w-full text-center tracking-[0.75em] text-2xl font-bold h-14 rounded-xl bg-secondary border border-border focus:border-primary outline-none text-foreground" />
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setEmailStep(1)}>Back</Button>
                  <Button variant="hero" className="flex-1" disabled={emailLoading} onClick={handleVerifyEmailOtp}>
                    {emailLoading ? "Verifying..." : "Verify"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ORDERS SECTION
   ═══════════════════════════════════════════════════════════════════════ */
function OrdersSection({ navigate }: { navigate: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [viewOrder, setViewOrder] = useState<any | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);

  const filters = ["All", "Pending", "Confirmed", "Processing", "Dispatched", "Out for Delivery", "Delivered", "Cancelled"];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filter !== "All") params.status = filter;
      const res = await api.get("/orders/my-orders", { params });
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // Listen for socket updates
  useEffect(() => {
    const handler = () => fetchOrders();
    window.addEventListener("order-updated", handler);
    return () => window.removeEventListener("order-updated", handler);
  }, [fetchOrders]);

  const handleCancel = async () => {
    if (!cancelId) return;
    setCancelLoading(true);
    try {
      await api.post(`/orders/${cancelId}/cancel`, { reason: cancelReason || "Cancelled by retailer" });
      toast.success("Order cancelled successfully");
      setCancelId(null);
      setCancelReason("");
      fetchOrders();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  const cancellable = (status: string) => ["Pending", "Confirmed", "Processing", "Credit Hold"].includes(status);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-foreground">My Orders</h3>
        <button onClick={fetchOrders} className="text-xs text-primary flex items-center gap-1 hover:underline">
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-smooth ${
              filter === f ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" /> Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p>No orders found{filter !== "All" ? ` with status "${filter}"` : ""}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border/50 bg-card p-4 hover:shadow-md transition-smooth"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground text-sm">{order.orderId}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLORS[order.status] || "bg-secondary text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Hash className="w-3 h-3" />{order.items?.length || 0} items</span>
                    <span className="font-semibold text-foreground">₹{order.totalValue?.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => setViewOrder(order)} className="text-xs">View Details</Button>
                  <Button variant="outline" size="sm" onClick={() => navigate({ search: { tab: "tracking", orderId: order._id } })} className="text-xs">
                    <MapPin className="w-3 h-3" /> Track
                  </Button>
                  {cancellable(order.status) && (
                    <Button variant="outline" size="sm" onClick={() => setCancelId(order._id)} className="text-xs text-red-500 border-red-200 hover:bg-red-50">
                      <XCircle className="w-3 h-3" /> Cancel
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Detail Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 overflow-y-auto py-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border shadow-elegant p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-foreground">Order #{viewOrder.orderId}</h3>
                <p className="text-xs text-muted-foreground">{new Date(viewOrder.createdAt).toLocaleString("en-IN")}</p>
              </div>
              <button onClick={() => setViewOrder(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[viewOrder.status]}`}>{viewOrder.status}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><CreditCard className="w-3 h-3" />{viewOrder.paymentMode}</span>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead><tr className="bg-secondary"><th className="text-left p-2.5 font-semibold text-muted-foreground">Product</th><th className="text-right p-2.5 font-semibold text-muted-foreground">Qty</th><th className="text-right p-2.5 font-semibold text-muted-foreground">Rate</th><th className="text-right p-2.5 font-semibold text-muted-foreground">Amount</th></tr></thead>
                <tbody>
                  {viewOrder.items?.map((item: any, i: number) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-2.5 font-medium">{item.productId?.tradeName || "Product"}</td>
                      <td className="p-2.5 text-right">{item.qtyOrdered}</td>
                      <td className="p-2.5 text-right">₹{item.rate?.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-semibold">₹{item.lineTotal?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-border pt-3">
              <div className="text-right">
                <span className="text-xs text-muted-foreground">Total Amount</span>
                <p className="text-xl font-bold text-foreground">₹{viewOrder.totalValue?.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-2xl border border-border shadow-elegant p-6 max-w-sm w-full space-y-4">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600"><AlertCircle className="h-6 w-6" /></div>
              <h3 className="font-bold text-lg text-foreground">Cancel Order?</h3>
              <p className="text-sm text-muted-foreground mt-1">This action cannot be undone. Inventory will be restocked.</p>
            </div>
            <textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="Reason for cancellation (optional)" className="w-full h-20 rounded-lg bg-secondary border border-border px-3 py-2 text-sm text-foreground resize-none focus:border-primary outline-none" />
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setCancelId(null); setCancelReason(""); }}>Keep Order</Button>
              <Button variant="hero" className="flex-1 bg-red-600 hover:bg-red-700" disabled={cancelLoading} onClick={handleCancel}>
                {cancelLoading ? "Cancelling..." : "Cancel Order"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRACKING SECTION
   ═══════════════════════════════════════════════════════════════════════ */
function TrackingSection({ orderId, navigate }: { orderId?: string; navigate: any }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState<any>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data.orders || []);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orderId) {
      fetchTracking(orderId);
    }
  }, [orderId]);

  // Listen for real-time updates
  useEffect(() => {
    const handler = (e: any) => {
      if (orderId) fetchTracking(orderId);
    };
    window.addEventListener("order-updated", handler);
    return () => window.removeEventListener("order-updated", handler);
  }, [orderId]);

  const fetchTracking = async (id: string) => {
    try {
      const res = await api.get(`/orders/${id}/track`);
      setTrackingData(res.data);
      setSelectedOrder(res.data);
    } catch (err) { console.error(err); }
  };

  const currentStepIndex = selectedOrder
    ? TRACKING_STEPS.indexOf(selectedOrder.status === "Cancelled" ? "Pending" : selectedOrder.status)
    : -1;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-foreground">Order Tracking</h3>

      {/* Order selector */}
      {!orderId && (
        <div className="rounded-2xl border border-border/50 bg-card p-4 shadow-sm">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Select an order to track</label>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").map((order) => (
                <button
                  key={order._id}
                  onClick={() => navigate({ search: { tab: "tracking", orderId: order._id } })}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-primary/5 transition-smooth text-sm"
                >
                  <span className="font-semibold text-foreground">{order.orderId}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                </button>
              ))}
              {orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No active orders to track</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tracking Timeline */}
      {selectedOrder && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-bold text-foreground">Order #{selectedOrder.orderId}</h4>
                <p className="text-xs text-muted-foreground">Placed on {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[selectedOrder.status]}`}>{selectedOrder.status}</span>
            </div>

            {selectedOrder.status === "Cancelled" ? (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="font-semibold text-red-700">Order Cancelled</p>
                {selectedOrder.cancelReason && <p className="text-sm text-red-600 mt-1">{selectedOrder.cancelReason}</p>}
                {selectedOrder.cancelledAt && <p className="text-xs text-red-500 mt-1">{new Date(selectedOrder.cancelledAt).toLocaleString("en-IN")}</p>}
              </div>
            ) : (
              /* Stepper */
              <div className="relative">
                <div className="flex items-center justify-between">
                  {TRACKING_STEPS.map((step, i) => {
                    const isCompleted = i <= currentStepIndex;
                    const isCurrent = i === currentStepIndex;
                    return (
                      <div key={step} className="flex flex-col items-center relative z-10 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-muted-foreground border-2 border-border"
                        } ${isCurrent ? "ring-4 ring-primary/20 animate-pulse" : ""}`}>
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={`mt-2 text-[10px] font-semibold text-center leading-tight ${isCompleted ? "text-primary" : "text-muted-foreground"}`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress bar */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-0 mx-8">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.max(0, (currentStepIndex / (TRACKING_STEPS.length - 1)) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tracking Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase text-muted-foreground">Expected Delivery</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {selectedOrder.tracking?.estimatedDelivery
                  ? new Date(selectedOrder.tracking.estimatedDelivery).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
                  : "To be determined"}
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase text-muted-foreground">Last Updated</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {selectedOrder.statusHistory?.length > 0
                  ? new Date(selectedOrder.statusHistory[selectedOrder.statusHistory.length - 1].timestamp).toLocaleString("en-IN")
                  : new Date(selectedOrder.updatedAt || selectedOrder.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase text-muted-foreground">Courier / Fleet</span>
              </div>
              <p className="text-sm font-medium text-foreground">{selectedOrder.tracking?.carrier || "Aadya Express Logistics"}</p>
              {selectedOrder.tracking?.driverName && <p className="text-xs text-muted-foreground mt-0.5">Driver: {selectedOrder.tracking.driverName}</p>}
              {selectedOrder.tracking?.vehicle && <p className="text-xs text-muted-foreground">Vehicle: {selectedOrder.tracking.vehicle}</p>}
              {selectedOrder.tracking?.driverPhone && <p className="text-xs text-muted-foreground">Phone: {selectedOrder.tracking.driverPhone}</p>}
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase text-muted-foreground">Delivery Address</span>
              </div>
              <p className="text-sm font-medium text-foreground">
                {selectedOrder.retailerId?.name}, {selectedOrder.retailerId?.city || "N/A"}
              </p>
            </div>
          </div>

          {/* Status History */}
          {selectedOrder.statusHistory?.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
              <h4 className="font-semibold text-foreground mb-4">Status History</h4>
              <div className="space-y-3">
                {[...selectedOrder.statusHistory].reverse().map((event: any, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.status}</p>
                      <p className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString("en-IN")}</p>
                      {event.comment && <p className="text-xs text-muted-foreground mt-0.5 italic">{event.comment}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button variant="outline" size="sm" onClick={() => navigate({ search: { tab: "tracking" } })}>
            ← Track Another Order
          </Button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECURITY SECTION
   ═══════════════════════════════════════════════════════════════════════ */
function SecuritySection({ user }: { user: any }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const isGoogleOnly = user.authProvider === "google";
  const hasBothAuth = user.authProvider === "both";

  const handleChangePassword = async () => {
    if (!newPassword) { toast.error("New password is required"); return; }
    if (newPassword !== confirmPassword) { toast.error("Passwords do not match"); return; }
    if (!isGoogleOnly && !currentPassword) { toast.error("Current password is required"); return; }

    setLoading(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: isGoogleOnly ? undefined : currentPassword,
        newPassword,
      });
      toast.success(isGoogleOnly ? "Password set successfully!" : "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-foreground">Security & Password</h3>

      {/* Auth Provider Status */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
        <h4 className="font-semibold text-foreground mb-4">Authentication Methods</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.authProvider !== "google" ? "bg-emerald-100 text-emerald-600" : "bg-secondary text-muted-foreground border border-border"}`}>
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email & Password</p>
                <p className="text-xs text-muted-foreground">Sign in with your email and password</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${user.authProvider !== "google" ? "bg-emerald-100 text-emerald-700" : "bg-secondary text-muted-foreground"}`}>
              {user.authProvider !== "google" ? "Active" : "Not Set"}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${user.authProvider !== "local" ? "bg-blue-100 text-blue-600" : "bg-secondary text-muted-foreground border border-border"}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Google Account</p>
                <p className="text-xs text-muted-foreground">Sign in with your Google account</p>
              </div>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${user.authProvider !== "local" ? "bg-blue-100 text-blue-700" : "bg-secondary text-muted-foreground"}`}>
              {user.authProvider !== "local" ? "Linked" : "Not Linked"}
            </span>
          </div>
        </div>
      </div>

      {/* Change / Set Password */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
        <h4 className="font-semibold text-foreground">
          {isGoogleOnly ? "Set a Password" : "Change Password"}
        </h4>
        <p className="text-xs text-muted-foreground">
          {isGoogleOnly
            ? "Set a local password to enable email + password sign-in alongside Google."
            : "Update your current password for enhanced security."}
        </p>

        {!isGoogleOnly && (
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none text-sm text-foreground" />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none text-sm text-foreground" />
            <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 h-10 rounded-lg bg-secondary border border-border focus:border-primary outline-none text-sm text-foreground" />
          </div>
        </div>

        <Button variant="hero" size="sm" disabled={loading} onClick={handleChangePassword}>
          <ShieldCheck className="w-4 h-4" /> {loading ? "Saving..." : isGoogleOnly ? "Set Password" : "Update Password"}
        </Button>
      </div>
    </div>
  );
}
