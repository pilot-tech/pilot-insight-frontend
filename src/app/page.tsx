import ChatInterface from "@/components/ChatInterface";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async  function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <div className="">
      <ChatInterface />
    </div>
  );
}
