/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { getDrugs } from '../../api/services';

class DrugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugs: [],
      filteredDrugsOnRetired: [],
      showRetired: false,
    };
  }

  componentDidMount() {
    getDrugs()
      .then((response) => {
        const loadedDrugs = [];

        Object.keys(response.data).forEach((key) => {
          loadedDrugs.push({
            drugId: key,
            name: response.data[key].name,
            strength: response.data[key].strength,
            retired: response.data[key].retired,
          });
        });

        this.setState({ drugs: loadedDrugs }, () => {
          const { drugs } = this.state;
          const filteredDrugsOnRetired = drugs.filter(
            (drug) => drug.retired === false
          );
          this.setState({ filteredDrugsOnRetired });
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
        const filteredDrugsOnRetired = drugs.filter(
          (drug) => drug.retired === false
        );
        this.setState({ filteredDrugsOnRetired });
      }
    }
  }

  toggleRetired() {
    const { showRetired } = this.state;
    this.setState({ showRetired: !showRetired });
  }

  render() {
    const { toggleRetired } = this;
    const { filteredDrugsOnRetired } = this.state;

    return (
      <table>
        <thead>
          <th>
            <span>Manage Concept Drugs </span>
            <button type="button" onClick={toggleRetired.bind(this)}>
              Toggle Retired
            </button>
          </th>
        </thead>

        <tbody>
          <tr>
            <td>Name</td>
            <td>Strength</td>
          </tr>

          {filteredDrugsOnRetired.map((drug) => (
            <tr key={drug.drugId}>
              <td>
                <Link to={`/drug/${drug.drugId}`}>{drug.name}</Link>
              </td>
              <td>{drug.strength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default DrugList;
