"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export default function SignUpClient() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center">
            <div className="bg-[#EB723B] p-3 rounded-full">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <LoginLink
              className="font-medium text-[#EB723B] hover:text-[#F4B091]"
              postLoginRedirectURL="/dashboard"
            >
              sign in to your account
            </LoginLink>
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-8 space-y-6">
            <RegisterLink postLoginRedirectURL="/">
              <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EB723B] hover:bg-[#F4B091] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-900">
                Sign up with Kinde
              </Button>
            </RegisterLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
