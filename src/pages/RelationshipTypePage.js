import { Link } from 'react-router-dom';
import React from 'react';
import RelationshipTypeList from '../components/relationshipType/RelationshipTypeList';

function RelationshipTypePage() {
  return (
    <React.Fragment>
      <h3>Relationship Type Management</h3>
      <Link to="/relationshipType/add">Add Relationship Type</Link>
      <RelationshipTypeList />
    </React.Fragment>
  );
}

export default RelationshipTypePage;
