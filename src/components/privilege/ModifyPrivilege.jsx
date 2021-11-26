/* eslint-disable no-console */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  getPrivilegeById,
  postPrivilege,
  putPrivilegeById,
} from '../../api/services';

class ModifyPrivilege extends React.Component {
  constructor(props) {
    super(props);
    const initialPrivilegeState = {
      privilege: '',
      description: '',
    };

    this.state = {
      id: props.match.params.id,
      redirect: null,
      privilege: initialPrivilegeState,
    };
  }

  componentDidMount() {
    const { id } = this.state;

    if (id !== 'add') {
      getPrivilegeById(id)
        .then((response) => {
          this.setState({ privilege: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  privilegeChangeHandler(event) {
    const { privilege } = this.state;
    privilege.privilege = event.target.value;
    this.setState({ privilege });
  }

  descriptionChangeHandler(event) {
    const { privilege } = this.state;
    privilege.description = event.target.value;
    this.setState({ privilege });
  }

  savePrivilege() {
    const { id, privilege } = this.state;
    if (id === 'add') {
      postPrivilege(privilege)
        .then(() => {
          this.setState({ redirect: '/privilege' });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      putPrivilegeById(id, privilege)
        .then(() => {
          this.setState({ redirect: '/privilege' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const {
      id,
      redirect,
      privilege,
    } = this.state;

    const {
      privilegeChangeHandler,
      descriptionChangeHandler,
      savePrivilege,
    } = this;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <>
        {id === 'add' && (
          <div>
            <label htmlFor="privilege">
              Privilege Name*:
              <input
                type="text"
                id="privilege"
                name="privilege"
                value={privilege.privilege}
                onChange={privilegeChangeHandler.bind(this)}
              />
            </label>
          </div>
        )}

        {id !== 'add' && <span>{privilege.privilege}</span>}
        <br />

        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            value={privilege.description}
            onChange={descriptionChangeHandler.bind(this)}
          />
          <br />
        </label>

        <button type="button" onClick={savePrivilege.bind(this)}>
          Save Privilege
        </button>
      </>
    );
  }
}

ModifyPrivilege.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ModifyPrivilege);
