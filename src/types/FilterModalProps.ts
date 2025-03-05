import { AppointmentStatuses } from './appointments';

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filter: {
    services?: string[];
    statuses?: AppointmentStatuses[];
    sortBy: 'id' | 'service' | 'endDate';
    order: 'asc' | 'desc';
  }) => void;
}
