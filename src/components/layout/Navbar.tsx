import React from 'react';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        {/* Placeholder for breadcrumbs or search */}
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {user?.role.replace('_', ' ')}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300">
            <User className="w-5 h-5" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-500 hover:text-red-600"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
