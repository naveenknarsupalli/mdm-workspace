// import { Link } from "react-router-dom";
import React, { Fragment } from "react";
// import { SECONDARY_LINK } from "../styles/bootstrap";
import AddressHierarchyList from "../components/addressHierarchy/AddressHierarchyList";

function AddressHierarchyPage() {
  return (
    <Fragment>
      <h3>Address Hierarchy Management</h3>
      <AddressHierarchyList />
      {/* <Link to="/addressHierarchy/add" className={SECONDARY_LINK}>
        Add Address Hierarchy
      </Link> */}
    </Fragment>
  );
}

export default AddressHierarchyPage;
