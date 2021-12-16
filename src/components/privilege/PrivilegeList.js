import { deletePrivilegeById, getPrivileges } from '../../api/services';

import { Link } from 'react-router-dom';
import React from 'react';

class PrivilegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: [],
      privilegesCheckedToDelete: [],
      redirect: null,
    };
  }

  componentDidMount() {
    getPrivileges()
      .then((response) => {
        const loadedPrivileges = [];
        const privilegesCheckedToDelete = [];

        for (const key in response.data) {
          let priv = response.data[key];
          priv['id'] = key;
          loadedPrivileges.push(priv);

          privilegesCheckedToDelete.push({
            privilegeId: key,
            isChecked: false,
          });
        }
        this.setState({
          privileges: loadedPrivileges,
          privilegesCheckedToDelete: privilegesCheckedToDelete,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkboxChangeHandler(event) {
    const { privilegesCheckedToDelete } = this.state;
    const index = privilegesCheckedToDelete.findIndex(
      (obj) => obj.privilegeId === event.target.id
    );
    privilegesCheckedToDelete[index].isChecked = event.target.checked;
    this.setState({ privilegesCheckedToDelete: privilegesCheckedToDelete });
  }

  deleteCheckedPrivilegesHandler(event) {
    const privilegesToDelete = this.state.privilegesCheckedToDelete.filter(
      (obj) => obj.isChecked === true
    );

    const len = privilegesToDelete.length;

    for (let i = 0; i < len; i++) {
      const deleteId = privilegesToDelete[i].privilegeId;
      deletePrivilegeById(deleteId)
        .then(() => {
          if (i === len - 1) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { privileges } = this.state;
    const { checkboxChangeHandler, deleteCheckedPrivilegesHandler } = this;
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Current Privileges</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td>Privilege Name</td>
              <td>Description</td>
            </tr>
            {privileges.map((privilege) => {
              return (
                <tr key={privilege.id}>
                  <td>
                    <input
                      type="checkbox"
                      id={privilege.id}
                      onChange={checkboxChangeHandler.bind(this)}
                    />
                  </td>
                  <td>
                    <Link to={`/privilege/${privilege.id}`}>
                      {privilege.privilege}
                    </Link>
                  </td>
                  <td>{privilege.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          onClick={deleteCheckedPrivilegesHandler.bind(this)}
        >
          Delete Selected Privileges
        </button>
      </React.Fragment>
    );
  }
}
export default PrivilegeList;
