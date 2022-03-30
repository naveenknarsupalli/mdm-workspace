import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { getPersonAttributeTypes } from "../../api/services";
import MaterialTable from "material-table";

class PersonAttributeTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personAttributeTypes: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.setPersonAttributeTypes()
      .finally(() => this.setLoadingFalse())
      .catch((e) => console.log(e.message));
  }

  setPersonAttributeTypes() {
    return new Promise((resolve, reject) => {
      getPersonAttributeTypes()
        .then((response) => {
          this.setState({ personAttributeTypes: response.data }, () => {
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
    const { personAttributeTypes, isLoading } = this.state;

    const columns = [
      {
        title: "Name",
        field: "name",
        render: (rowData) => (
          <Link to={`/personAttributeType/${rowData.uuid}`}>
            {rowData.name}
          </Link>
        )
      },
      {
        title: "Format",
        field: "format"
      },
      {
        title: "Searchable",
        field: "searchable",
        lookup: { true: "Yes", false: "" }
      },
      {
        title: "Description",
        field: "description"
      },
      {
        title: "Edit Privilege",
        field: "editPrivilege"
      }
    ];

    if (isLoading) return <p>loading...</p>;

    return (
      <Fragment>
        <div style={{ maxWidth: "80%", margin: "auto" }}>
          <MaterialTable
            title="Attribute Types"
            data={personAttributeTypes}
            columns={columns}
          />
        </div>
      </Fragment>
    );
  }
}
export default PersonAttributeTypeList;
