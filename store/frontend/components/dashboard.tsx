import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChannelBreakdownChart } from '@/components/channel-breakdown-chart';
import { ConversationVolumeChart } from '@/components/conversation-volume-chart';
import { CsatResponsesChart } from '@/components/csat-responses-chart';
import { FirstReplyTimeChart } from '@/components/first-reply-time-chart';
import { RecentConversations } from '@/components/recent-conversations';
import { DashboardStats } from '@/components/stats';
import type { AdminOverview } from '@/src/store/api/admin';

export function Dashboard({ overview, onNavigate }: { overview: AdminOverview; onNavigate: (path: string) => void }) {
  return <div className='grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
    <DashboardStats overview={overview} />
    <ConversationVolumeChart data={overview.revenueTrend} />
    <CsatResponsesChart data={overview.orderTrend} />
    <FirstReplyTimeChart data={overview.customerTrend} />
    <ChannelBreakdownChart data={overview.categoryBreakdown} />
    <Card className='min-w-0 md:col-span-2'><CardHeader><CardTitle><h2>Produits les plus vendus</h2></CardTitle><CardDescription>Classement basé sur les commandes payées.</CardDescription></CardHeader><CardContent className='flex flex-col gap-2'>{overview.bestSellers.length ? overview.bestSellers.map((product, index) => <button key={product.id} onClick={() => onNavigate(`/store/product/${product.slug}`)} className='flex items-center gap-3 rounded-xl p-2 text-left hover:bg-muted'><span className='grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>{index + 1}</span>{product.images[0] && <img src={product.images[0].url} alt='' loading='lazy' className='size-11 rounded-lg object-cover' />}<span className='min-w-0 flex-1'><span className='block truncate font-medium'>{product.name}</span><span className='text-xs text-muted-foreground'>{product.orderCount} commande(s)</span></span><strong className='text-sm'>{product.unitsSold} vendu(s)</strong></button>) : <p className='py-10 text-center text-sm text-muted-foreground'>Les ventes apparaîtront ici après les premières commandes payées.</p>}<Button variant='outline' className='mt-2 w-fit' onClick={() => onNavigate('/admin/store/products')}>Gérer le catalogue</Button></CardContent></Card>
    <Card className='min-w-0 md:col-span-2'><CardHeader><CardTitle><h2>Meilleurs clients</h2></CardTitle><CardDescription>Valeur d'achat et récurrence des commandes.</CardDescription></CardHeader><CardContent className='flex flex-col gap-2'>{overview.bestCustomers.length ? overview.bestCustomers.map((customer, index) => <button key={customer.id} onClick={() => onNavigate('/admin/store/customers')} className='flex items-center gap-3 rounded-xl p-2 text-left hover:bg-muted'><span className='grid size-9 shrink-0 place-items-center rounded-full bg-cyan-50 text-xs font-bold text-cyan-800'>{index + 1}</span><span className='min-w-0 flex-1'><span className='block truncate font-medium'>{customer.firstName} {customer.lastName}</span><span className='block truncate text-xs text-muted-foreground'>{customer.email}</span></span><span className='text-right'><strong className='block text-sm'>{Number(customer.totalSpent).toLocaleString('fr-FR')} XAF</strong><span className='text-xs text-muted-foreground'>{customer.orderCount} achat(s)</span></span></button>) : <p className='py-10 text-center text-sm text-muted-foreground'>Les meilleurs clients apparaîtront après les premières ventes.</p>}<Button variant='outline' className='mt-2 w-fit' onClick={() => onNavigate('/admin/store/customers')}>Voir tous les clients</Button></CardContent></Card>
    <RecentConversations orders={overview.recentOrders} onNavigate={onNavigate} />
  </div>;
}
