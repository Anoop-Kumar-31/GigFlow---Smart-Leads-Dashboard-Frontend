import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadApi } from '../api/lead.api';
import { LeadFilters, CreateLeadPayload, UpdateLeadPayload } from '../types/lead.types';
import { AxiosError } from 'axios';

const LEADS_KEY = 'leads';

export const useLeads = (filters: LeadFilters) => {
  return useQuery({
    queryKey: [LEADS_KEY, filters],
    queryFn: () => leadApi.getLeads(filters).then((res) => res.data),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
};

export const useLead = (id: string) => {
  return useQuery({
    queryKey: [LEADS_KEY, id],
    queryFn: () => leadApi.getLeadById(id).then((res) => res.data),
    enabled: Boolean(id),
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLeadPayload) =>
      leadApi.createLead(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
    },
    onError: (error: AxiosError) => {
      console.error('Create lead error:', error.response?.data);
    },
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadPayload }) =>
      leadApi.updateLead(id, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
    },
  });
};

export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => leadApi.deleteLead(id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LEADS_KEY] });
    },
  });
};

export const useExportCSV = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await leadApi.exportCSV();
      const blob = new Blob([response.data as BlobPart], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `leads-${Date.now()}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    },
  });
};
