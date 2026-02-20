import { CreateQrComp } from "@/components/user/dashboard/Qr-code/CreateQrComp";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

const CreateQrPage = async () => {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  return <CreateQrComp plan={user.plan} qrsCreated={user.qrsCreated} />;
};

export default CreateQrPage;
