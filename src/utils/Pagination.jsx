import React from 'react';
import PropTypes from 'prop-types';

const Pagination = function ({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.length > 1
        && pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsPerPage: PropTypes.string.isRequired,
  totalItems: PropTypes.string.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
