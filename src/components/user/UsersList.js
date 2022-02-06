import { Link } from "react-router-dom";
import React from "react";
import { getUsers } from "../../api/services";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    getUsers()
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;

    if (users.length === 0) return <p>no users exist. create a new one.</p>;

    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Current Users</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.uuid}>
                <td>
                  <Link to={`/user/${user.uuid}`}>{user.username}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default UsersList;
