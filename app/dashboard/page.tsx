import Dashboard from "@/components/user/dashboard/Dashboard";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { topLinkAction } from "@/server/users/users.analytics";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  // console.log(user);

  // You can also redirect here if no user exists
  if (!user) return null;

  const topLink = await topLinkAction(user.id);

  console.log(topLink);

  const dummyTopLinkData = {
    shortCode: "",
    clicks: 0,
  };

  const topLinkData = topLink === undefined ? dummyTopLinkData : topLink;

  return <Dashboard serverUser={user} topLinkData={topLinkData} />;
};

export default DashboardPage;
