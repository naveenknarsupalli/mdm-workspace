import ConceptClassList from '../components/conceptClass/ConceptClassList';
import { Link } from 'react-router-dom';
import React from 'react';
import { SECONDARY_LINK } from '../styles/bootstrap';

function ConceptClassPage() {
  return (
    <React.Fragment>
      <h3>Concept Class Management</h3>
      <Link to="/conceptClass/add" className={SECONDARY_LINK}>
        Add Concept Class
      </Link>
      <ConceptClassList />
    </React.Fragment>
  );
}

export default ConceptClassPage;
