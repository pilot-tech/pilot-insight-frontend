"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";

/* @ts-ignore */
export const AuthProvider = ({children}) => {
  /* @ts-ignore */
  return <KindeProvider>{children}</KindeProvider>;
};