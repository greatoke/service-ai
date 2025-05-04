"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './button';
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
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

interface SidebarProps {
  className?: string;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({ className, isMobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768 && collapsed) {
        setCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeMobileSidebar = () => {
    if (onMobileClose) onMobileClose();
  };

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Chatbots',
      href: '/dashboard/chatbots',
      icon: <MessageSquare size={20} />,
    },
    {
      title: 'Documents',
      href: '/dashboard/documents',
      icon: <FileText size={20} />,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart3 size={20} />,
    },
    {
      title: 'Team',
      href: '/dashboard/team',
      icon: <Users size={20} />,
    },
    {
      title: 'Integrations',
      href: '/dashboard/integrations',
      icon: <Zap size={20} />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings size={20} />,
    },
  ];

  // Mobile sidebar (overlay style)
  if (isMobile) {
    return (
      <>
        {/* Desktop sidebar */}
        <div
          className={cn(
            'hidden md:flex md:flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
            collapsed ? 'md:w-[70px]' : 'md:w-[250px]',
            className
          )}
        >
          {/* Desktop sidebar content - same as before */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                S
              </div>
              {!collapsed && (
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Service AI
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hidden md:flex"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                    collapsed && 'justify-center'
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
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors",
              collapsed ? "justify-center" : ""
            )}>
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
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Service AI
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMobileSidebar}
              aria-label="Close sidebar"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="overflow-y-auto py-4 flex-1">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
        'flex flex-col h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
        collapsed ? 'w-[70px]' : 'w-[250px]',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
            S
          </div>
          {!collapsed && (
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Service AI
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hidden md:flex"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
                pathname === item.href
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                collapsed && 'justify-center'
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
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 transition-colors",
          collapsed ? "justify-center" : ""
        )}>
          <ThemeToggle />
          {!collapsed && <span>Theme</span>}
        </div>
      </div>
    </div>
  );
} 