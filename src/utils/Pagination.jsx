import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

    <nav>
      <ul className="pagination">
        {pageNumbers.length > 1
          && pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button type="button" className="page-link" onClick={() => paginate(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>;
};
export default Pagination;
