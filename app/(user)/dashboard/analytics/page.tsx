"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", clicks: 400 },
  { name: "Tue", clicks: 300 },
  { name: "Wed", clicks: 200 },
  { name: "Thu", clicks: 278 },
  { name: "Fri", clicks: 189 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Analytics Overview</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,482</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Avg. Click Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Top Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">India 🇮🇳</div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Chart */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Clicks Over Time</CardTitle>
        </CardHeader>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
