import Dashboard from "@/components/user/dashboard/Dashboard";
import { getCurrentUser } from "@/server/auth/auth.queries";
import React from "react";

const DashboardPage = async () => {
  const user = await getCurrentUser();
  console.log(user);

  // You can also redirect here if no user exists
  if (!user) return null;

  return <Dashboard serverUser={user} />;
};

export default DashboardPage;
