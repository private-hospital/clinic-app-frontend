import { z } from 'zod';

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

export const patientEditSchema = z.object({
  lastName: z.string().min(1, 'Прізвище є обов’язковим'),
  firstName: z.string().min(1, 'Ім’я є обов’язковим'),
  middleName: z.string().optional(),
  phone: z.string().min(1, 'Номер телефону є обов’язковим'),
  email: z.string().email('Некоректна електронна пошта'),
  dob: z.string().min(1, 'Дата народження є обов’язковою'),
  sex: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Будь ласка, оберіть стать',
  }),
  benefit: z.enum(['military', 'elderly', 'disabled', 'staff_family'], {
    required_error: 'Будь ласка, оберіть пільгову групу',
  }),
});

export type PatientEditFormData = z.infer<typeof patientEditSchema>;

export const stepOneSchema = z.object({
  lastName: z.string().nonempty('Введіть прізвище'),
  firstName: z.string().nonempty('Введіть ім’я'),
  middleName: z.string().optional(),
  phone: z.string().nonempty('Введіть номер телефону'),
  email: z.string().nonempty('Введіть email').email('Неправильний формат'),
  dob: z.string().nonempty('Введіть дату народження'),
  sex: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: 'Оберіть стать' }),
  }),
});

export const stepTwoSchema = z.object({
  verificationCode: z
    .string()
    .nonempty('Введіть код підтвердження')
    .min(6, 'Закороткий код'),
});

