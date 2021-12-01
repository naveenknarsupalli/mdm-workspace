import React from 'react';
import { Link } from 'react-router-dom';
import DrugList from '../components/drug/DrugList';

const DrugPage = function () {
  return (
    <>
      <h3>Concept Drug Form</h3>
      <Link to="/drug/add">Add Concept Drug</Link>
      <DrugList />
    </>
  );
};

export default DrugPage;
