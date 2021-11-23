import React from "react";
import { Link } from "react-router-dom";
import { getDrugs } from "../../api/services";

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

        for (const key in response.data) {
          loadedDrugs.push({
            drugId: key,
            name: response.data[key].name,
            strength: response.data[key].strength,
            retired: response.data[key].retired,
          });
        }
        this.setState({ drugs: loadedDrugs }, () => {
          const filteredDrugsOnRetired = this.state.drugs.filter((drug) => {
            return drug.retired === false;
          });
          this.setState({ filteredDrugsOnRetired: filteredDrugsOnRetired });
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
        const filteredDrugsOnRetired = this.state.drugs.filter((drug) => {
          return drug.retired === false;
        });
        this.setState({ filteredDrugsOnRetired: filteredDrugsOnRetired });
      }
    }
  }

  toggleRetired() {
    this.setState({ showRetired: !this.state.showRetired });
  }

  render() {
    const { toggleRetired } = this;

    return (
      <React.Fragment>
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

            {this.state.filteredDrugsOnRetired.map((drug) => {
              return (
                <tr key={drug.drugId}>
                  <td>
                    <Link to={`/drug/${drug.drugId}`}>{drug.name}</Link>
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
