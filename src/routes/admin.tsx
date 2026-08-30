import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminRedirect,
});

function AdminRedirect() {
  useEffect(() => {
    const adminBase = import.meta.env.VITE_ADMIN_URL || "http://localhost:5173/admin/";
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("auth_user");
    let target = adminBase;
    if (token && user) {
      const sep = target.includes("?") ? "&" : "?";
      target = `${target}${sep}token=${encodeURIComponent(token)}&user=${encodeURIComponent(user)}`;
    }
    window.location.href = target;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center p-8 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl max-w-sm mx-4">
        <div className="animate-spin w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
        <h2 className="text-lg font-bold text-white">Redirecting to Admin Portal...</h2>
        <p className="text-xs text-slate-400 mt-2">Connecting securely to Aadya Medicine Agencies Admin Dashboard.</p>
      </div>
    </div>
  );
}
