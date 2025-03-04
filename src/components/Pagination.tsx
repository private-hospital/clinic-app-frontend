import '../styles/Pagination.css';
import { PaginationProps } from '../types/PaginationProps';

const Pagination = ({ setPage, page, totalPages }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const goToPage = (p: number) => {
    setPage(p);
  };

  const pagesToShow: (number | string)[] = [];

  pagesToShow.push(1);

  if (page > 3) {
    pagesToShow.push('…');
  }

  for (let p = page - 1; p <= page + 1; p++) {
    if (p > 1 && p < totalPages) {
      pagesToShow.push(p);
    }
  }

  if (page < totalPages - 2) {
    pagesToShow.push('…');
  }

  if (totalPages > 1) {
    pagesToShow.push(totalPages);
  }

  return (
    <ul className="pagination">
      <li>
        <button
          className="circle"
          onClick={handlePrev}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          &larr;
        </button>
      </li>

      {pagesToShow.map((p, idx) => {
        if (p === '…') {
          return (
            <li key={`ellipsis-${idx}`}>
              <button className="circle" disabled>
                …
              </button>
            </li>
          );
        } else {
          const pageNumber = p as number;
          const isActive = pageNumber === page;

          return (
            <li key={pageNumber}>
              <button
                className={`circle ${isActive ? 'active' : ''}`}
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        }
      })}

      <li>
        <button
          className="circle"
          onClick={handleNext}
          disabled={page === totalPages}
          aria-label="Next Page"
        >
          &rarr;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
