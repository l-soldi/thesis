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
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginBottom: "10px", display: "flex" }}>
        <label htmlFor="itemsPerPage" style={{ marginRight: "10px" }}>
          Items per page:
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

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ margin: "0 5px" }}
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              margin: "0 5px",
              backgroundColor: currentPage === page ? "blue" : "white",
              color: currentPage === page ? "white" : "black",
              border: "1px solid black",
              borderRadius: "4px",
              padding: "5px 10px",
            }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ margin: "0 5px" }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination