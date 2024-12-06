import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  return <ChatInterface pageType="non-tech" />;
};

export default Page;
