import { SubscriptionTable } from "@/components/user/subscription/SubscriptionTable";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

const SubscriptionPage = async () => {
  const user = await getCurrentUser();
  if (!user) return redirect("/");
  return (
    <>
      <SubscriptionTable userId={user.id} userEmail={user.email} />;
    </>
  );
};

export default SubscriptionPage;
