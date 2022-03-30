import DrugList from "../components/drug/DrugList";
import { Link } from "react-router-dom";
import React from "react";
import { SECONDARY_LINK } from "../styles/bootstrap";
import Drugs from "../components/drug/Drugs";

function DrugPage() {
  return (
    <React.Fragment>
      <h3>Drug Management</h3>
      <div className="text-center">
        <Link to="/drug/add" class={SECONDARY_LINK}>
          Add Drug
        </Link>
      </div>
      {/* <DrugList /> */}
      <Drugs />
    </React.Fragment>
  );
}

export default DrugPage;
