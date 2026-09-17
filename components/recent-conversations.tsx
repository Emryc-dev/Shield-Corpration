import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatMoney } from '@/src/store/utils/format';
import type { Order, OrderStatus } from '@/src/store/types';

const statuses: Record<OrderStatus, string> = { received: 'Commande reçue', payment_confirmed: 'Paiement confirmé', preparing: 'En préparation', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' };

export function RecentConversations({ orders, onNavigate }: { orders: Order[]; onNavigate: (path: string) => void }) {
  return (
    <Card className='min-w-0 md:col-span-2 xl:col-span-4'>
      <CardHeader><CardTitle><h2>Dernières commandes</h2></CardTitle><CardDescription>Suivez les commandes récentes et leur statut.</CardDescription></CardHeader>
      <CardContent>{orders.length ? <Table><TableHeader><TableRow><TableHead>Référence</TableHead><TableHead>Date</TableHead><TableHead>Statut</TableHead><TableHead className='text-right'>Total</TableHead></TableRow></TableHeader><TableBody>{orders.slice(0, 5).map((order) => <TableRow key={order.id}><TableCell className='font-medium'>{order.reference}</TableCell><TableCell>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</TableCell><TableCell><Badge variant={order.status === 'cancelled' ? 'destructive' : 'secondary'}>{statuses[order.status]}</Badge></TableCell><TableCell className='text-right'>{order.total ? formatMoney(order.total) : 'À confirmer'}</TableCell></TableRow>)}</TableBody></Table> : <div className='flex min-h-32 flex-col items-center justify-center gap-2 text-center'><p className='font-medium'>Aucune commande pour le moment</p><p className='max-w-md text-sm text-muted-foreground'>Les commandes enregistrées apparaîtront ici avec leur montant et leur statut.</p></div>}</CardContent>
      <CardFooter className='justify-end'><Button variant='ghost' onClick={() => onNavigate('/admin/store/orders')}>Voir les commandes<ArrowRight data-icon='inline-end' /></Button></CardFooter>
    </Card>
  );
}
