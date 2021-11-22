import { Fragment } from "react";
import { Link } from "react-router-dom";
import ConceptClassList from "../conceptClass/ConceptClassList";

const ConceptClassPage = (props) => {
  return (
    <Fragment>
      <Link to="/conceptClass/add">Add Concept Class</Link>
      <ConceptClassList />
    </Fragment>
  );
};

export default ConceptClassPage;
