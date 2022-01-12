import { Component, Fragment } from 'react';

import Select from 'react-select';

class CodedDatatype extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conceptAnswers: this.props.conceptAnswers,
      conceptOptions: this.props.conceptOptions,
      drugOptions: this.props.drugOptions,
      answerConcepts: [],
      drugConcepts: [],
    };
  }

  componentDidMount() {
    const { conceptAnswers } = this.state;

    const splitConceptAnswers = async () => {
      const answerConcepts = [];
      const drugConcepts = [];
      await conceptAnswers.forEach((ans) => {
        if (ans.answerConcept) {
          answerConcepts.push(ans);
        }
        if (ans.answerDrug) {
          drugConcepts.push(ans);
        }
      });

      this.setState({ answerConcepts, drugConcepts });
    };

    splitConceptAnswers();
  }

  filterOptions(option, inputValue) {
    const { label, value } = option;
    return (
      (label != null &&
        label.toLowerCase().includes(inputValue.toLowerCase())) ||
      value.toString().toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  answerConceptChangeHandler(selectedOptions) {
    const { drugConcepts } = this.state;
    const answerConcepts = [];
    selectedOptions.forEach((option) => {
      answerConcepts.push(option.value);
    });
    const conceptAnswers = [];
    conceptAnswers.push(...answerConcepts, ...drugConcepts);
    this.props.collectCodedInfo(conceptAnswers);
  }

  answerDrugChangeHandler(selectedOptions) {
    const { answerConcepts } = this.state;
    const drugConcepts = [];
    selectedOptions.forEach((option) => {
      drugConcepts.push(option.value);
    });
    const conceptAnswers = [];
    conceptAnswers.push(...answerConcepts, ...drugConcepts);
    this.props.collectCodedInfo(conceptAnswers);
  }

  render() {
    const {
      filterOptions,
      answerConceptChangeHandler,
      answerDrugChangeHandler,
    } = this;
    const { answerConcepts, drugConcepts, conceptOptions, drugOptions } =
      this.state;

    const getDefaultAnswerConceptValue = conceptOptions.filter(
      (option) => option.value === answerConcepts.answerConcept
    );

    const getDefaultAnswerDrugValue = drugOptions.filter(
      (option) => option.value === drugConcepts.drugConcept
    );

    return (
      <Fragment>
        <p>Answers</p>
        <label htmlFor="answerConcept">Select Concepts: </label>
        <div style={{ width: '300px', display: 'inline-block' }}>
          <Select
            isMulti
            id="answerConcept"
            name="answerConcept"
            placeholder="Enter concept name or id"
            defaultValue={getDefaultAnswerConceptValue}
            onChange={answerConceptChangeHandler.bind(this)}
            options={conceptOptions}
            filterOption={filterOptions}
          />
        </div>
        <label htmlFor="answerDrug">Select Concept Drugs: </label>
        <div style={{ width: '300px', display: 'inline-block' }}>
          <Select
            isMulti
            id="answerDrug"
            name="answerDrug"
            placeholder="Enter concept drug name or id"
            defaultValue={getDefaultAnswerDrugValue}
            onChange={answerDrugChangeHandler.bind(this)}
            options={drugOptions}
            filterOption={filterOptions}
          />
        </div>
      </Fragment>
    );
  }
}

export default CodedDatatype;
