import { useMemo } from 'react';
import './style.css'

export type PaginationProps = {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (perPage: number) => void;
    totalItems: number;
}

const noop = () => {}
const pagesOptions = [5, 10, 20, 50]

const Pagination = ({ currentPage=1, itemsPerPage=5, onPageChange = noop, onItemsPerPageChange = noop, totalItems=10 } : PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pages = useMemo(() => [...Array(totalPages)].map((_, i) => i + 1), [totalPages]);

  return (
    <footer>
      <div className='items-per-page'>
        <label htmlFor="itemsPerPage">
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

      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='secondary'
        >
          Precedente
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? "" : 'secondary'}
          >
            {page}
          </button>
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