"use client";
import { useAuthenticate } from "@/src/app/hooks/useAuthentication";

export default function Login() {
  const { handleLogin, loginLoading } = useAuthenticate();

  return (
    <div>
      {loginLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="m-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="m-2"
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
