import { DetailedlinkComp } from "@/components/user/dashboard/links/DetailedLinkComp";
import { getLinkDetails } from "@/server/users/users.query";

const LinksDetailPage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;
  const linkDetails = await getLinkDetails(shortCode);
  // console.log(linkDetails);

  return <DetailedlinkComp links={linkDetails} />;
};

export default LinksDetailPage;
