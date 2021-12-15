import React from 'react';
import { Link } from 'react-router-dom';
import PersonAttributeTypeList from '../components/personAttributeType/PersonAttributeTypeList';

function PersonAttributeTypePage() {
  return (
    <React.Fragment>
      <h3>Person Attribute Management</h3>
      <Link to="/personAttributeType/add">Add New Person Attribute Type</Link>
      <PersonAttributeTypeList />
    </React.Fragment>
  );
}

export default PersonAttributeTypePage;
