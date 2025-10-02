import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { Footer } from './Footer';
import { useApp } from '@/contexts/AppContext';

export const AppLayout: React.FC = () => {
  const { state } = useApp();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <div className="flex flex-1">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};