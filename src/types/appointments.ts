export interface AppointmentsRegistryEntryDto {
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

export const appointmentsTestData: AppointmentsRegistryEntryDto[] = [
  {
    service: 'УЗД судин шиї та голови',
    appointmentDate: new Date(2020, 0, 1, 14, 30).getTime(),
    status: 'Завершений',
    price: 900.0,
    doctorName: 'Панов Максим Ігорович',
  },
  {
    service: 'Консультація невролога',
    appointmentDate: new Date(2021, 2, 15, 10, 0).getTime(),
    status: 'Запланований',
    price: 500,
    doctorName: 'Сидоренко Марія Василівна',
  },
  {
    service: 'МРТ головного мозку',
    appointmentDate: new Date(2021, 5, 5, 9, 15).getTime(),
    status: 'Завершений',
    price: 2500,
    doctorName: 'Іваненко Олег Петрович',
  },
  {
    service: 'УЗД органів черевної порожнини',
    appointmentDate: new Date(2022, 3, 12, 13, 45).getTime(),
    status: 'Скасований',
    price: 800,
    doctorName: 'Коваленко Світлана Андріївна',
  },
  {
    service: 'Рентген хребта',
    appointmentDate: new Date(2022, 4, 20, 16, 30).getTime(),
    status: 'Запланований',
    price: 600,
    doctorName: 'Мельник Сергій Дмитрович',
  },
  {
    service: 'Консультація кардіолога',
    appointmentDate: new Date(2021, 11, 2, 11, 0).getTime(),
    status: 'Завершений',
    price: 700,
    doctorName: 'Гаврилюк Олена Вікторівна',
  },
  {
    service: 'Ехокардіографія',
    appointmentDate: new Date(2021, 9, 25, 14, 10).getTime(),
    status: 'Завершений',
    price: 1200,
    doctorName: 'Гаврилюк Олена Вікторівна',
  },
  {
    service: 'Загальний аналіз крові',
    appointmentDate: new Date(2023, 1, 5, 8, 30).getTime(),
    status: 'Завершений',
    price: 200,
    doctorName: 'Лабораторія №1',
  },
  {
    service: 'Консультація ортопеда',
    appointmentDate: new Date(2023, 1, 8, 9, 0).getTime(),
    status: 'Скасований',
    price: 400,
    doctorName: 'Стеценко Павло Анатолійович',
  },
  {
    service: 'Флюорографія',
    appointmentDate: new Date(2022, 10, 15, 13, 0).getTime(),
    status: 'Запланований',
    price: 300,
    doctorName: 'Рентген-кабінет №2',
  },
  {
    service: 'Консультація терапевта',
    appointmentDate: new Date(2023, 2, 1, 10, 30).getTime(),
    status: 'Завершений',
    price: 350,
    doctorName: 'Демченко Катерина Ігорівна',
  },
  {
    service: 'Аналіз сечі',
    appointmentDate: new Date(2023, 2, 10, 8, 45).getTime(),
    status: 'Завершений',
    price: 150,
    doctorName: 'Лабораторія №2',
  },
  {
    service: 'Консультація стоматолога',
    appointmentDate: new Date(2022, 6, 21, 15, 0).getTime(),
    status: 'Запланований',
    price: 250,
    doctorName: 'Романенко Валерій Григорович',
  },
  {
    service: 'Консультація офтальмолога',
    appointmentDate: new Date(2023, 4, 3, 12, 0).getTime(),
    status: 'Завершений',
    price: 450,
    doctorName: 'Іващенко Наталія Петрівна',
  },
  {
    service: 'УЗД нирок',
    appointmentDate: new Date(2023, 5, 7, 11, 15).getTime(),
    status: 'Скасований',
    price: 700,
    doctorName: 'Петров Вадим Олександрович',
  },
  {
    service: 'Колоноскопія',
    appointmentDate: new Date(2023, 6, 14, 9, 30).getTime(),
    status: 'Запланований',
    price: 2000,
    doctorName: 'Василенко Олег Григорович',
  },
  {
    service: 'Консультація ендокринолога',
    appointmentDate: new Date(2023, 7, 1, 14, 0).getTime(),
    status: 'Завершений',
    price: 600,
    doctorName: 'Бондаренко Ірина Миколаївна',
  },
  {
    service: 'Аналіз крові на цукор',
    appointmentDate: new Date(2023, 7, 1, 8, 0).getTime(),
    status: 'Завершений',
    price: 180,
    doctorName: 'Лабораторія №3',
  },
  {
    service: 'Консультація психолога',
    appointmentDate: new Date(2023, 8, 10, 16, 0).getTime(),
    status: 'Запланований',
    price: 550,
    doctorName: 'Баранов Андрій Павлович',
  },
  {
    service: 'Консультація дієтолога',
    appointmentDate: new Date(2023, 9, 5, 10, 45).getTime(),
    status: 'Скасований',
    price: 500,
    doctorName: 'Гончарова Лілія Сергіївна',
  },
  {
    service: 'Мамографія',
    appointmentDate: new Date(2023, 10, 20, 11, 30).getTime(),
    status: 'Запланований',
    price: 1000,
    doctorName: 'Рентген-кабінет №5',
  },
];
