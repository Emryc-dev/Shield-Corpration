import { Boxes, ClipboardList, PackageSearch, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AdminOverview } from '@/src/store/api/admin';

export function DashboardStats({ overview }: { overview: AdminOverview }) {
  const stats = [
    { label: 'Produits au catalogue', value: overview.productsCount, note: 'Produits disponibles dans le catalogue', icon: Boxes },
    { label: 'Commandes', value: overview.ordersCount, note: 'Commandes enregistrées', icon: ClipboardList },
    { label: 'Stocks limités', value: overview.lowStockCount, note: 'Produits à surveiller', icon: PackageSearch },
    { label: 'Revenus', value: overview.revenueLabel, note: 'Montant fourni par le Store', icon: Wallet },
  ];
  return <>{stats.map(({ label, value, note, icon: Icon }) => <Card key={label}><CardHeader><CardTitle><h2 className='flex items-center justify-between gap-2 text-sm'>{label}<Icon aria-hidden='true' className='size-4 text-muted-foreground' /></h2></CardTitle><CardDescription>{note}</CardDescription></CardHeader><CardContent><p className='text-2xl font-semibold tabular-nums'>{value}</p></CardContent></Card>)}</>;
}
