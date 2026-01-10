"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Mutations } from "@/src/app/utils/graphql/mutations";

export interface UseAuthenticateProps {}

export interface UseAuthenticateReturns {
  loginLoading: boolean;
  handleLogin: (event: any, methods: any) => any;
}

export const useAuthenticate = (): UseAuthenticateReturns => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [generateToken] = useMutation(Mutations.GENERATE_AUTH_TOKEN);

  const handleLogin = async (event: any, methods: any) => {
    try {
      event.preventDefault();
      setLoginLoading(true);
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "").trim();

      console.log("email", email, password);

      const { data } = await generateToken({
        variables: {
          email,
          password,
        },
      });

      console.log("response", data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  return {
    loginLoading,
    handleLogin,
  };
};

