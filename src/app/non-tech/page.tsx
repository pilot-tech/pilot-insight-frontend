"use client";

import { useRouter } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { useEffect, useState } from "react";

const Page = async () => {
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
  return <ChatInterface pageType="non-tech" />;
};

export default Page;
