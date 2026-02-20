import { Button } from "@/components/ui/button";
import {
  ActivityChart,
  CountryList,
  DeviceChart,
  ReferrerList,
} from "@/components/user/dashboard/analytics/ActivityCharts";
import { getCurrentUser } from "@/server/auth/auth.queries";
import { getUserAnalytics } from "@/server/users/users.analytics";
import { Card, Metric, Text, Flex } from "@tremor/react";
import { MousePointer2, Link2, Users2, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const DUMMY_DATA = {
  overview: { totalClicks: 1240, uniqueVisitors: 850, totalLinks: 12 },
  activity: [
    { date: "2024-01-01", clicks: 40 },
    { date: "2024-01-02", clicks: 30 },
    { date: "2024-01-03", clicks: 60 },
    { date: "2024-01-04", clicks: 80 },
    { date: "2024-01-05", clicks: 50 },
    { date: "2024-01-06", clicks: 90 },
    { date: "2024-01-07", clicks: 120 },
  ],
  devices: [
    { name: "Mobile", value: 60 },
    { name: "Desktop", value: 40 },
  ],
  countries: [
    { name: "United States", value: 500 },
    { name: "United Kingdom", value: 300 },
  ],
  referrers: [
    { name: "Twitter", value: 200 },
    { name: "Google", value: 150 },
  ],
};

export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) return redirect("/");

  const isPro = user.plan === "pro" || user.plan === "business";

  const realData = isPro ? await getUserAnalytics(user.id) : null;
  const data = isPro ? realData! : DUMMY_DATA;

  const cardStyles = "border-none ring-0 shadow-sm";

  return (
    <main className="p-8 font-sans space-y-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Global Analytics
          </h1>
          <p className="text-muted-foreground text-sm">
            Performance overview for all your shortlinks.
          </p>
        </div>

        <div
          className={`p-3 rounded-full text-xs font-bold uppercase tracking-wider w-fit ${
            isPro ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          Plan: {user.plan || "Free"}
        </div>
      </div>

      {!isPro && (
        <div className="relative overflow-hidden bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 p-[1px] rounded-xl shadow-lg transition-all hover:shadow-blue-200/50">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-5 rounded-[11px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-40 animate-pulse" />
                <div className="relative bg-linear-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-md">
                  <Sparkles className="size-6 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Unlock Premium Insights
                  </h3>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    Pro Feature
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xl">
                  You&apos;re currently viewing{" "}
                  <span className="font-semibold text-blue-600">
                    sample data
                  </span>
                  . Upgrade to see your actual traffic patterns, device
                  analytics, and global reach in real-time.
                </p>
              </div>
            </div>

            <Link href="/subscription" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                Go Pro Now
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Metric Cards - Switched to Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className={cardStyles}>
          <Flex
            justifyContent="start"
            alignItems="center"
            className="space-x-4"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <MousePointer2 className="text-blue-600 size-5" />
            </div>
            <div>
              <Text>Total Clicks</Text>
              <Metric>{data.overview?.totalClicks || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className={cardStyles}>
          <Flex
            justifyContent="start"
            alignItems="center"
            className="space-x-4"
          >
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Users2 className="text-emerald-600 size-5" />
            </div>
            <div>
              <Text>Unique Visitors</Text>
              <Metric>{data.overview?.uniqueVisitors || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className={cardStyles}>
          <Flex
            justifyContent="start"
            alignItems="center"
            className="space-x-4"
          >
            <div className="p-2 bg-violet-100 rounded-lg">
              <Link2 className="text-violet-600 size-5" />
            </div>
            <div>
              <Text>Active Links</Text>
              <Metric>{data.overview?.totalLinks || 0}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className={cardStyles}>
          <Flex
            justifyContent="start"
            alignItems="center"
            className="space-x-4"
          >
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
        <div className="lg:col-span-2">
          <ActivityChart data={data.activity} />
        </div>
        <DeviceChart data={data.devices} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CountryList data={data.countries} />
        <ReferrerList data={data.referrers} />
      </div>
    </main>
  );
}
