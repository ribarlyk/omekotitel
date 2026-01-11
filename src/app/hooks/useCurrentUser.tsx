"use client";
import { useEffect, useState } from "react";

export interface Customer {
  email: string;
  firstname: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!mounted) return;
        if (res.ok) {
          const data = await res.json();
          setUser(data as Customer);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("useCurrentUser error:", err);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
