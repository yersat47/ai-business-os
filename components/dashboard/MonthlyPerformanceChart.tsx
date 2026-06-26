"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import { COLORS, RADIUS } from "@/lib/design/tokens";
import { formatCompact, formatCurrency } from "@/lib/utils/formatters";
import type { MonthlyPerformancePoint } from "@/lib/mock/mock-monthly-performance";

type FilterKey = "all" | "year" | "week" | "today";

interface MonthlyPerformanceChartProps {
  data: MonthlyPerformancePoint[];
  title: string;
  primaryLabel: string;
  secondaryLabel: string;
}

interface TooltipPayloadItem {
  dataKey?: string;
  name?: string;
  value?: number;
  stroke?: string;
}

const CustomTooltip = memo(function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      style={{
        background: COLORS.bg.elevated,
        border: `1px solid ${COLORS.bg.border}`,
        borderRadius: 12,
        padding: "12px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        minWidth: 160,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: COLORS.text.tertiary,
          marginBottom: 8,
        }}
      >
        {label} 2026
      </div>
      {(payload as TooltipPayloadItem[]).map((p) => (
        <div
          key={p.dataKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            fontSize: 13,
            marginTop: 4,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: p.stroke,
              }}
            />
            <span style={{ color: COLORS.text.secondary }}>{p.name}</span>
          </span>
          <span style={{ color: COLORS.text.primary, fontWeight: 600 }}>
            {formatCurrency(p.value ?? 0)}
          </span>
        </div>
      ))}
    </motion.div>
  );
});

const FILTER_KEYS: FilterKey[] = ["all", "year", "week", "today"];

export function MonthlyPerformanceChart({
  data,
  title,
  primaryLabel,
  secondaryLabel,
}: MonthlyPerformanceChartProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filteredData =
    filter === "week"
      ? data.slice(-4)
      : filter === "today"
        ? data.slice(-1)
        : data;

  return (
    <div
      style={{
        background: COLORS.bg.card,
        borderRadius: RADIUS.lg,
        padding: 24,
        border: `1px solid ${COLORS.bg.borderSubtle}`,
      }}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3
          className="font-medium"
          style={{ fontSize: 16, color: COLORS.text.primary }}
        >
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-2" style={{ color: COLORS.text.secondary }}>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: COLORS.chart.primary }}
            />
            {primaryLabel}
          </span>
          <span className="flex items-center gap-2" style={{ color: COLORS.text.secondary }}>
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: COLORS.chart.secondary }}
            />
            {secondaryLabel}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTER_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
            style={{
              background:
                filter === key ? COLORS.accent.bronzeMuted : "transparent",
              color:
                filter === key ? COLORS.accent.bronze : COLORS.text.tertiary,
            }}
          >
            {key === "all"
              ? "All Time"
              : key === "year"
                ? "This Year"
                : key === "week"
                  ? "This Week"
                  : "Today"}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ height: 280 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COLORS.chart.primary} stopOpacity={0.35} />
                <stop offset="50%" stopColor={COLORS.chart.primary} stopOpacity={0.12} />
                <stop offset="100%" stopColor={COLORS.chart.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke={COLORS.chart.gridSubtle}
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text.tertiary, fontSize: 12 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: COLORS.text.tertiary, fontSize: 12 }}
              tickFormatter={(v) => formatCompact(v)}
              dx={-8}
              width={48}
            />
            <Tooltip
              cursor={{
                stroke: COLORS.text.tertiary,
                strokeDasharray: "4 4",
                strokeWidth: 1,
              }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="current"
              name={primaryLabel}
              stroke={COLORS.chart.primary}
              strokeWidth={2.5}
              fill="url(#gradientPrimary)"
              dot={false}
              isAnimationActive
              animationDuration={800}
              activeDot={{
                r: 6,
                fill: COLORS.bg.page,
                stroke: COLORS.chart.primary,
                strokeWidth: 3,
              }}
            />
            <Line
              type="monotone"
              dataKey="target"
              name={secondaryLabel}
              stroke={COLORS.chart.secondary}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive
              animationDuration={800}
              activeDot={{
                r: 6,
                fill: COLORS.bg.page,
                stroke: COLORS.chart.secondary,
                strokeWidth: 3,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
