const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => {
            return (
              <li key={number} className="page-item">
                <button className="page-link" onClick={() => paginate(number)}>
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};
export default Pagination;
