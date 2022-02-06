import { Link } from "react-router-dom";
import React from "react";
import UsersList from "../components/user/UsersList";

function UserPage() {
  return (
    <React.Fragment>
      <h3>Users Management</h3>
      <Link to="/user/add">Add User</Link>
      <UsersList />
    </React.Fragment>
  );
}

export default UserPage;
