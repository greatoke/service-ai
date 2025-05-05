"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  Users,
  HelpCircle,
  Zap,
  Bell,
  X,
  Building,
  ChevronDown,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback } from "./avatar";
import Icon from "./icon";
import { Organization } from "@prisma/client";
interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  organizations: Organization[];
}

export function DashboardSidebar({
  className,
  isMobileOpen,
  onMobileClose,
  organizations,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Mock data for organizations - would be fetched from API in real implementation

  const [currentOrg, setCurrentOrg] = useState(organizations[0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeMobileSidebar = () => {
    if (onMobileClose) onMobileClose();
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Chatbots",
      href: "/dashboard/chatbots",
      icon: <MessageSquare size={20} />,
    },
    {
      title: "Documents",
      href: "/dashboard/documents",
      icon: <FileText size={20} />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: <Users size={20} />,
    },
    {
      title: "Integrations",
      href: "/dashboard/integrations",
      icon: <Zap size={20} />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  console.log(pathname);

  // Organization Switcher component
  const OrganizationSwitcher = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 w-full px-3 py-2",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2">
            <Icon />
            {!collapsed && (
              <span className="font-medium text-gray-900 dark:text-white">
                {currentOrg.name}
              </span>
            )}
          </div>
          {!collapsed && <ChevronDown className="h-4 w-4 text-gray-500" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px]">
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            className="cursor-pointer"
            onClick={() => setCurrentOrg(org)}
          >
            <Link
              href={`/dashboard/${org.id}`}
              className="flex items-center w-full"
            >
              <span>{org.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href="/dashboard/create-organization"
            className="flex items-center w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>Create Organization</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Mobile sidebar (overlay style)
  if (isMobile) {
    return (
      <>
        {/* Desktop sidebar */}
        <div
          className={cn(
            "hidden md:flex md:flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative",
            collapsed ? "md:w-[70px]" : "md:w-[250px]",
            className
          )}
        >
          {/* Desktop sidebar content - same as before */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <OrganizationSwitcher />
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={16} />
              </Button>
            )}
          </div>

          {collapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="absolute -right-3 top-9 rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              aria-label="Expand sidebar"
            >
              <ChevronRight size={14} />
            </Button>
          )}

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                    collapsed && "justify-center"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <Bell size={20} />
              {!collapsed && <span>Notifications</span>}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <HelpCircle size={20} />
              {!collapsed && <span>Help & Support</span>}
            </div>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors",
                collapsed ? "justify-center" : ""
              )}
            >
              <ThemeToggle />
              {!collapsed && <span>Theme</span>}
            </div>
          </div>
        </div>

        {/* Mobile overlay sidebar */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200",
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />

        <div
          className={cn(
            "fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white dark:bg-gray-900 shadow-xl transition-transform duration-300 ease-in-out transform md:hidden",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <OrganizationSwitcher />
            {isMobileOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileSidebar}
                aria-label="Close sidebar"
                className="rounded-full w-8 h-8 flex items-center justify-center bg-background hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                <X size={18} />
              </Button>
            )}
          </div>

          <div className="overflow-y-auto py-4 flex-1">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={closeMobileSidebar}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <Bell size={20} />
              <span>Notifications</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors">
              <ThemeToggle />
              <span>Theme</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar (non-mobile)
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 relative",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <OrganizationSwitcher />
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </Button>
        )}
      </div>

      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-3 top-9 rounded-full w-6 h-6 flex items-center justify-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={14} />
        </Button>
      )}

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                pathname === item.href
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                collapsed && "justify-center"
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <Bell size={20} />
          {!collapsed && <span>Notifications</span>}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <HelpCircle size={20} />
          {!collapsed && <span>Help & Support</span>}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors",
            collapsed ? "justify-center" : ""
          )}
        >
          <ThemeToggle />
          {!collapsed && <span>Theme</span>}
        </div>
      </div>
    </div>
  );
}
