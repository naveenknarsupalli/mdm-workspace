import React from "react";
import { Link } from "react-router-dom";
import DrugList from "../components/drug/DrugList";

function DrugPage() {
  return (
    <React.Fragment>
      <h3>Concept Drug Form</h3>
      <Link to="/drug/add">Add Concept Drug</Link>
      <DrugList />
    </React.Fragment>
  );
}

export default DrugPage;
