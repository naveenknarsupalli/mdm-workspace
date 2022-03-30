import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { getRelationshipTypes } from "../../api/services";
import MaterialTable from "material-table";

class RelationshipTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationshipTypes: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.setRelationshipTypes()
      .finally(() => this.setLoadingFalse())
      .catch((e) => console.log(e.message));
  }

  setRelationshipTypes() {
    return new Promise((resolve, reject) => {
      getRelationshipTypes()
        .then((response) => {
          this.setState({ relationshipTypes: response.data }, () => {
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
    const { relationshipTypes, isLoading } = this.state;

    const columns = [
      {
        title: "Names",
        field: "aisToB",
        render: (rowData) => (
          <Link to={`/relationshipType/${rowData.uuid}`}>
            {rowData.aisToB}/{rowData.bisToA}
          </Link>
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
            title="Relationship Types"
            data={relationshipTypes}
            columns={columns}
          />
        </div>
      </Fragment>
    );
  }
}
export default RelationshipTypeList;
