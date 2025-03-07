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
  phone: z
    .string()
    .min(1, 'Номер телефону є обов’язковим')
    .regex(/^\+380\d{9}$/, 'Некоректний формат номера телефону'),
  email: z.string().email('Некоректна електронна пошта'),
  dob: z.string().min(1, 'Дата народження є обов’язковою'),
  sex: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Будь ласка, оберіть стать',
  }),
  benefit: z.enum(['military', 'elderly', 'disabled', 'staff_family', '']),
});

export type PatientEditFormData = z.infer<typeof patientEditSchema>;

export const stepOneSchema = z.object({
  lastName: z.string().nonempty('Введіть прізвище'),
  firstName: z.string().nonempty('Введіть ім’я'),
  middleName: z.string().optional(),
  phone: z
    .string()
    .nonempty('Введіть номер телефону')
    .regex(/^\+380\d{9}$/, 'Некоректний формат номера телефону'),
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
  benefit: z.enum(['military', 'elderly', 'disabled', 'staff_family', '']),
});
