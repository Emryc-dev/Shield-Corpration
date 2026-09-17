import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { storeNavigation, type AdminSection } from '@/components/app-shared';

export function AppSidebar({ active, onNavigate }: { active: AdminSection; onNavigate: (path: string) => void }) {
  const { setOpenMobile } = useSidebar();
  const navigate = (path: string) => { setOpenMobile(false); onNavigate(path); };
  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader className='h-16 justify-center'>
        <SidebarMenu><SidebarMenuItem><SidebarMenuButton size='lg' tooltip='The Shield Store' onClick={() => navigate('/admin/store')}><ShieldCheck /><span className='flex flex-col gap-0.5'><span className='font-semibold'>The Shield Store</span><span className='text-xs text-muted-foreground'>Administration</span></span></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup><SidebarGroupLabel>Gérer la boutique</SidebarGroupLabel><SidebarMenu>{storeNavigation.map((item) => <SidebarMenuItem key={item.id}><SidebarMenuButton isActive={active === item.id} tooltip={item.title} onClick={() => navigate(item.path)} aria-current={active === item.id ? 'page' : undefined}>{item.icon}<span>{item.title}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup>
      </SidebarContent>
      <SidebarFooter><SidebarMenu><SidebarMenuItem><SidebarMenuButton tooltip='Voir le Store' onClick={() => navigate('/store')}><ExternalLink /><span>Voir le Store</span></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton tooltip='Retour au site' onClick={() => navigate('/')}><ArrowLeft /><span>Retour au site</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarFooter>
    </Sidebar>
  );
}
