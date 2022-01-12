import { Link } from 'react-router-dom';
import React from 'react';
import { getDrugs } from '../../api/services';

class DrugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugs: [],
      filteredDrugsOnRetired: [],
      showRetired: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    getDrugs()
      .then((response) => {
        this.setState({ drugs: response.data }, () => {
          this.setState({
            filteredDrugsOnRetired: this.state.drugs.filter((drug) => {
              return drug.retired === false;
            }),
            isLoading: false,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { showRetired, drugs } = this.state;
    if (prevState.showRetired !== showRetired) {
      if (showRetired) {
        this.setState({ filteredDrugsOnRetired: drugs });
      } else {
        this.setState({
          filteredDrugsOnRetired: this.state.drugs.filter((drug) => {
            return drug.retired === false;
          }),
        });
      }
    }
  }

  toggleRetired() {
    const { showRetired } = this.state;
    this.setState({ showRetired: !showRetired });
  }

  render() {
    const { toggleRetired } = this;
    const { filteredDrugsOnRetired, isLoading } = this.state;

    if (isLoading) return <p>Loading ...</p>;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>
                <span>Manage Concept Drugs </span>
                <button type="button" onClick={toggleRetired.bind(this)}>
                  Toggle Retired
                </button>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Strength</th>
            </tr>
          </thead>

          <tbody>
            {filteredDrugsOnRetired.map((drug) => {
              return (
                <tr key={drug.uuid}>
                  <td>
                    <Link to={`/drug/${drug.uuid}`}>{drug.name}</Link>
                  </td>
                  <td>{drug.strength}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default DrugList;
