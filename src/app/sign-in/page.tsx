"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function SignInClient() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <div className="bg-[#EB723B] p-3 rounded-full">
              <Lock className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <RegisterLink
              className="font-medium text-[#EB723B] hover:text-[#F4B091]"
              postLoginRedirectURL="/"
            >
              create a new account
            </RegisterLink>
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-8 space-y-6">
            <LoginLink postLoginRedirectURL="/">
              <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EB723B] hover:bg-[#F4B091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-900">
                Sign in with Kinde
              </Button>
            </LoginLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
