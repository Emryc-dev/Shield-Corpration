"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { AdminOverview } from "@/src/store/api/admin";

const chartConfig = { customers: { label: "Nouveaux clients", color: "var(--chart-2)" } } satisfies ChartConfig;
const shortDate = (value: string) => new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

export function FirstReplyTimeChart({ data, className, ...props }: ComponentProps<typeof Card> & { data: AdminOverview["customerTrend"] }) {
  return (
    <Card className={cn("min-w-0 shadow-none md:col-span-2 dark:ring-0", className)} {...props}>
      <CardHeader><CardTitle>Nouveaux clients</CardTitle><CardDescription>Comptes clients créés au cours des 30 derniers jours.</CardDescription></CardHeader>
      <CardContent>
        <ChartContainer className="h-[260px] w-full" config={chartConfig}>
          <LineChart accessibilityLayer data={data} margin={{ left: 0, right: 10, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={8} minTickGap={24} tickFormatter={shortDate} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
            <Line dataKey="customers" type="natural" stroke="var(--color-customers)" strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
