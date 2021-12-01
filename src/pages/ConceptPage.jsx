import React from 'react';
import { Link } from 'react-router-dom';
import ConceptList from '../components/concept/ConceptList';
import FindConcept from '../components/concept/FindConcept';

const ConceptPage = function () {
  return (
    <>
      <h3>Concept Dictionary Maintenance</h3>
      <Link to="/concept/add">Add New Concept</Link>
      <hr />
      <FindConcept />
      <hr />
      <ConceptList />
    </>
  );
};

export default ConceptPage;
