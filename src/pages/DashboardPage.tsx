import React from 'react';
import { Users, UserCheck, UserMinus, TrendingUp } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { useLeads } from '../hooks/useLeads';

export const DashboardPage: React.FC = () => {
  const { data } = useLeads({ limit: 1 });
  
  const stats = [
    { name: 'Total Leads', value: data?.pagination.totalRecords || 0, icon: Users, color: 'bg-blue-500' },
    { name: 'Qualified', value: '12', icon: UserCheck, color: 'bg-green-500' },
    { name: 'Lost', value: '5', icon: UserMinus, color: 'bg-red-500' },
    { name: 'Conversion', value: '24%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  return (
    <PageLayout title="Dashboard" subtitle="Welcome back! Here's what's happening today.">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg text-white shrink-0`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 p-6 h-80 flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500 italic">Recent Activity Chart Placeholder</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 p-6 h-80 flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500 italic">Leads by Source Chart Placeholder</p>
        </div>
      </div>
    </PageLayout>
  );
};
