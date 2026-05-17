export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  LOST = 'Lost',
}

export enum LeadSource {
  WEBSITE = 'Website',
  INSTAGRAM = 'Instagram',
  REFERRAL = 'Referral',
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  notes?: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  status?: LeadStatus;
  source: LeadSource;
  notes?: string;
}

export interface UpdateLeadPayload extends Partial<CreateLeadPayload> {}

export interface LeadFilters {
  status?: LeadStatus | '';
  source?: LeadSource | '';
  search?: string;
  sortBy?: 'latest' | 'oldest';
  page?: number;
  limit?: number;
}
