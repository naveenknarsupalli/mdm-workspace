/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { getConcepts } from '../../api/services';

class ConceptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concepts: [],
    };
  }

  componentDidMount() {
    getConcepts()
      .then((response) => {
        const loadedConcepts = [];
        Object.keys(response.data).forEach((key) => {
          loadedConcepts.push({
            conceptId: key,
            shortName: response.data[key].shortName,
          });
        });

        this.setState({ concepts: loadedConcepts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { concepts } = this.state;
    return (
      <ul>
        {concepts.map((concept) => (
          <li key={concept.conceptId}>
            <Link to={`/concept/${concept.conceptId}`}>
              {concept.shortName}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default ConceptList;
