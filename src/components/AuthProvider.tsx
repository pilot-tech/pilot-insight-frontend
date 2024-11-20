"use client";

import React from "react";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <KindeProvider>{children}</KindeProvider>;
};