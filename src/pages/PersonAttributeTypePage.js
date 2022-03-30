import { Link } from "react-router-dom";
import PersonAttributeTypeList from "../components/personAttributeType/PersonAttributeTypeList";
import React from "react";
import { SECONDARY_LINK } from "../styles/bootstrap";
import PersonAttributeTypes from "../components/personAttributeType/PersonAttributeTypes";

function PersonAttributeTypePage() {
  return (
    <React.Fragment>
      <h3>Person Attribute Management</h3>
      <div className="text-center">
        <Link to="/personAttributeType/add" className={SECONDARY_LINK}>
          Add Person Attribute Type
        </Link>
      </div>
      {/* <PersonAttributeTypeList /> */}
      <PersonAttributeTypes />
    </React.Fragment>
  );
}

export default PersonAttributeTypePage;
