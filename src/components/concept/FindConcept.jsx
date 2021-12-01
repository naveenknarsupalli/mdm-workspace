/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../utils/Pagination';
import { getConcepts } from '../../api/services';

class FindConcept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concepts: [],
      filteredConceptsByRetired: [],
      searchText: '',
      showRetired: false,
      showDetails: false,
      currentPage: 1,
      conceptsPerPage: 1,
    };

    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    const { concepts } = this.state;
    getConcepts()
      .then((response) => {
        const loadedConcepts = [];
        Object.keys(response.data).forEach((key) => {
          loadedConcepts.push({
            id: key,
            shortName: response.data[key].shortName,
            retired: response.data[key].retired,
          });
          this.setState({ concepts: loadedConcepts }, () => {
            const filteredConceptsByRetired = concepts.filter(
              (concept) => concept.retired === false,
            );
            this.setState({ filteredConceptsByRetired });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearchTextChange(event) {
    console.log('###');
    this.setState({ searchText: event.target.value });
  }

  handleShowRetired(event) {
    const { showRetired, concepts } = this.state;
    this.setState({ showRetired: event.target.checked }, () => {
      if (!showRetired) {
        const filteredConceptsByRetired = concepts.filter(
          (concept) => concept.retired === false,
        );
        this.setState({ filteredConceptsByRetired });
      } else {
        this.setState({ filteredConceptsByRetired: concepts });
      }
      this.setState({ currentPage: 1 });
    });
  }

  handleShowDetails(event) {
    this.setState({ showDetails: event.target.checked });
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  conceptsPerPageChangeHandler(event) {
    this.setState({ conceptsPerPage: event.target.value }, () => {
      this.setState({ currentPage: 1 });
    });
  }

  render() {
    const {
      handleSearchTextChange,
      handleShowRetired,
      handleShowDetails,
      paginate,
      conceptsPerPageChangeHandler,
    } = this;

    const {
      filteredConceptsByRetired,
      searchText,
      showRetired,
      showDetails,
      currentPage,
      conceptsPerPage,
    } = this.state;

    const filteredConcepts = searchText
                              && filteredConceptsByRetired.filter(
                                (concept) => concept.shortName.toLowerCase().includes(searchText)
                                || concept.id.includes(searchText),
                              );

    // get current concepts
    const indexOfLastConcept = currentPage * conceptsPerPage;
    const indexOfFirstConcept = indexOfLastConcept - conceptsPerPage;
    const currentConcepts = filteredConcepts.slice(
      indexOfFirstConcept,
      indexOfLastConcept,
    );

    return (
      <table>
        <thead>
          <tr>
            <td>Find Concept(s)</td>
          </tr>

          <tr>
            <td>
              <label htmlFor="searchText">
                Find a concept by typing in its name or Id:
                <input
                  type="text"
                  id="searchText"
                  name="searchText"
                  value={searchText}
                  onChange={handleSearchTextChange.bind(this)}
                />
              </label>

              <button type="button">Search</button>

              <label htmlFor="showRetired">
                Include Retired
                <input
                  type="checkbox"
                  id="showRetired"
                  name="showRetired"
                  value={showRetired}
                  onChange={handleShowRetired.bind(this)}
                />
              </label>

              <label htmlFor="showDetails">
                Show Details
                <input
                  type="checkbox"
                  id="showDetails"
                  name="showDetails"
                  value={showDetails}
                  onChange={handleShowDetails.bind(this)}
                />
              </label>
            </td>
          </tr>
        </thead>

        <tbody>
          {searchText
          && currentConcepts.map((concept) => (
            <tr key={concept.id}>
              <td>
                <Link to={`/concept/${concept.id}`}>
                  <p>{concept.shortName}</p>
                  {showDetails && <p>{concept.id}</p>}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>
              {searchText && (
                <div className="container">
                  <span>
                    Showing
                    {' '}
                    {indexOfFirstConcept + 1}
                    {' '}
                    to
                    {' '}
                    {indexOfLastConcept > filteredConcepts.length
                      ? filteredConcepts.length
                      : indexOfLastConcept}
                    {' '}
                    of
                    {' '}
                    {filteredConcepts.length}
                    {' '}
                    entries
                  </span>
                  <Pagination
                    itemsPerPage={conceptsPerPage}
                    totalItems={filteredConcepts.length}
                    paginate={paginate}
                  />
                </div>
              )}
            </td>
          </tr>
          {searchText && (
            <tr>
              Show
              <select
                name="conceptsPerPage"
                id="conceptsPerPage"
                onChange={conceptsPerPageChangeHandler.bind(this)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              entries
            </tr>
          )}
        </tfoot>
      </table>
    );
  }
}
export default FindConcept;
