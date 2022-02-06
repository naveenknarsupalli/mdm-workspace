import { Link } from "react-router-dom";
import React from "react";
import { SECONDARY_LINK } from "../styles/bootstrap";

function DependentFormsPage() {
  return (
    <React.Fragment>
      <Link to="/concept" className={SECONDARY_LINK}>
        Concepts
      </Link>
      <Link to="/conceptClass" className={SECONDARY_LINK}>
        Concept Classes
      </Link>
      <Link to="/privilege" className={SECONDARY_LINK}>
        Privilege
      </Link>
      <Link to="/testConcept/add" className={SECONDARY_LINK}>
        Test Concept
      </Link>
    </React.Fragment>
  );
}

export default DependentFormsPage;
