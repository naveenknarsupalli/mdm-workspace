import ConceptList from '../components/concept/ConceptList';
import FindConcept from '../components/concept/FindConcept';
import { Link } from 'react-router-dom';
import React from 'react';
import { SECONDARY_LINK } from '../styles/bootstrap';

function ConceptPage() {
  return (
    <React.Fragment>
      <h3>Concept Dictionary Maintenance</h3>
      <Link to="/concept/add" className={SECONDARY_LINK}>
        Add New Concept
      </Link>
      <FindConcept />
      <ConceptList />
    </React.Fragment>
  );
}

export default ConceptPage;
