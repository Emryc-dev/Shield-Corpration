import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import type { AdminSection } from '@/components/app-shared';

export function AppShell({ children, active, onNavigate }: { children: ReactNode; active: AdminSection; onNavigate: (path: string) => void }) {
  return (
    <TooltipProvider>
      <div className='font-sans'>
        <SidebarProvider className='relative min-h-svh'>
          <AppSidebar active={active} onNavigate={onNavigate} />
          <SidebarInset className='min-w-0 md:peer-data-[variant=inset]:ml-0'>
            <AppHeader active={active} onNavigate={onNavigate} />
            <div className='flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8'>{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}
