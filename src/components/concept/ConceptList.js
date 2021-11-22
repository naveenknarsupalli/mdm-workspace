import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ConceptList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concepts: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://bahmni-cmm-default-rtdb.firebaseio.com/concept.json")
      .then((response) => {
        const loadedConcepts = [];

        for (const key in response.data) {
          loadedConcepts.push({
            conceptId: key,
            shortName: response.data[key].shortName,
          });
        }

        this.setState({ concepts: loadedConcepts });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.concepts.map((concept) => {
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
