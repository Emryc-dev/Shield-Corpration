import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { AdminOverview } from '@/src/store/api/admin';

export function ChannelBreakdownChart({ data }: { data: AdminOverview['categoryBreakdown'] }) {
  return (
    <Card className='min-w-0 md:col-span-2'>
      <CardHeader><CardTitle><h2>Répartition du catalogue</h2></CardTitle><CardDescription>Nombre de produits par catégorie</CardDescription></CardHeader>
      <CardContent>{data.length ? <><ChartContainer config={{ count: { label: 'Produits', color: 'var(--primary)' } }} className='h-[260px] w-full'><BarChart accessibilityLayer data={data} margin={{ left: -20, right: 8 }}><CartesianGrid vertical={false} /><XAxis dataKey='name' tickLine={false} axisLine={false} tickFormatter={(value: string) => value.length > 12 ? `${value.slice(0, 11)}…` : value} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} /><ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey='count' fill='var(--color-count)' radius={[5, 5, 0, 0]} isAnimationActive={false} /></BarChart></ChartContainer><ul className='sr-only'>{data.map((item) => <li key={item.name}>{item.name} : {item.count} produits</li>)}</ul></> : <p className='flex min-h-[260px] items-center justify-center text-sm text-muted-foreground'>Les catégories seront affichées avec le catalogue.</p>}</CardContent>
    </Card>
  );
}
