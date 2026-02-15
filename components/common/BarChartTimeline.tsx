"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  other: { label: "Other", color: "var(--chart-3)" },
  value: { label: "Clicks", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface AnalyticsData {
  date: unknown;
  desktop: number;
  mobile: number;
  other: number;
}

export const BarChartTimeline = ({
  data,
  isPro,
}: {
  data: AnalyticsData[];
  isPro: string | null;
}) => {
  const DUMMY_DATA = [
    { date: "2026-02-06", desktop: 24, mobile: 30, other: 4 },
    { date: "2026-02-07", desktop: 15, mobile: 50, other: 8 },
    { date: "2026-02-08", desktop: 11, mobile: 58, other: 5 },
    { date: "2026-02-09", desktop: 45, mobile: 22, other: 2 },
    { date: "2026-02-10", desktop: 40, mobile: 19, other: 3 },
    { date: "2026-02-11", desktop: 36, mobile: 21, other: 6 },
    { date: "2026-02-12", desktop: 32, mobile: 23, other: 4 },
    { date: "2026-02-13", desktop: 28, mobile: 35, other: 7 },
    { date: "2026-02-14", desktop: 14, mobile: 65, other: 12 },
    { date: "2026-02-15", desktop: 10, mobile: 60, other: 9 },
  ];

  const userPlan = isPro === "pro" || isPro === "business";

  const realData = userPlan ? data : null;

  const finalData = userPlan ? realData! : DUMMY_DATA;

  return (
    <ChartContainer config={chartConfig} className="max-h-100 w-full">
      <BarChart accessibilityLayer data={finalData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(5)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <Bar dataKey="other" fill="var(--color-other)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
