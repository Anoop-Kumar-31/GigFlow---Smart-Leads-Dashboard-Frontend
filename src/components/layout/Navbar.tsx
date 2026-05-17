import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, LogOut, User, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { useThemeStore } from '../../store/theme.store';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 sticky top-0 z-20 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/80 p-1.5 pr-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
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
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="sm:hidden px-4 py-2 mb-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        title="Confirm Logout"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
            <Button 
              variant="danger" 
              onClick={() => {
                setShowLogoutConfirm(false);
                logout();
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">
          Are you sure you want to log out of your account?
        </p>
      </Modal>
    </header>
  );
};
