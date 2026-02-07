import { EditComp } from "@/components/user/dashboard/links/EditComp";
import { getLinkDetails } from "@/server/users/users.query";

const EditPage = async ({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) => {
  const { shortCode } = await params;
  const linkDetails = await getLinkDetails(shortCode);
  return <EditComp links={linkDetails} />;
};

export default EditPage;
