import type { ReactNode } from 'react';
import { AppShell } from '@/components/app-shell';
import type { AdminSection } from '@/components/app-shared';

interface AdminStoreLayoutProps {
  active: AdminSection;
  title: string;
  subtitle: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

export default function AdminStoreLayout({ active, title, subtitle, onNavigate, children }: AdminStoreLayoutProps) {
  return (
    <AppShell active={active} onNavigate={onNavigate}>
      <header className='flex flex-col gap-2'><p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>The Shield Corporation Store</p><h1 className='font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl'>{title}</h1><p className='max-w-3xl text-sm leading-relaxed text-muted-foreground'>{subtitle}</p></header>
      {children}
    </AppShell>
  );
}
