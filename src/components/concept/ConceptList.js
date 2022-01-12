import { Link } from 'react-router-dom';
import React from 'react';
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
        this.setState({ concepts: response.data }, () => {
          console.log('concepts', this.state.concepts);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { concepts } = this.state;
    return (
      <React.Fragment>
        <ul>
          {concepts.map((concept) => {
            return (
              <li key={concept.conceptId}>
                <Link to={`/concept/${concept.conceptId}`}>
                  {concept.shortName}
                </Link>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default ConceptList;
