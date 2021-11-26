/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  deleteConceptById,
  getConceptById,
  postConcept,
  putConceptById,
} from '../../api/services';

class ModifyConcept extends React.Component {
  constructor(props) {
    super(props);
    const initialConceptState = {
      shortName: '',
      description: '',
      retireReason: '',
      retired: false,
    };
    this.state = {
      concept: initialConceptState,
      redirect: null,
    };

    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.conceptId = id;
  }

  componentDidMount() {
    const { conceptId } = this;
    if (conceptId !== 'add') {
      getConceptById(conceptId)
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
    const { conceptId } = this;
    const { concept } = this.state;
    concept.retired = false;
    this.setState({ concept }, () => {
      putConceptById(conceptId, concept)
        .then()
        .catch((error) => console.log(error));
    });
  }

  shortNameChangeHandler(event) {
    const { concept } = this.state;
    concept.shortName = event.target.value;
    this.setState({ concept });
  }

  descriptionChangeHandler(event) {
    const { concept } = this.state;
    concept.description = event.target.value;
    this.setState({ concept });
  }

  saveConcept(event) {
    event.preventDefault();
    const { conceptId } = this;
    const { concept } = this.state;
    if (conceptId === 'add') {
      postConcept(concept)
        .then(() => {
          this.setState({ redirect: '/concept' });
        })
        .catch((error) => console.log(error));
    } else {
      putConceptById(conceptId, concept)
        .then(() => {
          this.setState({ redirect: '/concept' });
        })
        .catch((error) => console.log(error));
    }
  }

// conceptId -> TODO

  saveConceptAndContinue(event) {
    event.preventDefault();
    const { conceptId } = this;
    const { concept } = this.state;
    if (conceptId === 'add') {
      postConcept(concept)
        .then((response) => {
          this.setState({ conceptId: response.data.name });
        })
        .catch((error) => console.log(error));
    } else {
      putConceptById(conceptId, concept)
        .then()
        .catch((error) => console.log(error));
    }
  }

  cancelConcept(event) {
    event.preventDefault();
    this.setState({ redirect: '/concept' });
  }

  deleteConcept(event) {
    event.preventDefault();
    const { conceptId } = this;
    deleteConceptById(conceptId)
      .then(() => {
        this.setState({ redirect: '/concept' });
      })
      .catch((error) => console.log(error));
  }

  retireReasonChangeHandler(event) {
    const { concept } = this.state;
    concept.retireReason = event.target.value;
    this.setState({ concept });
  }

  retireConcept(event) {
    event.preventDefault();
    const { conceptId } = this;
    const { concept } = this.state;
    concept.retired = true;
    this.setState({ concept }, () => {
      putConceptById(conceptId, concept)
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
      conceptId,
    } = this;

    const { concept, redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <>
        {conceptId !== 'add' && concept.retired && (
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
          {conceptId !== 'add' && (
            <button type="button" onClick={deleteConcept.bind(this)}>
              Delete
            </button>
          )}
        </form>

        {conceptId !== 'add' && !concept.retired && (
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
      </>
    );
  }
}

ModifyConcept.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ModifyConcept);
