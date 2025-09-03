'use client';

import * as React from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Megaphone,
  Percent,
  FileText,
  Globe,
  BarChart3,
  Facebook,
  Bot,
  TrendingUp,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavSalesChannels } from './nav-sales-channels';
import { NavUser } from './nav-user';
import { StoreSwitcher } from './store-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Admin User',
    email: 'admin@merchokay.com',
    avatar: '/avatars/admin.jpg',
  },
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Orders',
      url: '/dashboard/orders',
      icon: ShoppingCart,
      items: [
        {
          title: 'All Orders',
          url: '/dashboard/orders',
        },
        {
          title: 'Drafts',
          url: '/dashboard/orders/drafts',
        },
        {
          title: 'Abandoned Checkouts',
          url: '/dashboard/orders/abandoned',
        },
      ],
    },
    {
      title: 'Products',
      url: '/dashboard/products',
      icon: Package,
      items: [
        {
          title: 'All Products',
          url: '/dashboard/products',
        },
        {
          title: 'Collections',
          url: '/dashboard/products/collections',
        },
        {
          title: 'Add Product',
          url: '/dashboard/products/new',
        },
        {
          title: 'Inventory',
          url: '/dashboard/products/inventory',
        },
        {
          title: 'Gift Cards',
          url: '/dashboard/products/gift-cards',
        },
      ],
    },
    {
      title: 'Customers',
      url: '/dashboard/customers',
      icon: Users,
      items: [
        {
          title: 'All Customers',
          url: '/dashboard/customers',
        },
        {
          title: 'Segments',
          url: '/dashboard/customers/segments',
        },
      ],
    },
    {
      title: 'Marketing',
      url: '/dashboard/marketing',
      icon: Megaphone,
      items: [
        {
          title: 'Campaigns',
          url: '/dashboard/marketing/campaigns',
        },
        {
          title: 'Attribution',
          url: '/dashboard/marketing/attribution',
        },
        {
          title: 'Automations',
          url: '/dashboard/marketing/automations',
        },
      ],
    },
    {
      title: 'Discounts',
      url: '/dashboard/discounts',
      icon: Percent,
    },
    {
      title: 'Content',
      url: '/dashboard/content',
      icon: FileText,
      items: [
        {
          title: 'Files',
          url: '/dashboard/content/files',
        },
        {
          title: 'Menus',
          url: '/dashboard/content/menus',
        },
        {
          title: 'Blog Posts',
          url: '/dashboard/content/blog',
        },
      ],
    },
    {
      title: 'Markets',
      url: '/dashboard/markets',
      icon: Globe,
      items: [
        {
          title: 'Currencies',
          url: '/dashboard/markets/currencies',
        },
        {
          title: 'Collections',
          url: '/dashboard/markets/collections',
        },
        {
          title: 'Domains & Languages',
          url: '/dashboard/markets/domains',
        },
      ],
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: BarChart3,
      items: [
        {
          title: 'Reports',
          url: '/dashboard/analytics/reports',
        },
        {
          title: 'Live View',
          url: '/dashboard/analytics/live',
        },
      ],
    },
  ],
  salesChannels: [
    {
      name: 'Google',
      url: '/dashboard/channels/google',
      icon: Bot,
    },
    {
      name: 'Facebook',
      url: '/dashboard/channels/facebook',
      icon: Facebook,
    },
    {
      name: 'Microsoft Clarity',
      url: '/dashboard/channels/clarity',
      icon: TrendingUp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSalesChannels channels={data.salesChannels} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
