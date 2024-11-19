"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const access_token = searchParams.get("access_token");
    const refresh_token = searchParams.get("refresh_token");

    if (error) {
      console.error("Authentication error:", error);
      router.push("/signin");
      return;
    }

    if (access_token) {
      // Store tokens in cookies with secure settings
      document.cookie = `kinde_token=${access_token}; path=/; SameSite=Strict; Secure`;
      if (refresh_token) {
        document.cookie = `kinde_refresh_token=${refresh_token}; path=/; SameSite=Strict; Secure`;
      }
      router.push("/");
      return;
    }

    if (code) {
      handleCallback(code);
    }
  }, [searchParams, router]);

  const handleCallback = async (code: string) => {
    try {
      // Use URLSearchParams to properly encode the code
      const params = new URLSearchParams({ code });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/callback?${params.toString()}`,
        {
          redirect: 'follow', // This is important to follow the redirect from the backend
        }
      );

      // Handle redirect response
      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      // If no redirect (something went wrong), handle the error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // This part will likely not be reached due to redirect
      const data = await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error during callback:", error);
      router.push("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing your login...</p>
      </div>
    </div>
  );
}