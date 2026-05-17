import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { LeadFilters as ILeadFilters, LeadStatus, LeadSource } from '../../types/lead.types';
import { Button } from '../ui/Button';

interface LeadFiltersProps {
  filters: ILeadFilters;
  onFiltersChange: (filters: ILeadFilters) => void;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const [searchInput, setSearchInput] = useState(filters.search ?? '');
  const debouncedSearch = useDebounce(searchInput, 500);

  // Apply debounced search when it changes
  React.useEffect(() => {
    onFiltersChange({ ...filters, search: debouncedSearch, page: 1 });
  }, [debouncedSearch]);

  const handleFilterChange = (
    key: keyof ILeadFilters,
    value: string | number
  ) => {
    onFiltersChange({ ...filters, [key]: value, page: 1 });
  };

  const handleClearFilters = () => {
    setSearchInput('');
    onFiltersChange({ page: 1, limit: 10 });
  };

  const hasActiveFilters =
    filters.status || filters.source || filters.search || filters.sortBy;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status ?? ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm min-w-[140px]"
        >
          <option value="">All Statuses</option>
          {Object.values(LeadStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        {/* Source Filter */}
        <select
          value={filters.source ?? ''}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm min-w-[140px]"
        >
          <option value="">All Sources</option>
          {Object.values(LeadSource).map((source) => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy ?? 'latest'}
          onChange={(e) =>
            handleFilterChange('sortBy', e.target.value as 'latest' | 'oldest')
          }
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="md"
            onClick={handleClearFilters}
            leftIcon={<X className="w-4 h-4" />}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
