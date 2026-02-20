import { DetailedQrComp } from "@/components/user/dashboard/Qr-code/DetailedQrComp";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { qrAnalyticsAction } from "@/server/users/users.analytics";
import { getQrByShortCode } from "@/server/users/users.query";
import { redirect } from "next/navigation";

const DetailedQRage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;

  const qrData = await getQrByShortCode(shortCode);

  if (!qrData) {
    redirect("/");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const analyticsData = await qrAnalyticsAction(shortCode);

  // console.log(analyticsData);

  return (
    <DetailedQrComp
      initialData={qrData}
      activityData={analyticsData}
      userPlan={user.plan}
    />
  );
};

export default DetailedQRage;
