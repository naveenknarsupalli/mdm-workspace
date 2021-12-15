import React from 'react';
import { Link } from 'react-router-dom';
import VisitTypeList from '../components/visitType/VisitTypeList';

function VisitTypePage() {
  return (
    <React.Fragment>
      <h3>Visit Type Management</h3>
      <Link to="/visitType/add">Add Visit Type</Link>
      <VisitTypeList />
    </React.Fragment>
  );
}

export default VisitTypePage;
