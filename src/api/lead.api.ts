import { apiClient } from './axios.config';
import { PaginatedResponse, ApiResponse } from '../types/api.types';
import { Lead, CreateLeadPayload, UpdateLeadPayload, LeadFilters } from '../types/lead.types';

export const leadApi = {
  getLeads: (filters: LeadFilters) =>
    apiClient.get<PaginatedResponse<Lead>>('/leads', { params: filters }),

  getLeadById: (id: string) =>
    apiClient.get<ApiResponse<Lead>>(`/leads/${id}`),

  createLead: (data: CreateLeadPayload) =>
    apiClient.post<ApiResponse<Lead>>('/leads', data),

  updateLead: (id: string, data: UpdateLeadPayload) =>
    apiClient.put<ApiResponse<Lead>>(`/leads/${id}`, data),

  deleteLead: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/leads/${id}`),

  exportCSV: () =>
    apiClient.get('/leads/export/csv', { responseType: 'blob' }),
};
