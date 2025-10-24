import React from 'react';
import './Pagination.css'; 

interface PaginationProps {
  total: number;    
  page: number;     
  perPage: number; 
  onPage: (p: number) => void; 
}

export const Pagination: React.FC<PaginationProps> = ({ total, page, perPage, onPage }) => {
  const pages = Math.ceil(total / perPage);

  if (pages <= 1) {
    return null;
  }

  const items = [];
  for (let p = 1; p <= pages; p++) {
    items.push(
      <button
        key={p}
        className="pagination-button" 
        onClick={() => onPage(p)}
        disabled={p === page} 
      >
        {p} {}
      </button>
    );
  }

  return <div className="pagination-container">{items}</div>;
};
