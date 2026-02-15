import {
  ActivityChart,
  CountryList,
  DeviceChart,
  ReferrerList,
} from "@/components/user/dashboard/analytics/ActivityCharts";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { getUserAnalytics } from "@/server/users/users.analytics";
import { Card, Metric, Text, Flex, Grid } from "@tremor/react";
import { MousePointer2, Link2, Users2, Globe } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  // Replace with your actual auth/session logic
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const data = await getUserAnalytics(user.id);
  // console.log(data);

  // console.log(data);

  return (
    <main className="p-8 space-y-8 bg-slate-50 min-h-screen ">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Global Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Performance overview for all your shortlinks.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="gap-6 flex">
        <Card decoration="top" decorationColor="blue">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MousePointer2 className="text-blue-600 size-5" />
            </div>
            <div>
              <Text>Total Clicks</Text>
              <Metric>{data.overview?.totalClicks || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card decoration="top" decorationColor="emerald">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users2 className="text-emerald-600 size-5" />
            </div>
            <div>
              <Text>Unique Visitors</Text>
              <Metric>{data.overview?.uniqueVisitors || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card decoration="top" decorationColor="violet">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-violet-100 rounded-lg">
              <Link2 className="text-violet-600 size-5" />
            </div>
            <div>
              <Text>Active Links</Text>
              <Metric>{data.overview?.totalLinks || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card decoration="top" decorationColor="amber">
          <Flex justifyContent="start" className="space-x-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Globe className="text-amber-600 size-5" />
            </div>
            <div>
              <Text>Top Region</Text>
              <Metric className="truncate">
                {data.countries[0]?.name || "N/A"}
              </Metric>
            </div>
          </Flex>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityChart data={data.activity} />
        <DeviceChart data={data.devices} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CountryList data={data.countries} />

        <ReferrerList data={data.referrers} />
      </div>
    </main>
  );
}
