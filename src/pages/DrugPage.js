import DrugList from '../components/drug/DrugList';
import { Link } from 'react-router-dom';
import React from 'react';

function DrugPage() {
  return (
    <React.Fragment>
      <h3>Concept Drug Form</h3>
      <Link to="/drug/add">Add Concept Drug</Link>
      <DrugList />
    </React.Fragment>
  );
}

export default DrugPage;
