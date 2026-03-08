"use client";
import { useAuth } from "@/src/app/contexts/AuthContext";

export interface Customer {
  email: string;
  firstname: string;
}

// This hook now just wraps useAuth for backwards compatibility
export function useCurrentUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}
