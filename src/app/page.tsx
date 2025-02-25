"use client";

import ChatInterface from "@/components/ChatInterface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getKindeSession = async () => {
      try {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();
        setIsUserAuthenticated(data.authenticated);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getKindeSession();
  }, []);

  useEffect(() => {
    if (isUserAuthenticated === false) {
      router.push("/sign-in");
    }
  }, [isUserAuthenticated, router]);

  if (isUserAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <ChatInterface pageType="tech" />
    </div>
  );
}
