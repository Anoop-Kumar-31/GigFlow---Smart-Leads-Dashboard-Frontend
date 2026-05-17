import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, BarChart2, Shield } from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl border-r border-gray-200/50 dark:border-gray-800 h-screen sticky top-0 transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-500">
          <Shield className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">GigFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 dark:from-primary-900/40 dark:to-primary-900/10 dark:text-primary-300 shadow-sm border-l-4 border-primary-500'
                  : 'text-gray-600 hover:bg-gray-50/80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white border-l-4 border-transparent'
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-primary-700 dark:text-primary-400 uppercase tracking-wider mb-2">
            Subscription
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Premium Plan
          </p>
          <div className="w-full bg-primary-200 dark:bg-primary-800 rounded-full h-1.5 mb-2">
            <div className="bg-primary-600 h-1.5 rounded-full w-3/4" />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            750 of 1000 leads used
          </p>
        </div>
      </div>
    </aside>
  );
};
