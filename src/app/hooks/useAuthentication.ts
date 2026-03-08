"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/src/app/contexts/AuthContext";
import { useCart } from "@/src/app/contexts/CartContext";
import { useWishlist } from "@/src/app/contexts/WishlistContext";

export interface UseAuthenticateReturns {
  loginLoading: boolean;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<boolean>;
  handleRegister: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useAuthenticate = (): UseAuthenticateReturns => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { logout, setUser } = useAuth();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      // Update auth state immediately
      logout();
      refreshCart();
      refreshWishlist();
      toast.success("Излязохте успешно.");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    try {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "").trim();

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Fetch user data and update auth state
        const meResponse = await fetch("/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (meResponse.ok) {
          const userData = await meResponse.json();
          setUser(userData);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "").trim();
      const repass = String(formData.get("repass") ?? "").trim();
      const firstname = String(formData.get("name") ?? "").trim();
      const lastname = String(formData.get("lastname") ?? "").trim();
      const is_subscribed = Boolean(formData.get("is_subscribed"));

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          repass,
          firstname,
          lastname,
          is_subscribed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Registration failed:", data.error || "Unknown error");
        alert(data.error || "Registration failed");
        return;
      }

      alert("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loginLoading: loading,
    handleLogin,
    handleLogout,
    handleRegister
  };
};
