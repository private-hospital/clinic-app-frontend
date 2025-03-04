export interface MedicalCardDto {
  entries: MedicalCardRecordDto[];
}

export interface MedicalCardRecordDto {
  title: string;
  diagnosis?: string; // defined if type === 'DIAGNOSIS'
  analysisResults?: string[]; // defined if type === 'ANALYSIS_RESULTS'
  examinations?: string[]; // defined if type === 'NECESSARY_EXAMINATIONS'
  type: 'DIAGNOSIS' | 'NECESSARY_EXAMINATIONS' | 'ANALYSIS_RESULTS';
  date: number;
}

export const medicalCardRecordsTestData: MedicalCardRecordDto[] = [
  {
    title: 'Діагноз',
    diagnosis: 'Остеохондроз шиї',
    type: 'DIAGNOSIS',
    date: new Date(2025, 2, 4).getTime(), // 04.03.2025
  },
  {
    title: 'Результати УЗД',
    analysisResults: ['Результат_УЗД_Шевченко.pdf'],
    type: 'ANALYSIS_RESULTS',
    date: new Date(2025, 2, 3).getTime(), // 03.03.2025
  },
  {
    title: 'Результати рентгену',
    analysisResults: ['Результат_рентген_Шевченко.pdf'],
    type: 'ANALYSIS_RESULTS',
    date: new Date(2025, 2, 2).getTime(), // 02.03.2025
  },
  {
    title: 'Первинний огляд пацієнта',
    examinations: ['УЗД судин голови та шиї', 'Рентген'],
    type: 'NECESSARY_EXAMINATIONS',
    date: new Date(2025, 2, 1).getTime(), // 01.03.2025
  },
];
