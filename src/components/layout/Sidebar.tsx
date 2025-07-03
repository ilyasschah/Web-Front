import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package2, Users, ShoppingCart, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      to: "/",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      to: "/products",
      icon: <Package2 size={20} />,
      label: "Products",
    },
    {
      to: "/customers",
      icon: <Users size={20} />,
      label: "Customers",
    },
    {
      to: "/orders",
      icon: <ShoppingCart size={20} />,
      label: "Orders",
    },
  ];

  return (
    <aside className="w-64 h-full bg-background border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">POS System</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.to}
          />
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="text-sm font-medium">US</span>
          </div>
          <div>
            <p className="text-sm font-medium">User Store</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
