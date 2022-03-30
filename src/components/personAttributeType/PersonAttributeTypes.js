import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPersonAttributeTypes } from "../../api/services";

const PersonAttributeTypes = () => {
  const [personAttributeTypes, setPersonAttributeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Name",
      field: "name",
      render: (rowData) => (
        <Link to={`/personAttributeType/${rowData.uuid}`}>{rowData.name}</Link>
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

  useEffect(() => {
    const loadPersonAttributeTypes = async () => {
      try {
        const response = await getPersonAttributeTypes();
        setPersonAttributeTypes(response.data);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersonAttributeTypes();
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <MaterialTable
          title="Attribute Types"
          data={personAttributeTypes}
          columns={columns}
        />
      </div>
    </>
  );
};

export default PersonAttributeTypes;
