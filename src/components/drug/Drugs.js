import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDrugs } from "../../api/services";
import MaterialTable, { MTableToolbar } from "material-table";
import { FormControlLabel, Switch } from "@material-ui/core";

const Drugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugsOnRetired, setFilteredDrugsOnRetired] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRetired, setShowRetired] = useState(true);

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

  useEffect(() => {
    const loadDrugs = async () => {
      const response = await getDrugs();
      setDrugs(response.data);
    };

    loadDrugs();
  }, []);

  useEffect(() => {
    if (showRetired) {
      setFilteredDrugsOnRetired(drugs);
    } else {
      setFilteredDrugsOnRetired(drugs.filter((drug) => drug.retired === false));
    }
    setIsLoading(false);
  }, [drugs, showRetired]);

  const toggleRetired = () => {
    setShowRetired((prevShowRetired) => !prevShowRetired);
  };

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

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <MaterialTable
          title="Drugs"
          data={filteredDrugsOnRetired}
          columns={columns}
          components={components}
        />
      </div>
    </>
  );
};

export default Drugs;
