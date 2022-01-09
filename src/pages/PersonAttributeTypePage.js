import { Link } from 'react-router-dom';
import PersonAttributeTypeList from '../components/personAttributeType/PersonAttributeTypeList';
import React from 'react';
import { SECONDARY_LINK } from '../styles/bootstrap';

function PersonAttributeTypePage() {
  return (
    <React.Fragment>
      <h3>Person Attribute Management</h3>
      <Link to="/personAttributeType/add" className={SECONDARY_LINK}>
        Add New Person Attribute Type
      </Link>
      <PersonAttributeTypeList />
    </React.Fragment>
  );
}

export default PersonAttributeTypePage;
