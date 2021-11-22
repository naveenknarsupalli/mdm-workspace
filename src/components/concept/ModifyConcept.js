import React, { Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class ModifyConcept extends React.Component {
  constructor(props) {
    super(props);
    const initialConceptState = {
      shortName: "",
      description: "",
      retireReason: "",
      retired: false,
    };
    this.state = {
      concept: initialConceptState,
      redirect: null,
      conceptId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    const { conceptId } = this.state;
    if (conceptId !== "add") {
      axios
        .get(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`
        )
        .then((response) => {
          this.setState({
            concept: {
              shortName: response.data.shortName,
              description: response.data.description,
              retireReason: response.data.retireReason,
              retired: response.data.retired,
            },
          });
        })
        .catch((error) => console.log(error));
    }
  }

  unretire(event) {
    event.preventDefault();
    const { concept, conceptId } = this.state;
    concept.retired = false;
    this.setState({ concept: concept }, () => {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`,
          this.state.concept
        )
        .then()
        .catch((error) => console.log(error));
    });
  }

  shortNameChangeHandler(event) {
    const { concept } = this.state;
    concept.shortName = event.target.value;
    this.setState({ concept: concept });
  }

  descriptionChangeHandler(event) {
    const { concept } = this.state;
    concept.description = event.target.value;
    this.setState({ concept: concept });
  }

  saveConcept(event) {
    event.preventDefault();

    const { conceptId } = this.state;
    if (conceptId === "add") {
      axios
        .post(
          "https://bahmni-cmm-default-rtdb.firebaseio.com/concept.json",
          this.state.concept
        )
        .then(() => {
          this.setState({ redirect: "/concept" });
        })
        .catch((error) => console.log(error));
    } else {
      console.log(this.state.concept);
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`,
          this.state.concept
        )
        .then(() => {
          this.setState({ redirect: "/concept" });
        })
        .catch((error) => console.log(error));
    }
  }

  saveConceptAndContinue(event) {
    event.preventDefault();

    const { conceptId } = this.state;
    if (conceptId === "add") {
      axios
        .post(
          "https://bahmni-cmm-default-rtdb.firebaseio.com/concept.json",
          this.state.concept
        )
        .then((response) => {
          this.setState({ conceptId: response.data.name });
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`,
          this.state.concept
        )
        .then()
        .catch((error) => console.log(error));
    }
  }

  cancelConcept(event) {
    event.preventDefault();
    this.setState({ redirect: "/concept" });
  }

  deleteConcept(event) {
    event.preventDefault();
    const { conceptId } = this.state;
    axios
      .delete(
        `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`
      )
      .then(() => {
        this.setState({ redirect: "/concept" });
      })
      .catch((error) => console.log(error));
  }

  retireReasonChangeHandler(event) {
    const { concept } = this.state;
    concept.retireReason = event.target.value;
    this.setState({ concept: concept });
  }

  retireConcept(event) {
    event.preventDefault();
    const { concept, conceptId } = this.state;
    concept.retired = true;
    this.setState({ concept: concept }, () => {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/concept/${conceptId}.json`,
          this.state.concept
        )
        .then()
        .catch((error) => console.log(error));
    });
  }

  render() {
    const {
      unretire,
      shortNameChangeHandler,
      descriptionChangeHandler,
      saveConcept,
      saveConceptAndContinue,
      cancelConcept,
      deleteConcept,
      retireReasonChangeHandler,
      retireConcept,
    } = this;

    const { concept, redirect, conceptId } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <Fragment>
        {conceptId !== "add" && concept.retired && (
          <div>
            <p>
              This concept is retired by (user) (retiredDate) - Retired from
              user interface
            </p>
            <button type="button" onClick={unretire.bind(this)}>
              Unretire
            </button>
          </div>
        )}

        <form>
          <label htmlFor="shortName">Short Name: </label>
          <input
            type="text"
            id="shortName"
            name="shortName"
            onChange={shortNameChangeHandler.bind(this)}
            value={concept.shortName}
          />
          <br />

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={descriptionChangeHandler.bind(this)}
            value={concept.description}
          />
          <br />

          <button type="button" onClick={saveConcept.bind(this)}>
            Save Concept
          </button>
          <button type="button" onClick={saveConceptAndContinue.bind(this)}>
            Save and Continue
          </button>
          <button type="button" onClick={cancelConcept.bind(this)}>
            Cancel
          </button>
          {conceptId !== "add" && (
            <button type="button" onClick={deleteConcept.bind(this)}>
              Delete
            </button>
          )}
        </form>

        {conceptId !== "add" && !concept.retired && (
          <div>
            <hr />
            <p>Retire Concept</p>
            <label htmlFor="retireReason">Reason: </label>
            <input
              type="text"
              id="retireReason"
              name="retireReason"
              onChange={retireReasonChangeHandler.bind(this)}
              value={concept.retireReason}
            />
            <br />

            <button type="button" onClick={retireConcept.bind(this)}>
              Retire
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withRouter(ModifyConcept);
