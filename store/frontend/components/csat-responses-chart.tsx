"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AdminOverview } from "@/src/store/api/admin";

const chartConfig = {
  paid: { label: "Payées", color: "var(--chart-1)" },
  pending: { label: "En attente", color: "var(--chart-3)" },
  cancelled: { label: "Annulées", color: "var(--chart-5)" },
} satisfies ChartConfig;

const shortDate = (value: string) => new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export function CsatResponsesChart({ data, className, ...props }: ComponentProps<typeof Card> & { data: AdminOverview["orderTrend"] }) {
  const [period, setPeriod] = useState("30");
  const rows = useMemo(() => data.slice(-Number(period)), [data, period]);
  return (
    <Card className={cn("min-w-0 shadow-none md:col-span-2 dark:ring-0", className)} {...props}>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1.5"><CardTitle>Activité des commandes</CardTitle><CardDescription>Commandes payées, en attente et annulées par jour.</CardDescription></div>
        <Select value={period} onValueChange={setPeriod}><SelectTrigger size="sm" className="w-full sm:w-36" aria-label="Période des commandes"><SelectValue /></SelectTrigger><SelectContent align="end"><SelectItem value="7">7 derniers jours</SelectItem><SelectItem value="30">30 derniers jours</SelectItem></SelectContent></Select>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[260px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={rows} margin={{ left: 0, right: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} minTickGap={24} tickFormatter={shortDate} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "var(--muted)", opacity: 0.45 }} />
            <Bar dataKey="paid" stackId="orders" fill="var(--color-paid)" radius={[0, 0, 3, 3]} />
            <Bar dataKey="pending" stackId="orders" fill="var(--color-pending)" />
            <Bar dataKey="cancelled" stackId="orders" fill="var(--color-cancelled)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
