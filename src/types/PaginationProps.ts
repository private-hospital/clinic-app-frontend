import React from 'react';

export interface PaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
}
