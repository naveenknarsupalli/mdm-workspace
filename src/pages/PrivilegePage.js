import React from "react";
import { Link } from "react-router-dom";
import PrivilegeList from "../components/privilege/PrivilegeList";

function PrivilegePage() {
  return (
    <React.Fragment>
      <h3>Privilege Management</h3>
      <Link to="/privilege/add">Add Privilege</Link>
      <PrivilegeList />
    </React.Fragment>
  );
}
export default PrivilegePage;
