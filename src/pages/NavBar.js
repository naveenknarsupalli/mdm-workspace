import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <Link to="/concept"> Concepts </Link> |
      <Link to="/conceptClass"> Concept Classes </Link> |
      <Link to="/drug"> Drugs </Link> |
      <Link to="/relationship"> Relationship </Link> |
      <Link to="/privilege"> Privilege </Link> |
      <Link to="/visitType"> Visit Type </Link> |
      <Link to="/personAttributeType"> Person Atttribute </Link> |
      <hr />
    </div>
  );
}

export default NavBar;
