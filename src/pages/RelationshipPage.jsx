import React from 'react';
import { Link } from 'react-router-dom';
import RelationshipList from '../components/relationship/RelationshipList';

const RelationshipPage = () => {
  <>
    <h3>Relationship Type Management</h3>
    <Link to="/relationship/add">Add Relationship Type</Link>
    <RelationshipList />
  </>;
};

export default RelationshipPage;
