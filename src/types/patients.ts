export interface PatientsRegistryDto {
  entries: PatientsRegistryEntryDto[];
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PatientsRegistryEntryDto {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  dob: number;
  sex: string;
  benefit: string;
}

export const patientsTestData: PatientsRegistryEntryDto[] = [
  {
    id: 1,
    fullname: 'Панов Максим Ігорович',
    phone: '+380964269257',
    email: 'work.maksym.panov@gmail.com',
    dob: new Date(2004, 6, 7).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 2,
    fullname: 'Іванов Іван Іванович',
    phone: '+380123456789',
    email: 'ivanov@example.com',
    dob: new Date(1990, 5, 15).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 3,
    fullname: 'Сидоренко Олена Петрівна',
    phone: '+380987654321',
    email: 'sydorenko@example.com',
    dob: new Date(1985, 11, 23).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 4,
    fullname: 'Ковальчук Олександр Сергійович',
    phone: '+380112233445',
    email: 'kovalchuk@example.com',
    dob: new Date(1978, 3, 10).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 5,
    fullname: 'Дмитренко Марія Василівна',
    phone: '+380556677889',
    email: 'dmytrenko@example.com',
    dob: new Date(1995, 0, 20).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 6,
    fullname: 'Левченко Андрій Олександрович',
    phone: '+380998877665',
    email: 'levchenko@example.com',
    dob: new Date(2000, 2, 25).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 7,
    fullname: 'Новак Наталія Дмитрівна',
    phone: '+380443322110',
    email: 'novak@example.com',
    dob: new Date(1988, 8, 30).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 8,
    fullname: 'Петренко Віктор Іванович',
    phone: '+380667788990',
    email: 'petrenko@example.com',
    dob: new Date(1975, 10, 5).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 9,
    fullname: 'Гончаренко Оксана Миколаївна',
    phone: '+380334455667',
    email: 'goncharenko@example.com',
    dob: new Date(1992, 7, 12).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
];
