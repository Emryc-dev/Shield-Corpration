import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CustomSidebarTrigger() {
  return <Tooltip><TooltipTrigger asChild><SidebarTrigger aria-label='Ouvrir ou replier le menu' /></TooltipTrigger><TooltipContent>Ouvrir ou replier le menu · Ctrl/Cmd + B</TooltipContent></Tooltip>;
}
