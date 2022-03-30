import { Link } from "react-router-dom";
import React from "react";
import VisitTypeList from "../components/visitType/VisitTypeList";
import { SECONDARY_LINK } from "../styles/bootstrap";

function VisitTypePage() {
  return (
    <React.Fragment>
      <h3>Visit Type Management</h3>
      <div className="text-center">
        <Link to="/visitType/add" className={SECONDARY_LINK}>
          Add Visit Type
        </Link>
      </div>
      <VisitTypeList />
    </React.Fragment>
  );
}

export default VisitTypePage;
