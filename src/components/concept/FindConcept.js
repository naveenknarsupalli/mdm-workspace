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
  }

  componentDidMount() {
    this.loadAllConcepts();
  }

  loadAllConcepts() {
    getConcepts()
      .then((response) => {
        const loadedConcepts = [];
        for (const key in response.data) {
          loadedConcepts.push({
            id: key,
            shortName: response.data[key].shortName,
            retired: response.data[key].retired,
          });
          this.setState({ concepts: loadedConcepts }, () => {
            const filteredConceptsByRetired = this.state.concepts.filter(
              (concept) => {
                return concept.retired === false;
              }
            );
            this.setState({
              filteredConceptsByRetired: filteredConceptsByRetired,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearchTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleShowRetired(event) {
    this.setState({ showRetired: event.target.checked }, () => {
      if (!this.state.showRetired) {
        const filteredConceptsByRetired = this.state.concepts.filter(
          (concept) => {
            return concept.retired === false;
          }
        );
        this.setState({ filteredConceptsByRetired: filteredConceptsByRetired });
      } else {
        this.setState({ filteredConceptsByRetired: this.state.concepts });
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

    const filteredConcepts =
      searchText &&
      filteredConceptsByRetired.filter((concept) => {
        return (
          concept.shortName.toLowerCase().includes(searchText) ||
          concept.id.includes(searchText)
        );
      });

    // get current concepts
    const indexOfLastConcept = currentPage * conceptsPerPage;
    const indexOfFirstConcept = indexOfLastConcept - conceptsPerPage;
    const currentConcepts = filteredConcepts.slice(
      indexOfFirstConcept,
      indexOfLastConcept
    );

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <td>Find Concept(s)</td>
            </tr>
            <tr>
              <td>
                <label htmlFor="searchText">
                  Find a concept by typing in its name or Id:
                </label>{' '}
                <input
                  type="text"
                  id="searchText"
                  name="searchText"
                  value={searchText}
                  onChange={handleSearchTextChange.bind(this)}
                />
                <button type="button">Search</button>{' '}
                <input
                  type="checkbox"
                  id="showRetired"
                  name="showRetired"
                  value={showRetired}
                  onChange={handleShowRetired.bind(this)}
                />
                <label htmlFor="showRetired">Include Retired</label>{' '}
                <input
                  type="checkbox"
                  id="showDetails"
                  name="showDetails"
                  value={showDetails}
                  onChange={handleShowDetails.bind(this)}
                />
                <label htmlFor="showDetails">Show Details</label>
              </td>
            </tr>
          </thead>
          <tbody>
            {searchText &&
              currentConcepts.map((concept) => {
                return (
                  <tr key={concept.id}>
                    <td>
                      <Link to={`/concept/${concept.id}`}>
                        <p>{concept.shortName}</p>
                        {showDetails && <p>{concept.id}</p>}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                {searchText && (
                  <div className="container">
                    <span>
                      Showing {indexOfFirstConcept + 1} to{' '}
                      {indexOfLastConcept > filteredConcepts.length
                        ? filteredConcepts.length
                        : indexOfLastConcept}{' '}
                      of {filteredConcepts.length} entries
                    </span>
                    <Pagination
                      itemsPerPage={conceptsPerPage}
                      totalItems={filteredConcepts.length}
                      paginate={paginate.bind(this)}
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
      </React.Fragment>
    );
  }
}
export default FindConcept;
