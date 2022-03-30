import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { getDrugs } from "../../api/services";
import MaterialTable, { MTableToolbar } from "material-table";
import { FormControlLabel, Switch } from "@material-ui/core";

class DrugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drugs: [],
      filteredDrugsOnRetired: [],
      showRetired: true,
      isLoading: true
    };
    this.toggleRetired = this.toggleRetired.bind(this);
  }

  componentDidMount() {
    this.setDrugs()
      .then(() => this.setFilteredDrugsOnRetired())
      .finally(() => this.setLoadingFalse())
      .catch((e) => console.log(e.message));
  }

  setDrugs() {
    return new Promise((resolve, reject) => {
      getDrugs()
        .then((response) => {
          this.setState({ drugs: response.data }, () => {
            resolve("success");
          });
        })
        .catch((e) => reject(e));
    });
  }

  setFilteredDrugsOnRetired() {
    const { drugs, showRetired } = this.state;
    if (showRetired) {
      this.setState({ filteredDrugsOnRetired: drugs });
    } else {
      this.setState({
        filteredDrugsOnRetired: drugs.filter((drug) => drug.retired === false)
      });
    }
  }

  setLoadingFalse() {
    return new Promise((resolve) => {
      this.setState({ isLoading: false }, () => {
        resolve("success");
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { showRetired } = this.state;

    if (prevState.showRetired !== showRetired) {
      this.setFilteredDrugsOnRetired();
    }
  }

  toggleRetired() {
    const { showRetired } = this.state;
    this.setState({ showRetired: !showRetired });
  }

  render() {
    const { toggleRetired } = this;
    const { filteredDrugsOnRetired, isLoading, showRetired } = this.state;

    const columns = [
      {
        title: "Name",
        field: "name",

        render: (rowData) => (
          <Link to={`/drug/${rowData.uuid}`}>{rowData.name}</Link>
        )
      },
      {
        title: "Strength",
        field: "strength"
      }
    ];

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
          </div>
        </div>
      )
    };

    if (isLoading) return <p>loading ...</p>;

    return (
      <Fragment>
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <MaterialTable
            title="Drugs"
            data={filteredDrugsOnRetired}
            columns={columns}
            components={components}
          />
        </div>
      </Fragment>
    );
  }
}
export default DrugList;
