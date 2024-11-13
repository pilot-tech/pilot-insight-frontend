import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import SettingsPage from "@/components/SettingPage";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(
      "/api/auth/signin?callbackUrl=https://insightdocs.netlify.app/settings"
    );
  }

  return <SettingsPage session={session} />;
};

export default Page;
