import axios from "axios";
import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Select from "react-select";

class ModifyDrug extends React.Component {
  constructor(props) {
    super(props);

    const initialDrugState = {
      name: "",
      conceptId: "",
      combination: false,
      dosageForm: "",
      strength: "",
      minimumDailyDose: "",
      maximumDailyDose: "",
      retired: false,
      retireReason: "",
    };

    this.state = {
      drug: initialDrugState,
      redirect: null,
      drugId: this.props.match.params.id,
      options: [],
      defaultConceptIdValue: {},
      defaultDosageFormValue: {},
      startRender: false,
    };
  }

  componentDidMount() {
    const { drugId } = this.state;

    axios
      .get(`https://bahmni-cmm-default-rtdb.firebaseio.com/concept.json`)
      .then((response) => {
        const loadedOptions = [];
        for (const key in response.data) {
          loadedOptions.push({
            value: key,
            label: response.data[key].shortName,
          });
        }
        this.setState({ options: loadedOptions }, () => {
          if (drugId !== "add") {
            axios
              .get(
                `https://bahmni-cmm-default-rtdb.firebaseio.com/drug/${drugId}.json`
              )
              .then((response) => {
                this.setState({ drug: response.data }, () => {
                  const filtered = this.state.options.filter(
                    (option) => option.value === this.state.drug.conceptId
                  );
                  this.setState({ defaultConceptIdValue: filtered }, () => {
                    this.setState({ startRender: true });
                  });
                });
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  unretireDrug() {
    const { drug, drugId } = this.state;
    drug.retired = false;
    this.setState({ drug: drug }, () => {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/drug/${drugId}.json`,
          drug
        )
        .then(() => {
          this.setState({ redirect: "/drug" });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  nameChangeHandler(event) {
    const { drug } = this.state;
    drug.name = event.target.value;
    this.setState({ drug: drug });
  }

  conceptIdChangeHandler(selectedOption) {
    const { drug } = this.state;
    drug.conceptId = selectedOption.value;
    this.setState({ drug: drug });
  }

  filterOptions(option, inputValue) {
    const { label, value } = option;
    return (
      label.toLowerCase().includes(inputValue.toLowerCase()) ||
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  combinationChangeHandler(event) {
    const { drug } = this.state;
    drug.combination = event.target.checked;
    this.setState({ drug: drug });
  }

  dosageFormChangeHandler(selectedOption) {
    const { drug } = this.state;
    drug.dosageForm = selectedOption.value;
    this.setState({ drug: drug });
  }

  strengthChangeHandler(event) {
    const { drug } = this.state;
    drug.strength = event.target.value;
    this.setState({ drug: drug });
  }

  minimumDailyDoseChangeHandler(event) {
    const { drug } = this.state;
    drug.minimumDailyDose = event.target.value;
    this.setState({ drug: drug });
  }

  maximumDailyDoseChangeHandler(event) {
    const { drug } = this.state;
    drug.maximumDailyDose = event.target.value;
    this.setState({ drug: drug });
  }

  retireReasonChangeHandler(event) {
    const { drug } = this.state;
    drug.retireReason = event.target.value;
    this.setState({ drug: drug });
  }

  submitDrugFormHandler() {
    const { drug, drugId } = this.state;
    if (drugId === "add") {
      axios
        .post(`https://bahmni-cmm-default-rtdb.firebaseio.com/drug.json`, drug)
        .then(() => {
          this.setState({ redirect: "/drug" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/drug/${drugId}.json`,
          drug
        )
        .then(() => {
          this.setState({ redirect: "/drug" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  cancelButtonHandler() {
    this.setState({ redirect: "/drug" });
  }

  retireDrug() {
    let { drug, drugId } = this.state;
    drug.retired = true;
    this.setState({ drug: drug }, () => {
      axios
        .put(
          `https://bahmni-cmm-default-rtdb.firebaseio.com/drug/${drugId}.json`,
          drug
        )
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      this.setState({ redirect: "/drug" });
    });
  }

  deleteDrug() {
    let { drugId } = this.state;
    axios
      .delete(
        `https://bahmni-cmm-default-rtdb.firebaseio.com/drug/${drugId}.json`
      )
      .then(() => {
        this.setState({ redirect: "/drug" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      nameChangeHandler,
      conceptIdChangeHandler,
      filterOptions,
      combinationChangeHandler,
      dosageFormChangeHandler,
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
      drug,
      redirect,
      drugId,
      options,
      defaultConceptIdValue,
      defaultDosageFormValue,
      startRender,
    } = this.state;

    const getDefaultConceptIdValue = options.filter(
      (option) => option.value === drug.conceptId
    );

    const getDefaultDosageFormValue = options.filter(
      (option) => option.value === drug.dosageForm
    );

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    if (startRender || drugId === "add") {
      return (
        <React.Fragment>
          {console.log("concept", getDefaultConceptIdValue)}
          {console.log("dosage", getDefaultDosageFormValue)}
          <p>Concept Drug Management</p>
          {drug.retired && (
            <p>
              This drug is retired by ... ... - {drug.retireReason}{" "}
              <button type="button" onClick={unretireDrug.bind(this)}>
                Unretire this drug
              </button>
            </p>
          )}
          <hr />

          <form>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={nameChangeHandler.bind(this)}
              value={drug.name}
            />
            <br />

            <label htmlFor="conceptId">Concept*: </label>
            <div style={{ width: "300px", display: "inline-block" }}>
              <Select
                id="conceptId"
                name="conceptId"
                placeholder="Enter concept name or id"
                defaultValue={getDefaultConceptIdValue}
                onChange={conceptIdChangeHandler.bind(this)}
                options={options}
                filterOption={filterOptions}
              />
            </div>

            {console.log("concept", defaultConceptIdValue)}

            <br />
            <label htmlFor="combination">Combination: </label>
            <input
              type="checkbox"
              id="combination"
              name="combination"
              onChange={combinationChangeHandler.bind(this)}
              checked={drug.combination}
            />
            <br />

            <label htmlFor="dosageForm">Dosage Form: </label>
            <div style={{ width: "300px", display: "inline-block" }}>
              <Select
                id="dosageForm"
                name="dosageForm"
                placeholder="Enter concept name or id"
                defaultValue={getDefaultDosageFormValue}
                onChange={dosageFormChangeHandler.bind(this)}
                options={options}
                filterOption={filterOptions}
              />
            </div>

            <br />
            <label htmlFor="strength">Strength: </label>
            <input
              type="text"
              id="strength"
              name="strength"
              onChange={strengthChangeHandler.bind(this)}
              value={drug.strength}
            />
            <br />

            <label htmlFor="minimumDailyDose">Minimum Daily Dose: </label>
            <input
              type="number"
              id="minimumDailyDose"
              name="minimumDailyDose"
              onChange={minimumDailyDoseChangeHandler.bind(this)}
              value={drug.minimumDailyDose}
              step="any"
            />
            <br />

            <label htmlFor="maximumDailyDose">Maximum Daily Dose: </label>
            <input
              type="number"
              id="maximumDailyDose"
              name="maximumDailyDose"
              onChange={maximumDailyDoseChangeHandler.bind(this)}
              value={drug.maximumDailyDose}
              step="any"
            />
            <br />

            <button type="button" onClick={submitDrugFormHandler.bind(this)}>
              Save Concept Drug
            </button>
            <button type="button" onClick={cancelButtonHandler.bind(this)}>
              Cancel
            </button>
          </form>
          <hr />

          {drugId !== "add" && (
            <div>
              <p>Retire this Drug</p>
              <label htmlFor="retireReason">Reason: </label>
              <input
                type="text"
                id="retireReason"
                name="retireReason"
                onChange={retireReasonChangeHandler.bind(this)}
                value={drug.retireReason}
              />
              <br />
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
        </React.Fragment>
      );
    }

    return <p>Loading...</p>;
  }
}

export default withRouter(ModifyDrug);
