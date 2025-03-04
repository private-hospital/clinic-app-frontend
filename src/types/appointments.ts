export interface AppointmentsRegistryEntryDto {
  id: number;
  service: string;
  appointmentDate: number;
  status: 'Завершений' | 'Скасований' | 'Запланований';
  price: number;
  doctorName: string;
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
    status: 'Завершений',
    price: 900.0,
    doctorName: 'Панов Максим Ігорович',
  },
  {
    id: 2,
    service: 'Консультація невролога',
    appointmentDate: new Date(2021, 2, 15, 10, 0).getTime(),
    status: 'Запланований',
    price: 500,
    doctorName: 'Сидоренко Марія Василівна',
  },
  {
    id: 3,
    service: 'МРТ головного мозку',
    appointmentDate: new Date(2021, 5, 5, 9, 15).getTime(),
    status: 'Завершений',
    price: 2500,
    doctorName: 'Іваненко Олег Петрович',
  },
  {
    id: 4,
    service: 'УЗД органів черевної порожнини',
    appointmentDate: new Date(2022, 3, 12, 13, 45).getTime(),
    status: 'Скасований',
    price: 800,
    doctorName: 'Коваленко Світлана Андріївна',
  },
  {
    id: 5,
    service: 'Рентген хребта',
    appointmentDate: new Date(2022, 4, 20, 16, 30).getTime(),
    status: 'Запланований',
    price: 600,
    doctorName: 'Мельник Сергій Дмитрович',
  },
  {
    id: 6,
    service: 'Консультація кардіолога',
    appointmentDate: new Date(2021, 11, 2, 11, 0).getTime(),
    status: 'Завершений',
    price: 700,
    doctorName: 'Гаврилюк Олена Вікторівна',
  },
  {
    id: 7,
    service: 'Ехокардіографія',
    appointmentDate: new Date(2021, 9, 25, 14, 10).getTime(),
    status: 'Завершений',
    price: 1200,
    doctorName: 'Гаврилюк Олена Вікторівна',
  },
  {
    id: 8,
    service: 'Загальний аналіз крові',
    appointmentDate: new Date(2023, 1, 5, 8, 30).getTime(),
    status: 'Завершений',
    price: 200,
    doctorName: 'Лабораторія №1',
  },
  {
    id: 9,
    service: 'Консультація ортопеда',
    appointmentDate: new Date(2023, 1, 8, 9, 0).getTime(),
    status: 'Скасований',
    price: 400,
    doctorName: 'Стеценко Павло Анатолійович',
  },
  {
    id: 10,
    service: 'Флюорографія',
    appointmentDate: new Date(2022, 10, 15, 13, 0).getTime(),
    status: 'Запланований',
    price: 300,
    doctorName: 'Рентген-кабінет №2',
  },
  {
    id: 11,
    service: 'Консультація терапевта',
    appointmentDate: new Date(2023, 2, 1, 10, 30).getTime(),
    status: 'Завершений',
    price: 350,
    doctorName: 'Демченко Катерина Ігорівна',
  },
  {
    id: 12,
    service: 'Аналіз сечі',
    appointmentDate: new Date(2023, 2, 10, 8, 45).getTime(),
    status: 'Завершений',
    price: 150,
    doctorName: 'Лабораторія №2',
  },
  {
    id: 13,
    service: 'Консультація стоматолога',
    appointmentDate: new Date(2022, 6, 21, 15, 0).getTime(),
    status: 'Запланований',
    price: 250,
    doctorName: 'Романенко Валерій Григорович',
  },
  {
    id: 14,
    service: 'Консультація офтальмолога',
    appointmentDate: new Date(2023, 4, 3, 12, 0).getTime(),
    status: 'Завершений',
    price: 450,
    doctorName: 'Іващенко Наталія Петрівна',
  },
  {
    id: 15,
    service: 'УЗД нирок',
    appointmentDate: new Date(2023, 5, 7, 11, 15).getTime(),
    status: 'Скасований',
    price: 700,
    doctorName: 'Петров Вадим Олександрович',
  },
  {
    id: 16,
    service: 'Колоноскопія',
    appointmentDate: new Date(2023, 6, 14, 9, 30).getTime(),
    status: 'Запланований',
    price: 2000,
    doctorName: 'Василенко Олег Григорович',
  },
  {
    id: 17,
    service: 'Консультація ендокринолога',
    appointmentDate: new Date(2023, 7, 1, 14, 0).getTime(),
    status: 'Завершений',
    price: 600,
    doctorName: 'Бондаренко Ірина Миколаївна',
  },
  {
    id: 18,
    service: 'Аналіз крові на цукор',
    appointmentDate: new Date(2023, 7, 1, 8, 0).getTime(),
    status: 'Завершений',
    price: 180,
    doctorName: 'Лабораторія №3',
  },
  {
    id: 19,
    service: 'Консультація психолога',
    appointmentDate: new Date(2023, 8, 10, 16, 0).getTime(),
    status: 'Запланований',
    price: 550,
    doctorName: 'Баранов Андрій Павлович',
  },
  {
    id: 20,
    service: 'Консультація дієтолога',
    appointmentDate: new Date(2023, 9, 5, 10, 45).getTime(),
    status: 'Скасований',
    price: 500,
    doctorName: 'Гончарова Лілія Сергіївна',
  },
  {
    id: 21,
    service: 'Мамографія',
    appointmentDate: new Date(2023, 10, 20, 11, 30).getTime(),
    status: 'Запланований',
    price: 1000,
    doctorName: 'Рентген-кабінет №5',
  },
];
