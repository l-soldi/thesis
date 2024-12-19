import React, { useMemo } from 'react';
import './style.css'

export type PaginationProps = {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
    totalItems: number;
}

const noop = () => {}
const pagesOptions = [2, 5, 10, 20, 50]

const Pagination = ({ currentPage=1, itemsPerPage=5, onPageChange = noop, onItemsPerPageChange = noop, totalItems=0 } : PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = useMemo(() => [...Array(totalPages)].map((_, i) => i + 1), [totalPages]);

    if(!totalItems || totalPages === 0) return null

  return (
    <footer>
      <div className='items-per-page'>
        <label htmlFor="itemsPerPage" >
          Elementi per pagina:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          {pagesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="pagination" >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='secondary'
        >
          Precedente
        </button>
          {pages
            .filter((page) => {
                // Mostra la prima pagina, l'ultima pagina e le pagine vicine alla pagina corrente
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, visiblePages) => (
              <>
                <button
                  onClick={() => onPageChange(page)}
                  className={currentPage === page ? "" : "secondary"}
                  key={page}
                >
                  {page}
                </button>

                {/* Aggiungi ellissi dove necessario */}
                {index < visiblePages.length - 1 && visiblePages[index + 1] > page + 1 && (
                  <span key={`ellipsis-${page}`}>...</span>
                )}
              </>
    ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Successivo
        </button>
      </div>
    </footer>
  )
}

export default Pagination