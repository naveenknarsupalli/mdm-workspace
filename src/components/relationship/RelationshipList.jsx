/* eslint-disable no-console */
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
        const loadedRelationships = [];
        Object.keys(response.data).forEach((key) => {
          const relationship = response.data[key];
          relationship.relationshipId = key;
          loadedRelationships.push(relationship);
        });
        this.setState({ relationships: loadedRelationships });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { relationships } = this.state;

    if (relationships.length === 0) { return <p>no relationships exist. create a new one.</p>; }

    return (
      <table>
        <thead>
          <th>Current Relationship Types</th>
        </thead>
        <tbody>
          <tr>
            <td>Names</td>
            <td>Description</td>
          </tr>
          {relationships.map((relationship) => (
            <tr key={relationship.relationshipId}>
              <td>
                <Link to={`/relationship/${relationship.relationshipId}`}>
                  {relationship.aIsToB}
                  /
                  {relationship.bIsToA}
                </Link>
              </td>
              <td>{relationship.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default RelationshipList;
