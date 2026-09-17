import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChannelBreakdownChart } from '@/components/channel-breakdown-chart';
import { RecentConversations } from '@/components/recent-conversations';
import { DashboardStats } from '@/components/stats';
import { formatAvailability, formatMoney } from '@/src/store/utils/format';
import type { AdminOverview } from '@/src/store/api/admin';

export function Dashboard({ overview, onNavigate }: { overview: AdminOverview; onNavigate: (path: string) => void }) {
  return (
    <div className='grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
      <DashboardStats overview={overview} />
      <ChannelBreakdownChart data={overview.categoryBreakdown} />
      <Card className='min-w-0 md:col-span-2'><CardHeader><CardTitle><h2>Produits mis en avant</h2></CardTitle><CardDescription>Une vue rapide de votre sélection.</CardDescription></CardHeader><CardContent className='flex flex-col gap-3'>{overview.popularProducts.length ? overview.popularProducts.map((product) => <button key={product.id} onClick={() => onNavigate(`/store/product/${product.slug}`)} className='flex items-center gap-3 rounded-lg p-2 text-left hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring'>{product.images[0] && <img src={product.images[0].url} alt='' loading='lazy' className='size-12 shrink-0 rounded-lg object-cover' />}<span className='min-w-0 flex-1'><span className='block truncate font-medium'>{product.name}</span><span className='block text-xs text-muted-foreground'>{formatAvailability(product.availability)}</span></span><span className='text-xs font-medium'>{formatMoney(product.price)}</span></button>) : <p className='py-12 text-center text-sm text-muted-foreground'>Aucun produit mis en avant.</p>}<Button variant='outline' className='mt-2 w-fit' onClick={() => onNavigate('/admin/store/products')}>Gérer le catalogue</Button></CardContent></Card>
      <RecentConversations orders={overview.recentOrders} onNavigate={onNavigate} />
    </div>
  );
}
