import { z } from 'zod';

export interface MedicalCardDto {
  entries: MedicalCardRecordDto[];
}

export enum MedicalCardRecordTypes {
  DIAGNOSIS = 'DIAGNOSIS',
  NECESSARY_EXAMINATIONS = 'NECESSARY_EXAMINATIONS',
  ANALYSIS_RESULTS = 'ANALYSIS_RESULTS',
}

export interface MedicalCardRecordDto {
  title: string;
  diagnosis?: string; // defined if type === 'DIAGNOSIS'
  analysisResults?: string[]; // defined if type === 'ANALYSIS_RESULTS'
  examinations?: string[]; // defined if type === 'NECESSARY_EXAMINATIONS'
  type: MedicalCardRecordTypes;
  date: number;
}

export const createMedicalCardRecordSchema = z
  .object({
    title: z.string().nonempty('Назва запису є обов’язковою'),
    type: z.nativeEnum(MedicalCardRecordTypes, {
      errorMap: () => ({ message: 'Оберіть тип запису' }),
    }),
    diagnosis: z.string().optional(),
    analysisResults: z
      .instanceof(FileList)
      .optional()
      .refine(
        (files) => !files || (files.length > 0 && files.length <= 5),
        'Необхідно завантажити від 1 до 5 PDF файлів',
      ),
    examinations: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      if (data.type === MedicalCardRecordTypes.DIAGNOSIS) {
        return !!data.diagnosis?.trim();
      }
      if (data.type === MedicalCardRecordTypes.ANALYSIS_RESULTS) {
        return data.analysisResults && data.analysisResults.length > 0;
      }
      if (data.type === MedicalCardRecordTypes.NECESSARY_EXAMINATIONS) {
        return data.examinations && data.examinations.length > 0;
      }
      return true;
    },
    {
      message: 'Обов’язкове поле не заповнене або не відповідає вимогам',
      path: ['diagnosis', 'analysisResults', 'examination'],
    },
  );

export type CreateMedicalCardRecordDto = z.infer<
  typeof createMedicalCardRecordSchema
>;

export const medicalCardRecordsTestData: MedicalCardRecordDto[] = [
  {
    title: 'Діагноз',
    diagnosis: 'Остеохондроз шиї',
    type: MedicalCardRecordTypes.DIAGNOSIS,
    date: new Date(2025, 2, 4).getTime(), // 04.03.2025
  },
  {
    title: 'Результати УЗД',
    analysisResults: ['Результат_УЗД_Шевченко.pdf'],
    type: MedicalCardRecordTypes.ANALYSIS_RESULTS,
    date: new Date(2025, 2, 3).getTime(), // 03.03.2025
  },
  {
    title: 'Результати рентгену',
    analysisResults: ['Результат_рентген_Шевченко.pdf'],
    type: MedicalCardRecordTypes.ANALYSIS_RESULTS,
    date: new Date(2025, 2, 2).getTime(), // 02.03.2025
  },
  {
    title: 'Первинний огляд пацієнта',
    examinations: ['УЗД судин голови та шиї', 'Рентген'],
    type: MedicalCardRecordTypes.NECESSARY_EXAMINATIONS,
    date: new Date(2025, 2, 1).getTime(), // 01.03.2025
  },
];
