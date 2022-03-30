import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { getVisitTypes } from "../../api/services";
import MaterialTable from "material-table";

class VisitTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitTypes: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.setVisitTypes()
      .finally(() => this.setLoadingFalse())
      .catch((e) => console.log(e.message));
  }

  setVisitTypes() {
    return new Promise((resolve, reject) => {
      getVisitTypes()
        .then((response) => {
          this.setState({ visitTypes: response.data }, () => {
            resolve("success");
          });
        })
        .catch((e) => reject(e));
    });
  }

  setLoadingFalse() {
    return new Promise((resolve) => {
      this.setState({ isLoading: false }, () => {
        resolve("success");
      });
    });
  }

  render() {
    const { visitTypes, isLoading } = this.state;
    const columns = [
      {
        title: "Name",
        field: "name",
        render: (rowData) => (
          <Link to={`/visitType/${rowData.uuid}`}>{rowData.name}</Link>
        )
      },
      {
        title: "Description",
        field: "description"
      }
    ];

    if (isLoading) return <p>loading...</p>;

    return (
      <Fragment>
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <MaterialTable
            title="Visit Types"
            data={visitTypes}
            columns={columns}
          />
        </div>
      </Fragment>
    );
  }
}
export default VisitTypeList;
