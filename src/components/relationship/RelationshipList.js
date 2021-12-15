import React from 'react';
import { Link } from 'react-router-dom';
import { getRelationships } from '../../api/services';

class RelationshipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationships: [],
    };
  }

  componentDidMount() {
    getRelationships()
      .then((response) => {
        this.setState({ relationships: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { relationships } = this.state;

    if (relationships.length === 0)
      return <p>no relationships exist. create a new one.</p>;

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
            {relationships.map((relationship) => (
              <tr key={relationship.uuid}>
                <td>
                  <Link to={`/relationship/${relationship.uuid}`}>
                    {relationship.aisToB}/{relationship.bisToA}
                  </Link>
                </td>
                <td>{relationship.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default RelationshipList;
