import { Link } from 'react-router-dom';
import React from 'react';
import { getRelationshipTypes } from '../../api/services';

class RelationshipTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationshipTypes: [],
    };
  }

  componentDidMount() {
    getRelationshipTypes()
      .then((response) => {
        this.setState({ relationshipTypes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { relationshipTypes } = this.state;

    if (relationshipTypes.length === 0)
      return <p>no relationship types exist. create a new one.</p>;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Current Relationship Types</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Names</td>
              <td>Description</td>
            </tr>
            {relationshipTypes.map((relationshipType) => (
              <tr key={relationshipType.uuid}>
                <td>
                  <Link to={`/relationshipType/${relationshipType.uuid}`}>
                    {relationshipType.aisToB}/{relationshipType.bisToA}
                  </Link>
                </td>
                <td>{relationshipType.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default RelationshipTypeList;
