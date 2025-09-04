import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import {
  Home,
  FileText,
  Calendar,
  Activity,
  BookOpen,
  TrendingUp,
  Settings,
  Compass,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home, section: 'dashboard' },
  { title: 'My Retreats', url: '/retreats', icon: Compass, section: 'retreats' },
  { title: 'Daily Program', url: '/daily', icon: Calendar, section: 'daily-program' },
  { title: 'Progress', url: '/progress', icon: TrendingUp, section: 'progress' },
  { title: 'Resources', url: '/resources', icon: BookOpen, section: 'resources' },
];

const utilityItems = [
  { title: 'Wellness Assessment', url: '/intake', icon: FileText },
  { title: 'Subscription', url: '/subscription', icon: Settings },
];

export const AppSidebar: React.FC = () => {
  const { state: sidebarState } = useSidebar();
  const { state: appState } = useApp();
  const location = useLocation();

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-luxury-emerald/10 text-luxury-emerald font-medium' : 'hover:bg-muted/50';

  const hasSelectedRetreat = appState.retreat.selectedRetreatId !== null;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClassName}
                    >
                      <item.icon className="h-4 w-4" />
                      {sidebarState === 'expanded' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Utility Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClassName}
                    >
                      <item.icon className="h-4 w-4" />
                      {sidebarState === 'expanded' && (
                        <div className="flex items-center justify-between w-full">
                          <span>{item.title}</span>
                          {item.title === 'Wellness Assessment' && appState.user.hasCompletedIntake && (
                            <Badge variant="secondary" className="text-xs ml-2">
                              ✓
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progress Summary - Show if retreat is active */}
        {hasSelectedRetreat && sidebarState === 'expanded' && (
          <SidebarGroup>
            <SidebarGroupLabel>Progress</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-2 space-y-2">
                <div className="text-sm text-muted-foreground">
                  Day {appState.retreat.currentDay}
                </div>
                <div className="text-xs text-muted-foreground">
                  {appState.retreat.completedActivities.length} activities completed
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};