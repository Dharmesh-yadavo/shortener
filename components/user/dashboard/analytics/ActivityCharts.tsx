// components/analytics/Charts.tsx
"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExternalLink, Globe } from "lucide-react";

// --- Configuration ---
const chartConfig = {
  clicks: { label: "Clicks", color: "var(--chart-1)" },
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-3)" },
  value: { label: "Clicks", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface ActivityDataType {
  date: unknown;
  clicks: number;
}

export function ActivityChart({ data }: { data: ActivityDataType[] }) {
  return (
    <Card className="lg:col-span-2 font-sans">
      <CardHeader>
        <CardTitle>Click Activity</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // Show MM-DD
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="clicks"
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface DeviceDataType {
  name: string | null;
  value: number;
}

export function DeviceChart({ data }: { data: DeviceDataType[] }) {
  const totalClicks = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: `var(--chart-${(index % 5) + 1})`,
  }));

  return (
    <Card className="flex flex-col font-sans">
      <CardHeader className="items-center pb-0">
        <CardTitle>Device Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-70"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan x={viewBox.cx} y={viewBox.cy}>
                          {totalClicks}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24}>
                          Total Clicks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface CountryDataType {
  name: string | null;
  value: number;
}

export function CountryList({ data }: { data: CountryDataType[] }) {
  return (
    <Card className="flex flex-col border-none shadow-md font-sans bg-white dark:bg-slate-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="size-5 text-blue-600" />
          <CardTitle className="text-lg">Top Countries</CardTitle>
        </div>
        <CardDescription>Geographic distribution of clicks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium flex items-center gap-2">
                  <span className="uppercase text-xs font-bold text-slate-400">
                    {item.name === "Unknown" ? "🏳️" : "📍"}
                  </span>
                  {item.name}
                </span>
                <span className="text-blue-600 font-bold">
                  {item.value.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 text-sm italic">
            No geographic data available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ReferrerDataType {
  name: string | null;
  value: number;
}

export function ReferrerList({ data }: { data: ReferrerDataType[] }) {
  const maxClicks = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className="font-sans lg:col-span-2 border-none shadow-md bg-white dark:bg-slate-950">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ExternalLink className="size-5 text-blue-600" />
          <CardTitle className="text-lg">Traffic Sources</CardTitle>
        </div>
        <CardDescription>Where your audience is coming from</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        {data.map((item, index) => (
          <div key={index} className="group relative">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-semibold truncate max-w-50 text-slate-700 dark:text-slate-200">
                {item.name === "Direct" ? "Direct / None" : item.name}
              </span>
              <span className="text-xs text-blue-500 font-mono">
                {item.value} clicks
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-1000 group-hover:bg-blue-400"
                style={{ width: `${(item.value / maxClicks) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
