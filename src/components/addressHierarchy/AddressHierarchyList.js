import { Link } from "react-router-dom";
import React, { Component, Fragment } from "react";
import { getAddressHierarchies } from "../../api/services";
import _ from "lodash";

// in 3rd: 2, 4, 6
class AddressHierarchyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressHierarchies: []
    };
    this.EXAMPLE_ENTRIES = ["Bihar", "Araria", "Bhargama", "Baija Patti"];
  }

  componentDidMount() {
    getAddressHierarchies()
      .then((response) => {
        this.setState({ addressHierarchies: response.data });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  render() {
    const { EXAMPLE_ENTRIES } = this;
    const { addressHierarchies } = this.state;

    if (_.isEqual(0, _.size(addressHierarchies)))
      return <p>no address hierarchies exist. create a new one.</p>;

    return (
      <Fragment>
        <table>
          <thead>
            <tr>
              <th>Level</th>
              <th>Name</th>
              <th>Example Entry</th>
              <th>Mapped Address Field</th>
              <th>Required</th>
              {/* <th></th> */}
            </tr>
          </thead>

          <tbody>
            {addressHierarchies.map((addressHierarchy, index) => (
              <tr key={addressHierarchy.uuid}>
                <td>{index + 1}</td>
                <td>{addressHierarchy.name}</td>
                <td>{EXAMPLE_ENTRIES[index]}</td>
                <td>{addressHierarchy.addressField}</td>
                <td>{addressHierarchy.required === true ? "Yes" : "No"}</td>
                {/* <td>
                  {index > 3 && (
                    <Link to={`/addressHierarchy/${addressHierarchy.uuid}`}>
                      Edit
                    </Link>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
export default AddressHierarchyList;
