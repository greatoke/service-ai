"use client";

import React, { useEffect, useState } from 'react';
import { DashboardSidebar } from './ui/dashboard-sidebar';
import { DashboardHeader } from './ui/dashboard-header';
import { Organization } from '@prisma/client';

interface Props {
  children: React.ReactNode;
  organization: Organization[];
}

export function DashboardLayoutWrapper({ children, organization }: Props) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        organizations={organization}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMobileMenuToggle={toggleMobileSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 