import React from 'react';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-20">
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
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary-500 to-purple-500 flex items-center justify-center text-white shadow-md ring-2 ring-white dark:ring-gray-800">
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
