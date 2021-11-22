import { Fragment } from "react";
import { Link } from "react-router-dom";
import ConceptList from "../concept/ConceptList";
import FindConcept from "../concept/FindConcept";

function ConceptPage() {
  return (
    <Fragment>
      <h3>Concept Dictionary Maintenance</h3>
      <Link to="/concept/add">Add New Concept</Link>
      <hr />
      <FindConcept />
      <hr />
      <ConceptList />
    </Fragment>
  );
}

export default ConceptPage;
