import { CreateLinkComp } from "@/components/user/dashboard/links/CreateLinkComp";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { redirect } from "next/navigation";

const CreateLinkPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");
  return (
    <CreateLinkComp
      userId={user.id}
      plan={user.plan}
      linksCreated={user.linksCreated}
    />
  );
};

export default CreateLinkPage;
