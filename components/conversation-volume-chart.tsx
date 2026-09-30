"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useId, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AdminOverview } from "@/src/store/api/admin";

const chartConfig = {
  gross: { label: "Chiffre d'affaires", color: "var(--chart-2)" },
  net: { label: "Revenu net", color: "var(--chart-1)" },
} satisfies ChartConfig;

const shortDate = (value: string) => new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
const compactMoney = (value: number) => new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export function ConversationVolumeChart({ data, className, ...props }: ComponentProps<typeof Card> & { data: AdminOverview["revenueTrend"] }) {
  const [period, setPeriod] = useState("30");
  const rows = useMemo(() => data.slice(-Number(period)), [data, period]);
  const uid = useId().replace(/:/g, "");

  return (
    <Card className={cn("min-w-0 shadow-none md:col-span-2 dark:ring-0", className)} {...props}>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle>Évolution du chiffre d’affaires</CardTitle>
          <CardDescription>Montants bruts et revenus nets issus des commandes payées.</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger size="sm" className="w-full sm:w-36" aria-label="Période du chiffre d’affaires"><SelectValue /></SelectTrigger>
          <SelectContent align="end"><SelectItem value="7">7 derniers jours</SelectItem><SelectItem value="30">30 derniers jours</SelectItem></SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[260px] w-full" config={chartConfig}>
          <AreaChart accessibilityLayer data={rows} margin={{ left: 2, right: 8, top: 8 }}>
            <defs>
              <linearGradient id={`gross-${uid}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-gross)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--color-gross)" stopOpacity={0} /></linearGradient>
              <linearGradient id={`net-${uid}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-net)" stopOpacity={0.25} /><stop offset="100%" stopColor="var(--color-net)" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} minTickGap={24} tickFormatter={shortDate} />
            <YAxis axisLine={false} tickLine={false} width={46} tickFormatter={compactMoney} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area dataKey="gross" type="natural" stroke="var(--color-gross)" strokeWidth={2} fill={`url(#gross-${uid})`} />
            <Area dataKey="net" type="natural" stroke="var(--color-net)" strokeWidth={2} fill={`url(#net-${uid})`} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
