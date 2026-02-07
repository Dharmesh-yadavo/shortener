import { SettingsComp } from "@/components/user/dashboard/setting/SettingComp";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { redirect } from "next/navigation";

const SettingPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <SettingsComp user={user} />;
};

export default SettingPage;
