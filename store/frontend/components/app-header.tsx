import { ExternalLink, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AppBreadcrumbs } from '@/components/app-breadcrumbs';
import { CustomSidebarTrigger } from '@/components/custom-sidebar-trigger';
import { storeNavigation, type AdminSection } from '@/components/app-shared';
import { logout } from '@/src/store/api/auth';

export function AppHeader({ active, onNavigate }: { active: AdminSection; onNavigate: (path: string) => void }) {
  const page = storeNavigation.find((item) => item.id === active);
  return (
    <header className='flex min-h-16 shrink-0 flex-wrap items-center justify-between gap-2 border-b px-4 md:px-6'>
      <div className='flex min-w-0 items-center gap-3'><CustomSidebarTrigger /><Separator orientation='vertical' className='h-4 data-[orientation=vertical]:self-center' /><AppBreadcrumbs page={page} /></div>
      <div className='flex items-center gap-2'><Button variant='outline' size='sm' onClick={() => onNavigate('/store')}><ExternalLink data-icon='inline-start' /><span className='hidden sm:inline'>Voir la boutique</span><span className='sm:hidden'>Store</span></Button><Button variant='ghost' size='sm' onClick={() => void logout().finally(() => onNavigate('/admin/login'))} aria-label='Se déconnecter'><LogOut className='size-4' /><span className='hidden md:inline'>Déconnexion</span></Button></div>
    </header>
  );
}
