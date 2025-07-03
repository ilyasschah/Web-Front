import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Package,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Utensils,
  Gift,
  UserCheck,
  Tags,
  Warehouse,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'POS Terminal',
    href: '/pos',
    icon: ShoppingCart,
    roles: ['admin', 'cashier', 'manager'],
  },
  {
    title: 'Products',
    href: '/products',
    icon: Package,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Categories',
    href: '/categories',
    icon: Tags,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: ClipboardList,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Warehouse,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Tables',
    href: '/tables',
    icon: Utensils,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Users',
    href: '/users',
    icon: UserCheck,
    roles: ['admin'],
  },
  {
    title: 'Discounts',
    href: '/discounts',
    icon: Gift,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['admin', 'manager'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const filteredNavItems = navItems.filter(item =>
    item.roles.includes(user?.role || '')
  );

  return (
    <nav className="w-64 border-r border-border bg-card">
      <div className="space-y-2 p-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};