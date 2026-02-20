import { DetailedlinkComp } from "@/components/user/dashboard/links/DetailedLinkComp";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { linkAnalyticsAction } from "@/server/users/users.analytics";
import { getLinkDetails } from "@/server/users/users.query";
import { redirect } from "next/navigation";

const LinksDetailPage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;
  const linkDetails = await getLinkDetails(shortCode);
  // console.log(linkDetails);

  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }

  const linkAnalyticData = await linkAnalyticsAction(shortCode);

  console.log(linkAnalyticData);

  return (
    <DetailedlinkComp
      links={linkDetails}
      activityData={linkAnalyticData}
      userPlan={user.plan}
    />
  );
};

export default LinksDetailPage;
