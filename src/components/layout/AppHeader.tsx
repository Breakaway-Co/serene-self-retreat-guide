import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useApp } from '@/contexts/AppContext';
import { Moon, Sun, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export const AppHeader: React.FC = () => {
  const { state, actions } = useApp();

  const toggleTheme = () => {
    actions.setTheme(state.ui.theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    actions.resetUserData();
    window.location.href = '/';
  };

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-primary">Healing Retreats</h1>
            {state.retreat.selectedRetreatId && (
              <Badge variant="secondary" className="text-xs">
                Day {state.retreat.currentDay}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {state.ui.theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                {state.user.hasCompletedIntake ? 'Assessment Complete' : 'No Assessment'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/intake'}>
                {state.user.hasCompletedIntake ? 'Retake Assessment' : 'Take Assessment'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Reset Progress
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};