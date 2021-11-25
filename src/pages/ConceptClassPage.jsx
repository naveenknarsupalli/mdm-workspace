import React from 'react';
import { Link } from 'react-router-dom';
import ConceptClassList from '../components/conceptClass/ConceptClassList';

const ConceptClassPage = () => {
  <>
    <h3>Concept Class Management</h3>
    <Link to="/conceptClass/add">Add Concept Class</Link>
    <ConceptClassList />
  </>;
};

export default ConceptClassPage;
