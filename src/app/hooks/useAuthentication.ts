"use client";
import { FormEvent, useState } from "react";

export interface UseAuthenticateReturns {
  loginLoading: boolean;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const useAuthenticate = (): UseAuthenticateReturns => {
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "").trim();

      await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginLoading: loading,
    handleLogin,
    handleLogout,
  };
};
