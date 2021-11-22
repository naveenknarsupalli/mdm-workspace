import { Fragment } from "react";
import { Link } from "react-router-dom";
import DrugList from "../drug/DrugList";

const DrugPage = (props) => {
  return (
    <Fragment>
      <h3>Concept Drug Form</h3>
      <Link to="/drug/add">Add Concept Drug</Link>
      <DrugList />
    </Fragment>
  );
};

export default DrugPage;
