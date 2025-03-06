export enum AppointmentStatuses {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
  PLANNED = 'PLANNED',
}

export const appStatusToReadable = (s: AppointmentStatuses) => {
  return s === AppointmentStatuses.COMPLETED
    ? 'Завершений'
    : s === AppointmentStatuses.CANCELED
      ? 'Скасований'
      : 'Запланований';
};

export interface AppointmentsRegistryEntryDto {
  id: number;
  service: string;
  appointmentDate: number;
  status: AppointmentStatuses;
  price: number;
  doctorName: string;
  patientName: string;
}

export interface AppointmentsRegistryDto {
  entries: AppointmentsRegistryEntryDto[];
  page: number;
  perPage: number;
  totalPages: number;
}

import { z } from 'zod';

export const appointmentRowSchema = z.object({
  service: z.string().nonempty('Оберіть послугу'),
  doctorName: z.string().nonempty('Оберіть лікаря'),
  date: z.string().nonempty('Оберіть дату прийому'),
  time: z.string().nonempty('Оберіть час'),
});

export type AppointmentRow = z.infer<typeof appointmentRowSchema>;

export const stepOneSchema = z.object({
  appointments: z
    .array(appointmentRowSchema)
    .min(1, 'Додайте хоча б один запис'),
});
export type StepOneForm = z.infer<typeof stepOneSchema>;

export const appointmentsTestData: AppointmentsRegistryEntryDto[] = [
  {
    id: 1,
    service: 'УЗД судин шиї та голови',
    appointmentDate: new Date(2020, 0, 1, 14, 30).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 900.0,
    doctorName: 'Панов Максим Ігорович',
    patientName: 'Шевченко Тарас Григорович',
  },
  {
    id: 2,
    service: 'Консультація невролога',
    appointmentDate: new Date(2025, 5, 15, 10, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 500,
    doctorName: 'Сидоренко Марія Василівна',
    patientName: 'Кучеренко Оксана Михайлівна',
  },
  {
    id: 3,
    service: 'МРТ головного мозку',
    appointmentDate: new Date(2021, 5, 5, 9, 15).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 2500,
    doctorName: 'Іваненко Олег Петрович',
    patientName: 'Коваленко Сергій Олександрович',
  },
  {
    id: 4,
    service: 'УЗД органів черевної порожнини',
    appointmentDate: new Date(2022, 3, 12, 13, 45).getTime(),
    status: AppointmentStatuses.CANCELED,
    price: 800,
    doctorName: 'Коваленко Світлана Андріївна',
    patientName: 'Бондаренко Марія Іванівна',
  },
  {
    id: 5,
    service: 'Рентген хребта',
    appointmentDate: new Date(2025, 4, 20, 16, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 600,
    doctorName: 'Мельник Сергій Дмитрович',
    patientName: 'Левченко Андрій Володимирович',
  },
  {
    id: 6,
    service: 'Консультація кардіолога',
    appointmentDate: new Date(2021, 11, 2, 11, 0).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 700,
    doctorName: 'Гаврилюк Олена Вікторівна',
    patientName: 'Петренко Олена Юріївна',
  },
  {
    id: 7,
    service: 'Ехокардіографія',
    appointmentDate: new Date(2021, 9, 25, 14, 10).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 1200,
    doctorName: 'Гаврилюк Олена Вікторівна',
    patientName: 'Сидоренко Вікторія Сергіївна',
  },
  {
    id: 8,
    service: 'Загальний аналіз крові',
    appointmentDate: new Date(2023, 1, 5, 8, 30).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 200,
    doctorName: 'Лабораторія №1',
    patientName: 'Мельник Дмитро Павлович',
  },
  {
    id: 9,
    service: 'Консультація ортопеда',
    appointmentDate: new Date(2023, 1, 8, 9, 0).getTime(),
    status: AppointmentStatuses.CANCELED,
    price: 400,
    doctorName: 'Стеценко Павло Анатолійович',
    patientName: 'Іванов Василь Олексійович',
  },
  {
    id: 10,
    service: 'Флюорографія',
    appointmentDate: new Date(2025, 10, 15, 13, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 300,
    doctorName: 'Рентген-кабінет №2',
    patientName: 'Петросян Армен Григорянович',
  },
  {
    id: 11,
    service: 'Консультація терапевта',
    appointmentDate: new Date(2023, 2, 1, 10, 30).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 350,
    doctorName: 'Демченко Катерина Ігорівна',
    patientName: 'Ковальчук Надія Миколаївна',
  },
  {
    id: 12,
    service: 'Аналіз сечі',
    appointmentDate: new Date(2023, 2, 10, 8, 45).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 150,
    doctorName: 'Лабораторія №2',
    patientName: 'Федоренко Олег Вікторович',
  },
  {
    id: 13,
    service: 'Консультація стоматолога',
    appointmentDate: new Date(2022, 6, 21, 15, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 250,
    doctorName: 'Романенко Валерій Григорович',
    patientName: 'Горбаченко Світлана Валеріївна',
  },
  {
    id: 14,
    service: 'Консультація офтальмолога',
    appointmentDate: new Date(2023, 4, 3, 12, 0).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 450,
    doctorName: 'Іващенко Наталія Петрівна',
    patientName: 'Литвиненко Анна Дмитрівна',
  },
  {
    id: 15,
    service: 'УЗД нирок',
    appointmentDate: new Date(2023, 5, 7, 11, 15).getTime(),
    status: AppointmentStatuses.CANCELED,
    price: 700,
    doctorName: 'Петров Вадим Олександрович',
    patientName: 'Бойко Сергій Іванович',
  },
  {
    id: 16,
    service: 'Колоноскопія',
    appointmentDate: new Date(2023, 6, 14, 9, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 2000,
    doctorName: 'Василенко Олег Григорович',
    patientName: 'Руденко Олександр Іванович',
  },
  {
    id: 17,
    service: 'Консультація ендокринолога',
    appointmentDate: new Date(2023, 7, 1, 14, 0).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 600,
    doctorName: 'Бондаренко Ірина Миколаївна',
    patientName: 'Морозенко Наталія Іванівна',
  },
  {
    id: 18,
    service: 'Аналіз крові на цукор',
    appointmentDate: new Date(2023, 7, 1, 8, 0).getTime(),
    status: AppointmentStatuses.COMPLETED,
    price: 180,
    doctorName: 'Лабораторія №3',
    patientName: 'Соловйов Олексій Вадимович',
  },
  {
    id: 19,
    service: 'Консультація психолога',
    appointmentDate: new Date(2023, 8, 10, 16, 0).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 550,
    doctorName: 'Баранов Андрій Павлович',
    patientName: 'Зайцев Дмитро Олександрович',
  },
  {
    id: 20,
    service: 'Консультація дієтолога',
    appointmentDate: new Date(2023, 9, 5, 10, 45).getTime(),
    status: AppointmentStatuses.CANCELED,
    price: 500,
    doctorName: 'Гончарова Лілія Сергіївна',
    patientName: 'Громенко Ірина Павлівна',
  },
  {
    id: 21,
    service: 'Мамографія',
    appointmentDate: new Date(2023, 10, 20, 11, 30).getTime(),
    status: AppointmentStatuses.PLANNED,
    price: 1000,
    doctorName: 'Рентген-кабінет №5',
    patientName: 'Козак Олександр Сергійович',
  },
];
