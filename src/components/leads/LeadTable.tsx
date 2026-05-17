import React from 'react';
import { Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Lead } from '../../types/lead.types';
import { PaginationMeta } from '../../types/api.types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { UserRole } from '../../types/user.types';
import { useAuthStore } from '../../store/auth.store';

interface LeadTableProps {
  leads: Lead[];
  pagination: PaginationMeta;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
  onPageChange: (page: number) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  pagination,
  onEdit,
  onDelete,
  onView,
  onPageChange,
}) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/60 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200/60 dark:border-gray-700/60 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md">
              {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map(
                (header) => (
                  <th
                    key={header}
                    className={`px-4 py-3 font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap ${header === 'Actions' ? 'text-center' : 'text-left'} `}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {lead.email}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Badge label={lead.status} variant={lead.status} />
                </td>
                <td className="px-4 py-3">
                  <Badge label={lead.source} variant={lead.source} />
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(lead)}
                      className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50
                                 dark:hover:text-primary-400 dark:hover:bg-primary-900/20
                                 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50
                                 dark:hover:text-blue-400 dark:hover:bg-blue-900/20
                                 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => onDelete(lead._id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50
                                   dark:hover:text-red-400 dark:hover:bg-red-900/20
                                   rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          Showing{' '}
          <span className="font-medium">
            {(pagination.currentPage - 1) * pagination.limit + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalRecords
            )}
          </span>{' '}
          of{' '}
          <span className="font-medium">{pagination.totalRecords}</span> leads
        </p>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
            className="flex-1 sm:flex-none"
          >
            Prev
          </Button>

          <span className="text-sm font-medium px-3 py-1.5 rounded-lg
                           bg-primary-50 dark:bg-primary-900/20
                           text-primary-700 dark:text-primary-300 whitespace-nowrap">
            {pagination.currentPage} / {pagination.totalPages}
          </span>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="flex-1 sm:flex-none"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
