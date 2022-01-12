import React, { Component, Fragment } from 'react';

class NumericDatatype extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conceptNumeric: this.props.conceptNumeric,
    };
  }

  getValueFor(field) {
    return field === null ? '' : field;
  }

  hiAbsoluteChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.hiAbsoluteChange = event.target.value;
    this.setState({ conceptNumeric });
  }

  hiCriticalChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.hiCritical = event.target.value;
    this.setState({ conceptNumeric });
  }

  hiNormalChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.hiNormal = event.target.value;
    this.setState({ conceptNumeric });
  }

  lowAbsoluteChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.lowAbsolute = event.target.value;
    this.setState({ conceptNumeric });
  }

  lowCriticalChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.lowCritical = event.target.value;
    this.setState({ conceptNumeric });
  }

  lowNormalChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.lowNormal = event.target.value;
    this.setState({ conceptNumeric });
  }

  preciseChangeHandler(event) {
    const { conceptNumeric } = this.state;
    conceptNumeric.precise = event.target.checked;
    this.setState({ conceptNumeric });
  }

  onBlurHandler() {
    const { conceptNumeric } = this.state;
    this.props.onBlur(conceptNumeric);
  }

  render() {
    const { conceptNumeric } = this.state;

    const {
      getValueFor,
      hiAbsoluteChangeHandler,
      hiCriticalChangeHandler,
      hiNormalChangeHandler,
      lowAbsoluteChangeHandler,
      lowCriticalChangeHandler,
      lowNormalChangeHandler,
      preciseChangeHandler,
      onBlurHandler,
    } = this;

    return (
      <Fragment>
        <p>Numeric</p>
        <label htmlFor="hiAbsolute">
          Absolute High
          <input
            type="text"
            id="hiAbsolute"
            name="hiAbsolute"
            value={getValueFor(conceptNumeric.hiAbsolute)}
            onChange={hiAbsoluteChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="hiCritical">
          Critical High
          <input
            type="text"
            id="hiCritical"
            name="hiCritical"
            value={getValueFor(conceptNumeric.hiCritical)}
            onChange={hiCriticalChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="hiNormal">
          Normal High
          <input
            type="text"
            id="hiNormal"
            name="hiNormal"
            value={getValueFor(conceptNumeric.hiNormal)}
            onChange={hiNormalChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="lowAbsolute">
          Absolute Low
          <input
            type="text"
            id="lowAbsolute"
            name="lowAbsolute"
            value={getValueFor(conceptNumeric.lowAbsolute)}
            onChange={lowAbsoluteChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="lowCritical">
          Critical Low
          <input
            type="text"
            id="lowCritical"
            name="lowCritical"
            value={getValueFor(conceptNumeric.lowCritical)}
            onChange={lowCriticalChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="lowNormal">
          Normal Low
          <input
            type="text"
            id="lowNormal"
            name="lowNormal"
            value={getValueFor(conceptNumeric.lowNormal)}
            onChange={lowNormalChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="precise">
          Allow Decimal?
          <input
            type="checkbox"
            id="precise"
            name="precise"
            checked={getValueFor(conceptNumeric.precise)}
            onChange={preciseChangeHandler.bind(this)}
            onBlur={onBlurHandler.bind(this)}
          />
        </label>
        <br />

        <label htmlFor="displayPrecision">
          Display Precision
          <input
            type="text"
            id="displayPrecision"
            name="displayPrecision"
            value={getValueFor(conceptNumeric.displayPrecision)}
            readOnly="true"
            disabled="true"
          />
        </label>
        <br />
      </Fragment>
    );
  }
}

export default React.memo(NumericDatatype);
