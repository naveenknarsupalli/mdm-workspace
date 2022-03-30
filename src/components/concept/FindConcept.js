import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { FormControlLabel, Switch } from "@material-ui/core";
import React, { Fragment } from "react";
import { getConceptNameDetails } from "../../api/services";

class FindConcept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concepts: [],
      filteredConceptsOnRetired: [],
      isLoading: true,
      showRetired: true,
      showDetails: true
    };
    this.toggleRetired = this.toggleRetired.bind(this);
    this.toggleShowDetails = this.toggleShowDetails.bind(this);
  }

  componentDidMount() {
    this.setConcepts()
      .then(() => this.setFilteredConceptsOnRetired())
      .finally(() => this.setLoadingFalse())
      .catch((e) => console.log(e.message));
  }

  componentDidUpdate(prevProps, prevState) {
    const { showRetired } = this.state;

    if (prevState.showRetired !== showRetired) {
      this.setFilteredConceptsOnRetired();
    }
  }

  setLoadingFalse() {
    return new Promise((resolve) => {
      this.setState({ isLoading: false }, () => {
        resolve("success");
      });
    });
  }

  setConcepts() {
    return new Promise((resolve, reject) => {
      getConceptNameDetails()
        .then((response) => {
          this.setState({ concepts: response.data }, () => {
            resolve("success");
          });
        })
        .catch((e) => reject(e));
    });
  }

  setFilteredConceptsOnRetired() {
    const { concepts, showRetired } = this.state;
    if (showRetired) {
      this.setState({ filteredConceptsOnRetired: concepts });
    } else {
      this.setState({
        filteredConceptsOnRetired: concepts.filter(
          (concept) => concept.retired === false
        )
      });
    }
  }

  setRetired(value) {
    return new Promise((resolve) => {
      this.setState({ retired: value }, () => {
        resolve("success");
      });
    });
  }

  handleShowRetired(event) {
    this.setRetired(event.target.checked)
      .then(() => this.setFilteredConceptsOnRetired())
      .catch((e) => console.log(e.message));
  }

  handleShowDetails(event) {
    this.setState({ showDetails: event.target.checked });
  }

  toggleRetired() {
    const { showRetired } = this.state;
    this.setState({ showRetired: !showRetired });
  }

  toggleShowDetails() {
    const { showDetails } = this.state;
    this.setState({ showDetails: !showDetails });
  }
  render() {
    const { toggleRetired, toggleShowDetails } = this;

    const {
      filteredConceptsOnRetired,
      showRetired,
      showDetails,
      isLoading
    } = this.state;

    const nameColumn = {
      title: "Name",
      field: "conceptName",
      render: (rowData) => (
        <Link to={`/concept/${rowData.uuid}`}>{rowData.conceptName}</Link>
      )
    };

    const idColumn = {
      title: "Concept ID",
      field: "conceptId"
    };

    const columnsWithDetails = [nameColumn, idColumn];
    const columnsWithoutDetails = [nameColumn];
    const columns = showDetails ? columnsWithDetails : columnsWithoutDetails;

    const components = {
      Toolbar: (props) => (
        <div>
          <MTableToolbar {...props} />
          <div class="text-end" style={{ padding: "0px 10px" }}>
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  onClick={() => toggleRetired()}
                  checked={showRetired}
                />
              }
              label={showRetired ? "Hide Retired" : "Show Retired"}
              labelPlacement="start"
            />

            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  onClick={() => toggleShowDetails()}
                  checked={showDetails}
                />
              }
              label={showDetails ? "Hide Details" : "Show Details"}
              labelPlacement="start"
            />
          </div>
        </div>
      )
    };

    if (isLoading) return <p>loading...</p>;

    return (
      <Fragment>
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <MaterialTable
            title="Concepts"
            data={filteredConceptsOnRetired}
            columns={columns}
            components={components}
          />
        </div>
      </Fragment>
    );
  }
}
export default FindConcept;
