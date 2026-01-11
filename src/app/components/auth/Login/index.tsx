"use client";
import { useAuthenticate } from "@/src/app/hooks/useAuthentication";

export default function Login() {
  const { handleLogin, handleLogout, loginLoading } = useAuthenticate();

  return (
    <div>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input type="email" name="email" placeholder="email" className="m-2" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="m-2"
        />
        {loginLoading ? (
          <p>Loading...</p>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
