import React from 'react';
import { Dashboard } from '@/components/dashboard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import AdminStoreLayout from './AdminStoreLayout';
import { getAdminOverview, type AdminOverview } from '../../api/admin';

export default function AdminStoreDashboardPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [overview, setOverview] = React.useState<AdminOverview | null>(null);
  const [error, setError] = React.useState(false);
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => {
    let cancelled = false;
    document.title = 'Administration du Store | The Shield Corporation';
    setError(false);
    getAdminOverview().then((data) => { if (!cancelled) setOverview(data); }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [reload]);
  return (
    <AdminStoreLayout active='dashboard' title='Vue d’ensemble' subtitle='Retrouvez votre catalogue, les stocks à surveiller et le suivi des commandes au même endroit.' onNavigate={onNavigate}>
      {error ? <div role='alert' className='flex flex-col items-start gap-3'><p>Impossible de charger le tableau de bord.</p><Button variant='outline' onClick={() => setReload((value) => value + 1)}>Réessayer</Button></div> : overview ? <>{overview.source === 'demo' && <p role='status' className='text-sm text-muted-foreground'>Aperçu du catalogue de démonstration. Les commandes et revenus seront disponibles après connexion du Store.</p>}<Dashboard overview={overview} onNavigate={onNavigate} /></> : <div aria-label='Chargement du tableau de bord' className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className='h-36 rounded-xl' />)}<Skeleton className='h-72 rounded-xl sm:col-span-2 xl:col-span-4' /></div>}
    </AdminStoreLayout>
  );
}
