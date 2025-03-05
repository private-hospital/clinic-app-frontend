import { AppointmentStatuses } from './appointments';

export interface StatementRegistryEntryDto {
  id: number;
  service: string;
  patientName: string;
  total: number;
  appointmentDate: number;
  endDate?: number;
  status: AppointmentStatuses;
  invoiceUrl: string;
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

export interface AllowedServicesForStatementFilterDto {
  services: string[];
}

export const statementsTestData: StatementRegistryEntryDto[] = [
  {
    id: 1,
    service: 'УЗД судин шиї та голови',
    patientName: 'Панов Максим Ігорович',
    total: 750,
    appointmentDate: new Date(2025, 1, 1, 12, 30).getTime(),
    endDate: new Date(2025, 1, 1, 12, 53).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 2,
    service: 'Консультація невролога',
    patientName: 'Сидоренко Марія Василівна',
    total: 500,
    appointmentDate: new Date(2025, 1, 2, 9, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 3,
    service: 'МРТ головного мозку',
    patientName: 'Іваненко Олег Петрович',
    total: 2500,
    appointmentDate: new Date(2025, 1, 3, 14, 15).getTime(),
    endDate: new Date(2025, 1, 3, 14, 45).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 4,
    service: 'Рентген грудної клітини',
    patientName: 'Коваленко Світлана Андріївна',
    total: 800,
    appointmentDate: new Date(2025, 1, 4, 10, 0).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 5,
    service: 'Консультація терапевта',
    patientName: 'Мельник Сергій Дмитрович',
    total: 600,
    appointmentDate: new Date(2025, 1, 5, 11, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 6,
    service: 'Електрокардіограма',
    patientName: 'Гаврилюк Олена Вікторівна',
    total: 700,
    appointmentDate: new Date(2025, 1, 6, 8, 45).getTime(),
    endDate: new Date(2025, 1, 6, 9, 15).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 7,
    service: 'УЗД органів черевної порожнини',
    patientName: 'Сидоренко Вікторія Сергіївна',
    total: 900,
    appointmentDate: new Date(2025, 1, 7, 13, 0).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 8,
    service: 'Консультація стоматолога',
    patientName: 'Петренко Олена Юріївна',
    total: 400,
    appointmentDate: new Date(2025, 1, 8, 15, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 9,
    service: 'Аналіз крові',
    patientName: 'Іванов Василь Олексійович',
    total: 200,
    appointmentDate: new Date(2025, 1, 9, 7, 15).getTime(),
    endDate: new Date(2025, 1, 9, 7, 35).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 10,
    service: 'Консультація кардіолога',
    patientName: 'Петросян Армен Григорянович',
    total: 850,
    appointmentDate: new Date(2025, 1, 10, 10, 45).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 11,
    service: 'УЗД щитовидної залози',
    patientName: 'Ковальчук Надія Миколаївна',
    total: 550,
    appointmentDate: new Date(2025, 1, 11, 9, 20).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 12,
    service: 'МРТ суглобів',
    patientName: 'Федоренко Олег Вікторович',
    total: 3000,
    appointmentDate: new Date(2025, 1, 12, 14, 0).getTime(),
    endDate: new Date(2025, 1, 12, 14, 35).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 13,
    service: 'Консультація офтальмолога',
    patientName: 'Горбаченко Світлана Валеріївна',
    total: 650,
    appointmentDate: new Date(2025, 1, 13, 11, 15).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 14,
    service: 'Фізіотерапія',
    patientName: 'Литвиненко Анна Дмитрівна',
    total: 1200,
    appointmentDate: new Date(2025, 1, 14, 16, 0).getTime(),
    endDate: new Date(2025, 1, 14, 16, 30).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 15,
    service: 'Рентген кісток',
    patientName: 'Бойко Сергій Іванович',
    total: 950,
    appointmentDate: new Date(2025, 1, 15, 13, 45).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 16,
    service: 'Консультація дерматолога',
    patientName: 'Руденко Олександр Іванович',
    total: 700,
    appointmentDate: new Date(2025, 1, 16, 9, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 17,
    service: 'УЗД нирок',
    patientName: 'Морозенко Наталія Іванівна',
    total: 800,
    appointmentDate: new Date(2025, 1, 17, 10, 0).getTime(),
    endDate: new Date(2025, 1, 17, 10, 25).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 18,
    service: 'Аналіз сечі',
    patientName: 'Соловйов Олексій Вадимович',
    total: 150,
    appointmentDate: new Date(2025, 1, 18, 8, 0).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 19,
    service: 'Консультація психолога',
    patientName: 'Зайцев Дмитро Олександрович',
    total: 500,
    appointmentDate: new Date(2025, 1, 19, 15, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 20,
    service: 'Лабораторне обстеження',
    patientName: 'Громенко Ірина Павлівна',
    total: 400,
    appointmentDate: new Date(2025, 1, 20, 7, 45).getTime(),
    endDate: new Date(2025, 1, 20, 8, 5).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 21,
    service: 'УЗД органів черевної порожнини',
    patientName: 'Козак Олександр Сергійович',
    total: 850,
    appointmentDate: new Date(2025, 1, 21, 12, 15).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 22,
    service: 'Консультація ендокринолога',
    patientName: 'Лещенко Олексій Михайлович',
    total: 780,
    appointmentDate: new Date(2025, 1, 22, 10, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 23,
    service: 'МРТ суглобів',
    patientName: 'Данилюк Оксана Петрівна',
    total: 3200,
    appointmentDate: new Date(2025, 1, 23, 14, 45).getTime(),
    endDate: new Date(2025, 1, 23, 15, 20).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 24,
    service: 'Консультація гастроентеролога',
    patientName: 'Кравченко Ігор Сергійович',
    total: 670,
    appointmentDate: new Date(2025, 1, 24, 11, 0).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 25,
    service: 'УЗД щитовидної залози',
    patientName: 'Мартинюк Вікторія Романівна',
    total: 500,
    appointmentDate: new Date(2025, 1, 25, 9, 15).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 26,
    service: 'Консультація ревматолога',
    patientName: 'Тарасюк Сергій Миколайович',
    total: 900,
    appointmentDate: new Date(2025, 1, 26, 13, 30).getTime(),
    endDate: new Date(2025, 1, 26, 13, 55).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 27,
    service: 'Рентген-обстеження',
    patientName: 'Сорокін Олександр Дмитрович',
    total: 850,
    appointmentDate: new Date(2025, 1, 27, 10, 45).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 28,
    service: 'УЗД серця',
    patientName: 'Клименко Марія Олегівна',
    total: 750,
    appointmentDate: new Date(2025, 1, 28, 12, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 29,
    service: 'Консультація нефролога',
    patientName: 'Васильєв Олег Петрович',
    total: 950,
    appointmentDate: new Date(2025, 1, 29, 9, 30).getTime(),
    endDate: new Date(2025, 1, 29, 9, 55).getTime(),
    status: AppointmentStatuses.COMPLETED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 30,
    service: 'Лабораторне обстеження крові',
    patientName: 'Рудь Олена Степанівна',
    total: 600,
    appointmentDate: new Date(2025, 1, 30, 8, 15).getTime(),
    status: AppointmentStatuses.CANCELED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
  {
    id: 31,
    service: 'Консультація окулиста',
    patientName: 'Демченко Катерина Ігорівна',
    total: 700,
    appointmentDate: new Date(2025, 1, 31, 11, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    invoiceUrl: 'https://cdn.vitalineph.com/sample.pdf',
  },
];
