import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  retailerId?: string; // Reference to the linked Retailer store
  authProvider?: "local" | "google" | "both";
  profilePhoto?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
  storeName?: string;
  city?: string;
};

type AuthContextValue = {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (partialUser: Partial<UserProfile>) => void;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedToken = window.localStorage.getItem(TOKEN_KEY);
      const storedUser = window.localStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as UserProfile);
      }
    } catch (e) {
      console.error("Error loading auth session:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newToken: string, newUser: UserProfile) => {
    setToken(newToken);
    setUser(newUser);
    window.localStorage.setItem(TOKEN_KEY, newToken);
    window.localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback((partialUser: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...partialUser };
      window.localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const refreshedUser: UserProfile = {
          id: data._id,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          retailerId: data.retailerId?._id || data.retailerId,
          authProvider: data.authProvider,
          profilePhoto: data.profilePhoto,
          phone: data.phone,
          address: data.address,
          createdAt: data.createdAt,
          storeName: data.retailerId?.name,
          city: data.retailerId?.city,
        };
        setUser(refreshedUser);
        window.localStorage.setItem(USER_KEY, JSON.stringify(refreshedUser));
      }
    } catch (e) {
      console.error("Error refreshing user:", e);
    }
  }, [token]);

  const isAuthenticated = useMemo(() => !!token, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
      updateUser,
      refreshUser,
    }),
    [token, user, isAuthenticated, login, logout, updateUser, refreshUser]
  );

  if (loading) {
    return null; // Don't render children until session is loaded
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
