import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRelationshipTypes } from "../../api/services";

const RelationshipTypes = () => {
  const [relationshipTypes, setRelationshipTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const loadRelationshipTypes = async () => {
      try {
        const response = await getRelationshipTypes();
        setRelationshipTypes(response.data);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelationshipTypes();
  }, []);

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <MaterialTable
          title="Relationship Types"
          data={relationshipTypes}
          columns={columns}
        />
      </div>
    </>
  );
};

export default RelationshipTypes;
