"use client";

import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MOCK_HEALTH_TREND } from "@/lib/mock/mock-health";

const monthKeys = ["jan", "feb", "mar", "apr", "may", "jun"] as const;

export function HealthTrendChart() {
  const t = useTranslations("mock.months");
  const data = MOCK_HEALTH_TREND.map((score, i) => ({
    month: t(monthKeys[i]),
    score,
  }));

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#4A5568"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            domain={[60, 80]}
            stroke="#4A5568"
            fontSize={12}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#151B28",
              border: "1px solid #1E2535",
              borderRadius: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#C9923A"
            strokeWidth={2}
            dot={{ fill: "#C9923A", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
