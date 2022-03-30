import FindConcept from "../components/concept/FindConcept";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { SECONDARY_LINK } from "../styles/bootstrap";

function ConceptPage() {
  return (
    <Fragment>
      <h3>Concept Dictionary Maintenance</h3>
      <Link to="/concept/add" className={SECONDARY_LINK}>
        Add New Concept
      </Link>
      <FindConcept />
    </Fragment>
  );
}

export default ConceptPage;
