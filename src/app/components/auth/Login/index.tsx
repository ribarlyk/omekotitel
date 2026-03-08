"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthenticate } from "@/src/app/hooks/useAuthentication";

interface Props {
  onSuccess?: () => void;
}

export default function Login({ onSuccess }: Props) {
  const router = useRouter();
  const { handleLogin, loginLoading } = useAuthenticate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const onSubmit: React.ComponentProps<"form">["onSubmit"] = async (e) => {
    const success = await handleLogin(e);
    if (success) {
      toast.success("Влязохте успешно!");
      onSuccess?.();
      router.push("/profil");
    } else {
      toast.error("Грешен имейл или парола.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Имейл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-nav"
        />
        <span className="absolute top-3 right-3 text-red-500 text-xs">*</span>
      </div>

      <div className="relative">
        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-brand-nav"
        />
        <span className="absolute top-3 right-3 text-red-500 text-xs">*</span>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
        <input type="checkbox" name="remember" className="w-4 h-4 accent-brand-action" />
        Запомни ме
      </label>

      <button
        type="submit"
        disabled={!canSubmit || loginLoading}
        className={`w-full py-3 rounded text-sm font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${
          canSubmit && !loginLoading
            ? "bg-brand-action text-white hover:opacity-90 cursor-pointer"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loginLoading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Зареждане...
          </>
        ) : (
          "Влезте с профила си"
        )}
      </button>

      <div className="flex justify-between text-xs font-semibold mt-2">
        <a href="/forgot-password" className="text-brand-action hover:underline uppercase">
          Забравена парола?
        </a>
        <a href="/register" className="text-brand-action hover:underline uppercase">
          Създай нов профил
        </a>
      </div>
    </form>
  );
}