export const stepThreeSchema = z.object({
  benefit: z.enum(['military', 'elderly', 'disabled', 'staff_family'], {
    errorMap: () => ({ message: 'Оберіть пільгову групу' }),
  }),
});

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
  {
    id: 10,
    fullname: 'Мельник Ігор Васильович',
    phone: '+380501234567',
    email: 'melnyk.ihor@example.com',
    dob: new Date(1987, 4, 15).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 11,
    fullname: 'Кравченко Дарія Петрівна',
    phone: '+380502345678',
    email: 'kravchenko.daria@example.com',
    dob: new Date(1993, 9, 2).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 12,
    fullname: 'Бойко Сергій Андрійович',
    phone: '+380503456789',
    email: 'boiko.serhiy@example.com',
    dob: new Date(1979, 0, 28).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 13,
    fullname: 'Мороз Марина Олексіївна',
    phone: '+380504567890',
    email: 'moroz.maryna@example.com',
    dob: new Date(1990, 6, 10).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 14,
    fullname: 'Ткаченко Олексій Володимирович',
    phone: '+380505678901',
    email: 'tkachenko.oleksii@example.com',
    dob: new Date(1985, 2, 19).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 15,
    fullname: 'Поліщук Світлана Ігорівна',
    phone: '+380506789012',
    email: 'polishchuk.svitlana@example.com',
    dob: new Date(1977, 11, 5).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 16,
    fullname: 'Остапенко Дмитро Іванович',
    phone: '+380507890123',
    email: 'ostapenko.dmytro@example.com',
    dob: new Date(1996, 1, 7).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 17,
    fullname: 'Романенко Анастасія Миколаївна',
    phone: '+380508901234',
    email: 'romanenko.anastasiia@example.com',
    dob: new Date(1992, 10, 22).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 18,
    fullname: 'Василенко Павло Олексійович',
    phone: '+380509012345',
    email: 'vasylenko.pavlo@example.com',
    dob: new Date(1975, 7, 16).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 19,
    fullname: 'Савченко Ірина Вікторівна',
    phone: '+380501234568',
    email: 'savchenko.iryna@example.com',
    dob: new Date(1981, 4, 1).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 20,
    fullname: 'Гаврилюк Олександр Миколайович',
    phone: '+380502345679',
    email: 'havryliuk.oleksandr@example.com',
    dob: new Date(1969, 8, 12).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 21,
    fullname: 'Клименко Катерина Олегівна',
    phone: '+380503456780',
    email: 'klymenko.kateryna@example.com',
    dob: new Date(1998, 3, 18).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 22,
    fullname: 'Пономаренко Михайло Сергійович',
    phone: '+380504567891',
    email: 'ponomarenko.mykhailo@example.com',
    dob: new Date(1974, 6, 27).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 23,
    fullname: 'Шевчук Валентина Олексіївна',
    phone: '+380505678902',
    email: 'shevchuk.valentyna@example.com',
    dob: new Date(1986, 1, 3).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 24,
    fullname: 'Соловей Максим Вадимович',
    phone: '+380506789013',
    email: 'solovey.maksym@example.com',
    dob: new Date(1991, 5, 14).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 25,
    fullname: 'Мазур Тетяна Павлівна',
    phone: '+380507890124',
    email: 'mazur.tetiana@example.com',
    dob: new Date(1983, 3, 11).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 26,
    fullname: 'Юрченко Андрій Дмитрович',
    phone: '+380508901235',
    email: 'yurchenko.andrii@example.com',
    dob: new Date(1999, 2, 8).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 27,
    fullname: 'Марченко Олена Ігорівна',
    phone: '+380509012346',
    email: 'marchenko.olena@example.com',
    dob: new Date(1976, 9, 24).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 28,
    fullname: 'Коваленко Володимир Васильович',
    phone: '+380501234569',
    email: 'kovalenko.volodymyr@example.com',
    dob: new Date(1968, 7, 2).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 29,
    fullname: 'Гриценко Дарина Юріївна',
    phone: '+380502345670',
    email: 'grytsenko.daryna@example.com',
    dob: new Date(1994, 4, 6).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 30,
    fullname: 'Захарченко Ростислав Миколайович',
    phone: '+380503456781',
    email: 'zakharchenko.rostyslav@example.com',
    dob: new Date(1972, 10, 20).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 31,
    fullname: 'Петрук Людмила Олександрівна',
    phone: '+380504567892',
    email: 'petruk.liudmyla@example.com',
    dob: new Date(1989, 6, 17).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 32,
    fullname: 'Семенюк Артем Вікторович',
    phone: '+380505678903',
    email: 'semenyuk.artem@example.com',
    dob: new Date(1997, 8, 9).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 33,
    fullname: 'Скрипка Ніна Степанівна',
    phone: '+380506789014',
    email: 'skrypka.nina@example.com',
    dob: new Date(1970, 2, 28).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 34,
    fullname: 'Шевченко Роман Володимирович',
    phone: '+380507890125',
    email: 'shevchenko.roman@example.com',
    dob: new Date(1982, 5, 5).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 35,
    fullname: 'Федоренко Анна Олегівна',
    phone: '+380508901236',
    email: 'fedorenko.anna@example.com',
    dob: new Date(1991, 11, 13).getTime(),
    sex: 'Жінка',
    benefit: 'Пільга',
  },
  {
    id: 36,
    fullname: 'Кушнір Богдан Михайлович',
    phone: '+380509012347',
    email: 'kushnir.bohdan@example.com',
    dob: new Date(1979, 4, 30).getTime(),
    sex: 'Чоловік',
    benefit: '',
  },
  {
    id: 37,
    fullname: 'Руденко Ольга Петрівна',
    phone: '+380501234570',
    email: 'rudenko.olha@example.com',
    dob: new Date(1987, 1, 25).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
  {
    id: 38,
    fullname: 'Костюк Денис Вікторович',
    phone: '+380502345671',
    email: 'kostyuk.denis@example.com',
    dob: new Date(1966, 9, 11).getTime(),
    sex: 'Чоловік',
    benefit: 'Пільга',
  },
  {
    id: 39,
    fullname: 'Лисенко Віра Миколаївна',
    phone: '+380503456782',
    email: 'lysenko.vira@example.com',
    dob: new Date(1993, 2, 14).getTime(),
    sex: 'Жінка',
    benefit: '',
  },
];
