'use client';

import Image from 'next/image';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function StoreSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              src="/logo/logo-icon.png"
              alt="Merchokay"
              width={24}
              height={24}
              className="size-6"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Merchokay</span>
            <span className="truncate text-xs text-sidebar-foreground/70">
              Admin Dashboard
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
