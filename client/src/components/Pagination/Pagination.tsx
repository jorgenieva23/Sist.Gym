import React from "react";
import getPaginationItems from "./getPaginationItems";
import PageLink from "./PaginationLink";

export type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    maxLength,
    setCurrentPage,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageNumber = getPaginationItems(currentPage, totalPages, maxLength);
  
    return (
      <nav className="flex flex-wrap" aria-label="flex flex-wrap">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </PageLink>
        {pageNumber.map((pageNumber, idx) => (
          <PageLink
            key={idx}
            active={currentPage === pageNumber}
            onClick={() => !isNaN(pageNumber) && setCurrentPage(pageNumber)}
          >
            {!isNaN(pageNumber) ? pageNumber : "..."}
          </PageLink>
        ))}
        <PageLink
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </PageLink>
      </nav>
    );
  };

export default Pagination;
