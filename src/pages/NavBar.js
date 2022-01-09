import { Link } from 'react-router-dom';
import { PRIMARY_LINK } from '../styles/bootstrap';
import React from 'react';

function NavBar() {
  return (
    <div className="d-flex justify-content-center fixed">
      a) Address Hierarchy
      <Link to="/relationshipType" className={PRIMARY_LINK}>
        b) Patient Relationships
      </Link>
      <Link to="/personAttributeType" className={PRIMARY_LINK}>
        c) Person Atttributes
      </Link>
      d) Users
      <Link to="/visitType" className={PRIMARY_LINK}>
        e) Visit Types
      </Link>
      <Link to="/drug" className={PRIMARY_LINK}>
        h) Medication Data {/* Drugs */}
      </Link>
      i) Observations
      <Link to="/dependentForms" className={PRIMARY_LINK}>
        Dependent Forms
      </Link>
    </div>
  );
}

export default NavBar;
