import React, { Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import {
  deleteConceptById,
  getConceptById,
  getConceptClasses,
  getConceptNames,
  postConcept,
  putConceptById,
} from '../../api/services';

import Select from 'react-select/dist/declarations/src/Select';

class ModifyConcept extends React.Component {
  constructor(props) {
    super(props);
    const initialConceptState = {
      shortName: 'test',
      description: 'this is the first id',
      formText: null,
      isSet: false,
      version: null,
      classId: 1,
      conceptNumeric: {
        hiAbsolute: null,
        hiCritical: null,
        hiNormal: null,
        lowAbsolute: null,
        lowCritical: null,
        lowNormal: null,
        units: null,
        precise: true,
        displayPrecision: null,
      },
      datatypeId: {
        conceptDatatypeId: 1,
      },
      conceptNames: [
        {
          name: 'Vero',
          conceptNameType: 'INDEX_TERM',
        },
        {
          name: 'Sì',
          conceptNameType: 'INDEX_TERM',
        },
      ],
      conceptAnswers: [
        {
          answerDrug: 20,
        },
        {
          answerConcept: 40,
        },
        {
          answerConcept: 60,
        },
      ],
      conceptComplex: 'ImageURlHandler',
      mappings: [
        {
          conceptReferenceTermId: 34,
          conceptMapTypeId: 43,
        },
        {
          conceptReferenceTermId: 4,
          conceptMapTypeId: 33,
        },
      ],
      conceptSets: [{ conceptId: 1 }, { conceptId: 2 }],
    };
    this.state = {
      concept: initialConceptState,
      redirect: null,
      conceptId: this.props.match.params.id,
      classOptions: [],
      conceptOptions: [],
    };
  }

  componentDidMount() {
    getConceptClasses()
      .then((response) => {
        const classOptions = [];
        Object.keys(response.data).forEach((key) => {
          classOptions.push({
            label: response.data[key].name,
            value: response.data[key].conceptClassId,
          });
        });
        this.setState({ classOptions });
      })
      .catch((error) => console.log(error));

    getConceptNames()
      .then((response) => {
        const conceptOptions = [];
        Object.keys(response.data).forEach((key) => {
          conceptOptions.push({
            label: response.data[key].name,
            value: response.data[key].conceptNameId,
          });
        });
        this.setState({ conceptOptions });
      })
      .catch((error) => console.log(error));

    const { conceptId } = this.state;
    if (conceptId !== 'add') {
      getConceptById(conceptId)
        .then((response) => {
          this.setState({
            concept: response.data,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  isSetChangeHandler(event) {
    const { concept } = this.state;
    concept.isSet = event.target.checked;
    this.setState({ concept });
  }

  unretire(event) {
    event.preventDefault();
    const { concept, conceptId } = this.state;
    concept.retired = false;
    this.setState({ concept: concept }, () => {
      putConceptById(conceptId, concept)
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

  versionChangeHandler(event) {
    const { concept } = this.state;
    concept.version = event.target.value;
    this.setState({ concept: concept });
  }

  saveConcept(event) {
    event.preventDefault();

    const { conceptId, concept } = this.state;
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

  saveConceptAndContinue(event) {
    event.preventDefault();

    const { conceptId, concept } = this.state;
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
    const { conceptId } = this.state;
    deleteConceptById(conceptId)
      .then(() => {
        this.setState({ redirect: '/concept' });
      })
      .catch((error) => console.log(error));
  }

  retireReasonChangeHandler(event) {
    const { concept } = this.state;
    concept.retireReason = event.target.value;
    this.setState({ concept: concept });
  }

  getValueFor(field) {
    return field === null ? '' : field;
  }

  retireConcept(event) {
    event.preventDefault();
    const { concept, conceptId } = this.state;
    concept.retired = true;
    this.setState({ concept: concept }, () => {
      putConceptById(conceptId, concept)
        .then()
        .catch((error) => console.log(error));
    });
  }

  classIdChangeHandler(selectedOption) {
    const { concept } = this.state;
    concept.classId = selectedOption.value;
    this.setState({ concept });
  }

  conceptSetsChangeHandler(selectedOptions) {
    const conceptSets = [];
    selectedOptions.forEach((option) => {
      conceptSets.push({ conceptId: option.value });
    });
    this.setState({ conceptSets });
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
      classIdChangeHandler,
      versionChangeHandler,
      isSetChangeHandler,
      getValueFor,
      conceptSetsChangeHandler,
    } = this;

    const { concept, redirect, conceptId, classOptions, conceptOptions } =
      this.state;

    const getDefaultConceptSetsValue = conceptOptions.filter(
      (conceptOption) => conceptOption.value === concept.conceptSets.conceptId
    );

    const getDefaultClassIdValue = classOptions.filter(
      (classOption) => classOption.value === concept.classId
    );

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <Fragment>
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

          <label htmlFor="classId">Class: </label>
          <div style={{ width: '300px', display: 'inline-block' }}>
            <Select
              id="classId"
              name="classId"
              defaultValue={getDefaultClassIdValue}
              onChange={classIdChangeHandler.bind(this)}
              options={classOptions}
            />
          </div>
          <br />

          <label htmlFor="isSet">Is Set: </label>
          <input
            type="checkbox"
            id="isSet"
            name="isSet"
            onChange={isSetChangeHandler.bind(this)}
            checked={getValueFor(concept.isSet)}
          />
          <br />

          {concept.isSet && (
            <div>
              <label htmlFor="conceptSets">Set Members: </label>
              <div style={{ width: '300px', display: 'inline-block' }}>
                <Select
                  id="conceptSets"
                  name="conceptSets"
                  defaultValue={getDefaultConceptSetsValue}
                  onChange={conceptSetsChangeHandler.bind(this)}
                  options={conceptOptions}
                />
              </div>
              <br />
            </div>
          )}

          <label htmlFor="version">Version: </label>
          <input
            type="text"
            id="version"
            name="version"
            onChange={versionChangeHandler.bind(this)}
            value={concept.version}
          />

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
      </Fragment>
    );
  }
}

export default withRouter(ModifyConcept);
