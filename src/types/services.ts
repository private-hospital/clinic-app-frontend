export interface ServiceRegistryEntryDto {
  id: number;
  title: string;
  price: number;
  count: number;
  isArchived: boolean;
}

export interface ServiceRegistryDto {
  entries: ServiceRegistryEntryDto[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const serviceRegistryTestData: ServiceRegistryEntryDto[] = [
  {
    id: 1,
    title: 'УЗД судин шиї та голови',
    price: 750.0,
    count: 425,
    isArchived: true,
  },
  {
    id: 2,
    title: 'Консультація невролога',
    price: 500.0,
    count: 300,
    isArchived: false,
  },
  {
    id: 3,
    title: 'МРТ головного мозку',
    price: 2500.0,
    count: 150,
    isArchived: true,
  },
  {
    id: 4,
    title: 'Рентген грудної клітини',
    price: 800.0,
    count: 200,
    isArchived: false,
  },
  {
    id: 5,
    title: 'Консультація терапевта',
    price: 600.0,
    count: 350,
    isArchived: true,
  },
  {
    id: 6,
    title: 'Електрокардіограма',
    price: 700.0,
    count: 250,
    isArchived: true,
  },
  {
    id: 7,
    title: 'УЗД органів черевної порожнини',
    price: 900.0,
    count: 180,
    isArchived: false,
  },
  {
    id: 8,
    title: 'Консультація стоматолога',
    price: 400.0,
    count: 320,
    isArchived: false,
  },
  {
    id: 9,
    title: 'Аналіз крові',
    price: 200.0,
    count: 500,
    isArchived: false,
  },
  {
    id: 10,
    title: 'Консультація кардіолога',
    price: 850.0,
    count: 100,
    isArchived: false,
  },
  {
    id: 11,
    title: 'УЗД щитовидної залози',
    price: 550.0,
    count: 220,
    isArchived: false,
  },
  {
    id: 12,
    title: 'МРТ суглобів',
    price: 3000.0,
    count: 80,
    isArchived: false,
  },
  {
    id: 13,
    title: 'Консультація офтальмолога',
    price: 650.0,
    count: 270,
    isArchived: false,
  },
  {
    id: 14,
    title: 'Фізіотерапія',
    price: 1200.0,
    count: 130,
    isArchived: false,
  },
  {
    id: 15,
    title: 'Рентген кісток',
    price: 950.0,
    count: 310,
    isArchived: false,
  },
  {
    id: 16,
    title: 'Консультація дерматолога',
    price: 700.0,
    count: 240,
    isArchived: false,
  },
  {
    id: 17,
    title: 'УЗД нирок',
    price: 800.0,
    count: 190,
    isArchived: false,
  },
  {
    id: 18,
    title: 'Аналіз сечі',
    price: 150.0,
    count: 400,
    isArchived: false,
  },
  {
    id: 19,
    title: 'Консультація психолога',
    price: 500.0,
    count: 210,
    isArchived: false,
  },
  {
    id: 20,
    title: 'Лабораторне обстеження',
    price: 400.0,
    count: 330,
    isArchived: false,
  },
  {
    id: 21,
    title: 'УЗД органів черевної порожнини',
    price: 850.0,
    count: 160,
    isArchived: false,
  },
  {
    id: 22,
    title: 'Консультація ендокринолога',
    price: 780.0,
    count: 140,
    isArchived: false,
  },
  {
    id: 23,
    title: 'МРТ суглобів',
    price: 3200.0,
    count: 75,
    isArchived: false,
  },
  {
    id: 24,
    title: 'Консультація гастроентеролога',
    price: 670.0,
    count: 230,
    isArchived: false,
  },
  {
    id: 25,
    title: 'УЗД щитовидної залози',
    price: 500.0,
    count: 300,
    isArchived: false,
  },
  {
    id: 26,
    title: 'Консультація ревматолога',
    price: 900.0,
    count: 190,
    isArchived: false,
  },
  {
    id: 27,
    title: 'Рентген-обстеження',
    price: 850.0,
    count: 210,
    isArchived: false,
  },
  {
    id: 28,
    title: 'УЗД серця',
    price: 750.0,
    count: 220,
    isArchived: false,
  },
  {
    id: 29,
    title: 'Консультація нефролога',
    price: 950.0,
    count: 180,
    isArchived: false,
  },
  {
    id: 30,
    title: 'Лабораторне обстеження крові',
    price: 600.0,
    count: 250,
    isArchived: false,
  },
  {
    id: 31,
    title: 'Консультація окулиста',
    price: 700.0,
    count: 300,
    isArchived: false,
  },
];
