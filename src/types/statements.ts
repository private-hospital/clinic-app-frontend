import { AppointmentStatuses } from './appointments';

export interface StatementRegistryEntryDto {
  id: number;
  service: string;
  patientName: string;
  total: number;
  appointmentDate: number;
  endDate?: number;
  status: AppointmentStatuses;
  invoiceId: number;
}

export interface StatementRegistryDto {
  entries: StatementRegistryEntryDto[];
  page: number;
  perPage: number;
  totalPages: number;
}

export interface StatementFilterPropsDto {
  services?: string[];
  statuses?: AppointmentStatuses[];
  sortBy?: 'id' | 'service' | 'endDate';
  order?: 'asc' | 'desc';
}
