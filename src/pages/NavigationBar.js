import { Link } from "react-router-dom";
import { PRIMARY_LINK } from "../styles/bootstrap";
import React from "react";

function NavigationBar() {
  return (
    <div className="d-flex justify-content-center fixed">
      <Link to="/addressHierarchy" className={PRIMARY_LINK}>
        Address Hierarchy
      </Link>
      <Link to="/relationshipType" className={PRIMARY_LINK}>
        Patient Relationships
      </Link>
      <Link to="/personAttributeType" className={PRIMARY_LINK}>
        Person Atttributes
      </Link>
      <Link to="/user" className={PRIMARY_LINK}>
        Users
      </Link>
      <Link to="/visitType" className={PRIMARY_LINK}>
        Visit Types
      </Link>
      <Link to="/drug" className={PRIMARY_LINK}>
        Medication Data {/* Drugs */}
      </Link>
      Observations
      <Link to="/dependentForms" className={PRIMARY_LINK}>
        Dependent Forms
      </Link>
    </div>
  );
}

export default NavigationBar;
