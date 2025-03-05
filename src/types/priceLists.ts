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
