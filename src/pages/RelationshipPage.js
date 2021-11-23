import React from "react";
import { Link } from "react-router-dom";
import RelationshipList from "../components/relationship/RelationshipList";

function RelationshipPage() {
  return (
    <React.Fragment>
      <h3>Relationship Type Management</h3>
      <Link to="/relationship/add">Add Relationship Type</Link>
      <RelationshipList />
    </React.Fragment>
  );
}

export default RelationshipPage;
