import React from 'react';
import { FIRST_PAGE } from '@/constants/page';

const MAX_VISIBLE_PAGES = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];
  const totalVisiblePages = Math.min(MAX_VISIBLE_PAGES, totalPages);
  let startPage = Math.max(
    currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
    FIRST_PAGE
  );
  let endPage = startPage + totalVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, FIRST_PAGE);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-4">
      {startPage > FIRST_PAGE && (
        <button
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-l"
          onClick={() => onPageChange(startPage - 1)}
        >
          Prev
        </button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-r"
          onClick={() => onPageChange(endPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
