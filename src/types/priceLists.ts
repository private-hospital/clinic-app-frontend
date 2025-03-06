export interface PriceListFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FormValues {
  entries: Record<string, number>;
}

export enum PriceListState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface PriceListRegistryEntryDto {
  id: number;
  title: string;
  state: PriceListState;
  isArchived: boolean;
  archivationReason?: string;
  archivationDate?: number;
}

export interface PriceListRegistryDto {
  entries: PriceListRegistryEntryDto[];
  page: number;
  perPage: number;
  totalPages: number;
}

export interface CurrentPriceListDto {
  entries: CurrentPriceListEntryDto[];
}

export interface CurrentPriceListEntryDto {
  label: string;
  serviceId: number;
  price: number;
}

export interface NewPriceListDto {
  name: string;
  entries: NewPriceListEntryDto[];
}

export interface NewPriceListEntryDto {
  serviceId: number;
  price: number;
}

export const currentPriceListTestData: CurrentPriceListDto = {
  entries: [
    { label: 'УЗД судин шиї та голови', serviceId: 1, price: 750 },
    { label: 'Консультація невролога', serviceId: 2, price: 500 },
    { label: 'МРТ головного мозку', serviceId: 3, price: 2500 },
    { label: 'Рентген грудної клітини', serviceId: 4, price: 800 },
    { label: 'Консультація терапевта', serviceId: 5, price: 600 },
    { label: 'Електрокардіограма', serviceId: 6, price: 700 },
    { label: 'УЗД органів черевної порожнини', serviceId: 7, price: 900 },
    { label: 'Консультація стоматолога', serviceId: 8, price: 400 },
    { label: 'Аналіз крові', serviceId: 9, price: 200 },
    { label: 'Консультація кардіолога', serviceId: 10, price: 850 },
    { label: 'УЗД щитовидної залози', serviceId: 11, price: 550 },
    { label: 'МРТ суглобів', serviceId: 12, price: 3000 },
    { label: 'Консультація офтальмолога', serviceId: 13, price: 650 },
    { label: 'Фізіотерапія', serviceId: 14, price: 1200 },
    { label: 'Рентген кісток', serviceId: 15, price: 950 },
    { label: 'Консультація дерматолога', serviceId: 16, price: 700 },
    { label: 'УЗД нирок', serviceId: 17, price: 800 },
    { label: 'Аналіз сечі', serviceId: 18, price: 150 },
    { label: 'Консультація психолога', serviceId: 19, price: 500 },
    { label: 'Лабораторне обстеження', serviceId: 20, price: 400 },
    { label: 'УЗД органів черевної порожнини', serviceId: 21, price: 850 },
    { label: 'Консультація ендокринолога', serviceId: 22, price: 780 },
    { label: 'МРТ суглобів', serviceId: 23, price: 3200 },
    { label: 'Консультація гастроентеролога', serviceId: 24, price: 670 },
    { label: 'УЗД щитовидної залози', serviceId: 25, price: 500 },
    { label: 'Консультація ревматолога', serviceId: 26, price: 900 },
    { label: 'Рентген-обстеження', serviceId: 27, price: 850 },
    { label: 'УЗД серця', serviceId: 28, price: 750 },
    { label: 'Консультація нефролога', serviceId: 29, price: 950 },
    { label: 'Лабораторне обстеження крові', serviceId: 30, price: 600 },
    { label: 'Консультація окулиста', serviceId: 31, price: 700 },
  ],
};

export const priceListsTestData: PriceListRegistryEntryDto[] = [
  {
    id: 6,
    title: 'Новий рік 2025',
    state: PriceListState.ACTIVE,
    isArchived: false,
  },
  {
    id: 1,
    title: 'Перше півріччя 2024',
    state: PriceListState.INACTIVE,
    isArchived: true,
    archivationReason: 'Застарілий прайс-лист',
    archivationDate: new Date().getTime(),
  },
  {
    id: 2,
    title: 'Друге півріччя 2024',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 3,
    title: 'Весняна розпродаж',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 4,
    title: 'Літній сезон 2025',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 5,
    title: 'Осінній розпродаж',
    state: PriceListState.INACTIVE,
    isArchived: true,
    archivationReason: 'Сезон завершився',
    archivationDate: new Date().getTime(),
  },
  {
    id: 7,
    title: 'Зимова акція 2025',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 8,
    title: 'Весняне оновлення 2025',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 9,
    title: 'Промоція 2025',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 10,
    title: 'Розпродаж Чорної п’ятниці',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 11,
    title: 'Літня розпродажна кампанія',
    state: PriceListState.INACTIVE,
    isArchived: true,
    archivationReason: 'Завершена кампанія',
    archivationDate: new Date().getTime(),
  },
  {
    id: 12,
    title: 'Ексклюзивне весняне оновлення',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 13,
    title: 'Підготовка до свят',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 14,
    title: 'Спеціальна акція для лояльних клієнтів',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
  {
    id: 15,
    title: 'Осіннє оновлення 2025',
    state: PriceListState.INACTIVE,
    isArchived: false,
  },
];
