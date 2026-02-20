"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { ProfileSettingComp } from "./ProfileSettingComp";
import { SecuritySettingComp } from "./SecuritySettingComp";
import { ManageSubscriptionComp } from "./ManageSubscriptionComp";

type UserData = {
  id: number;
  name: string;
  email: string;
  password: string | null;
  linksCreated: number;
  stripeCustomerId: string | null;
  plan: "free" | "pro" | "business" | null;
  planExpiresAt: Date | null;
  qrsCreated: number;
  createdAt: Date;
  updatedAt: Date;
};

export const SettingsComp = ({ user }: { user: UserData }) => {
  const [mode, setMode] = useState("profile");
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Manage your account preferences, security settings, and API access.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl mb-4">
          <TabsTrigger
            value="profile"
            className="flex gap-2 px-6 rounded-lg data-[state=active]:shadow-sm"
            onClick={() => setMode("profile")}
          >
            <User size={16} /> Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex gap-2 px-6 rounded-lg data-[state=active]:shadow-sm"
            onClick={() => setMode("security")}
          >
            <ShieldCheck size={16} /> Security
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="flex gap-2 px-6 rounded-lg data-[state=active]:shadow-sm"
            onClick={() => setMode("subscription")}
          >
            <ShieldCheck size={16} /> Manage Subscription
          </TabsTrigger>
        </TabsList>

        {mode === "profile" ? (
          <ProfileSettingComp user={user} />
        ) : mode === "security" ? (
          <SecuritySettingComp userId={user.id} password={user.password} />
        ) : (
          <ManageSubscriptionComp user={user} />
        )}
      </Tabs>
    </div>
  );
};
