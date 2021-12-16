import { Link } from 'react-router-dom';
import React from 'react';
import { getPersonAttributeTypes } from '../../api/services';

class PersonAttributeTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personAttributeTypes: [],
    };
  }

  componentDidMount() {
    getPersonAttributeTypes()
      .then((response) => {
        this.setState({ personAttributeTypes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displaySearchable(searchable) {
    return searchable === true ? 'Yes' : '';
  }

  render() {
    const { personAttributeTypes } = this.state;
    const { displaySearchable } = this;

    if (personAttributeTypes.length === 0)
      return <p>no Person Attribute Types exist. create a new one.</p>;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>AttributeTypes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Name</td>
              <td>Format</td>
              <td>Searchable</td>
              <td>Description</td>
              <td>Edit privilege</td>
            </tr>
            {personAttributeTypes.map((personAttributeType) => (
              <tr key={personAttributeType.personAttributeTypeId}>
                <td>
                  <Link to={`/personAttributeType/${personAttributeType.uuid}`}>
                    {personAttributeType.name}
                  </Link>
                </td>
                <td>{personAttributeType.format}</td>
                <td>{displaySearchable(personAttributeType.searchable)}</td>
                <td>{personAttributeType.description}</td>
                <td>{personAttributeType.editPrevilige}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default PersonAttributeTypeList;
