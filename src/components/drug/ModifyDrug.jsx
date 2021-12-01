/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {
  deleteDrugById,
  getConcepts,
  // getDrugById,
  postDrug,
  putDrugById,
} from '../../api/services';

class ModifyDrug extends React.Component {
  constructor(props) {
    super(props);

    const initialDrugState = {
      name: '',
      conceptId: '',
      combination: false,
      dosageForm: '',
      strength: '',
      minimumDailyDose: '',
      maximumDailyDose: '',
      retired: false,
      retireReason: '',
    };

    this.state = {
      drug: initialDrugState,
      redirect: null,
      drugId: props.match.params.id,
      options: [],
      startRender: false,
    };

    this.conceptIdChangeHandler = this.conceptIdChangeHandler.bind(this);
    this.dosageFormChangeHandler = this.dosageFormChangeHandler.bind(this);
    // this.filterOptions = this.filterOptions.bind(this);
  }

  componentDidMount() {
    // const { drugId, options, drug } = this.state;
    getConcepts()
      .then((response) => {
        const options = [];

        Object.keys(response.data).forEach((key) => {
          options.push({
            value: key,
            label: response.data[key].shortName,
          });
        });

        this.setState({ options });
        //   , () => {
        //   if (drugId !== 'add') {
        //     getDrugById(drugId)
        //       .then((resp) => {
        //         this.setState({ drug: resp.data }, () => {
        //           const filtered = options.filter(
        //             (option) => option.value === drug.conceptId,
        //           );
        //           this.setState({ defaultConceptIdValue: filtered }, () => {
        //             this.setState({ startRender: true });
        //           });
        //         });
        //       })
        //       .catch((error) => {
        //         console.log(error);
        //       });
        //   }
        // }
        // );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unretireDrug() {
    const { drug, drugId } = this.state;
    drug.retired = false;
    this.setState({ drug }, () => {
      putDrugById(drugId, drug)
        .then(() => {
          this.setState({ redirect: '/drug' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  nameChangeHandler(event) {
    const { drug } = this.state;
    drug.name = event.target.value;
    this.setState({ drug });
  }

  conceptIdChangeHandler(selectedOption) {
    const { drug } = this.state;
    drug.conceptId = selectedOption.value;
    this.setState({ drug });
  }

  combinationChangeHandler(event) {
    const { drug } = this.state;
    drug.combination = event.target.checked;
    this.setState({ drug });
  }

  dosageFormChangeHandler(selectedOption) {
    const { drug } = this.state;
    drug.dosageForm = selectedOption.value;
    this.setState({ drug });
  }

  strengthChangeHandler(event) {
    const { drug } = this.state;
    drug.strength = event.target.value;
    this.setState({ drug });
  }

  minimumDailyDoseChangeHandler(event) {
    const { drug } = this.state;
    drug.minimumDailyDose = event.target.value;
    this.setState({ drug });
  }

  maximumDailyDoseChangeHandler(event) {
    const { drug } = this.state;
    drug.maximumDailyDose = event.target.value;
    this.setState({ drug });
  }

  retireReasonChangeHandler(event) {
    const { drug } = this.state;
    drug.retireReason = event.target.value;
    this.setState({ drug });
  }

  submitDrugFormHandler() {
    const { drug, drugId } = this.state;
    if (drugId === 'add') {
      postDrug(drug)
        .then(() => {
          this.setState({ redirect: '/drug' });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      putDrugById(drugId, drug)
        .then(() => {
          this.setState({ redirect: '/drug' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  cancelButtonHandler() {
    this.setState({ redirect: '/drug' });
  }

  retireDrug() {
    const { drug, drugId } = this.state;
    drug.retired = true;
    this.setState({ drug }, () => {
      putDrugById(drugId, drug)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });

      this.setState({ redirect: '/drug' });
    });
  }

  deleteDrug() {
    const { drugId } = this.state;
    deleteDrugById(drugId)
      .then(() => {
        this.setState({ redirect: '/drug' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      nameChangeHandler,
      conceptIdChangeHandler,
      combinationChangeHandler,
      dosageFormChangeHandler,
      // filterOptions,
      strengthChangeHandler,
      minimumDailyDoseChangeHandler,
      maximumDailyDoseChangeHandler,
      retireReasonChangeHandler,
    } = this;

    const {
      unretireDrug,
      submitDrugFormHandler,
      cancelButtonHandler,
      retireDrug,
      deleteDrug,
    } = this;

    const {
      drug, redirect, drugId, options, startRender,
    } = this.state;

    const filterOptions = (option, inputValue) => {
      // const { that } = this;
      const { label, value } = option;
      console.log(this);
      return (
        label.toLowerCase().includes(inputValue.toLowerCase())
        || value.toLowerCase().includes(inputValue.toLowerCase())
      );
    };

    const getDefaultConceptIdValue = options.filter(
      (option) => option.value === drug.conceptId,
    );

    const getDefaultDosageFormValue = options.filter(
      (option) => option.value === drug.dosageForm,
    );

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (startRender || drugId === 'add') {
      return (
        <>
          <p>Concept Drug Management</p>
          {drug.retired && (
            <p>
              This drug is retired by ... ... -
              {' '}
              {drug.retireReason}
              {' '}
              <button type="button" onClick={unretireDrug.bind(this)}>
                Unretire this drug
              </button>
            </p>
          )}
          <hr />

          <form>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={nameChangeHandler.bind(this)}
                value={drug.name}
              />
              <br />
            </label>

            {/* <div style={{ width: '300px', display: 'inline-block' }}> */}
            <label htmlFor="conceptId">
              Concept*:
              <Select
                id="conceptId"
                name="conceptId"
                placeholder="Enter concept name or id"
                defaultValue={getDefaultConceptIdValue}
                onChange={conceptIdChangeHandler}
                options={options}
                filterOption={filterOptions}
              />
              <br />
            </label>
            {/* </div> */}

            <label htmlFor="combination">
              Combination:
              <input
                type="checkbox"
                id="combination"
                name="combination"
                onChange={combinationChangeHandler.bind(this)}
                checked={drug.combination}
              />
              <br />
            </label>

            <label htmlFor="dosageForm">
              <div style={{ width: '300px', display: 'inline-block' }}>
                Dosage Form:
                <Select
                  id="dosageForm"
                  name="dosageForm"
                  placeholder="Enter concept name or id"
                  defaultValue={getDefaultDosageFormValue}
                  onChange={dosageFormChangeHandler}
                  options={options}
                  filterOption={filterOptions}
                />
                <br />
              </div>
            </label>

            <label htmlFor="strength">
              Strength:
              <input
                type="text"
                id="strength"
                name="strength"
                onChange={strengthChangeHandler.bind(this)}
                value={drug.strength}
              />
              <br />
            </label>

            <label htmlFor="minimumDailyDose">
              Minimum Daily Dose:
              <input
                type="number"
                id="minimumDailyDose"
                name="minimumDailyDose"
                onChange={minimumDailyDoseChangeHandler.bind(this)}
                value={drug.minimumDailyDose}
                step="any"
              />
              <br />
            </label>

            <label htmlFor="maximumDailyDose">
              Maximum Daily Dose:
              <input
                type="number"
                id="maximumDailyDose"
                name="maximumDailyDose"
                onChange={maximumDailyDoseChangeHandler.bind(this)}
                value={drug.maximumDailyDose}
                step="any"
              />
              <br />
            </label>

            <button type="button" onClick={submitDrugFormHandler.bind(this)}>
              Save Concept Drug
            </button>
            <button type="button" onClick={cancelButtonHandler.bind(this)}>
              Cancel
            </button>
          </form>
          <hr />

          {drugId !== 'add' && (
            <div>
              <p>Retire this Drug</p>
              <label htmlFor="retireReason">
                Reason:
                <input
                  type="text"
                  id="retireReason"
                  name="retireReason"
                  onChange={retireReasonChangeHandler.bind(this)}
                  value={drug.retireReason}
                />
                <br />
              </label>

              <button type="button" onClick={retireDrug.bind(this)}>
                Retire this Drug
              </button>

              <hr />

              <p>Permanently Delete Concept Drug</p>
              <br />
              <button type="button" onClick={deleteDrug.bind(this)}>
                Permanently Delete Concept Drug
              </button>
            </div>
          )}
        </>
      );
    }

    return <p>Loading...</p>;
  }
}

ModifyDrug.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ModifyDrug);
