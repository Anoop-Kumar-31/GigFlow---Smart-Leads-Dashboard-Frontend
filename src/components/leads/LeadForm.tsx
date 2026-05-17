import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lead, LeadStatus, LeadSource } from '../../types/lead.types';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

interface LeadFormProps {
  initialData?: Lead | null;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      status: LeadStatus.NEW,
      source: LeadSource.WEBSITE,
      notes: '',
    },
  });

  return (
    <form id="lead-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lead Name
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="Rahul Sharma"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message as string}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            {...register('email')}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="rahul@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message as string}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            {Object.values(LeadStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Source
          </label>
          <select
            {...register('source')}
            className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            {Object.values(LeadSource).map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
          placeholder="Additional details about the lead..."
        />
        {errors.notes && (
          <p className="text-xs text-red-600 mt-1">{errors.notes.message as string}</p>
        )}
      </div>
    </form>
  );
};
