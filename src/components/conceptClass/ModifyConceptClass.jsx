/* eslint-disable no-console */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  deleteConceptClassById,
  getConceptClassById,
  postConceptClass,
  putConceptClassById,
} from '../../api/services';

class ModifyConceptClass extends React.Component {
  constructor(props) {
    super(props);

    const initialConceptClassState = {
      name: '',
      description: '',
      retireReason: '',
      retired: false,
    };

    this.state = {
      conceptClass: initialConceptClassState,
      redirect: null,
    };

    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.conceptClassId = id;
  }

  componentDidMount() {
    const { conceptClassId } = this;
    if (conceptClassId !== 'add') {
      getConceptClassById(conceptClassId)
        .then((response) => {
          this.setState({ conceptClass: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  nameChangeHandler(event) {
    const { conceptClass } = this.state;
    conceptClass.name = event.target.value;
    this.setState({ conceptClass });
  }

  descriptionChangeHandler(event) {
    const { conceptClass } = this.state;
    conceptClass.description = event.target.value;
    this.setState({ conceptClass });
  }

  retireReasonChangeHandler(event) {
    const { conceptClass } = this.state;
    conceptClass.retireReason = event.target.value;
    this.setState({ conceptClass }, () => {
      console.log(conceptClass);
    });
  }

  submitHandler() {
    const { conceptClass, conceptClassId } = this;
    if (conceptClassId === 'add') {
      postConceptClass(conceptClass)
        .then(() => {
          this.setState({ redirect: '/conceptClass' });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      putConceptClassById(conceptClassId, conceptClass)
        .then(() => {
          this.setState({ redirect: '/conceptClass' });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  cancelButtonHandler() {
    this.setState({ redirect: '/conceptClass' });
  }

  retireConceptClass(event) {
    event.preventDefault();
    const { conceptClass } = this.state;
    conceptClass.retired = true;

    const { conceptClassId } = this;
    this.setState({ conceptClass }, () => {
      putConceptClassById(conceptClassId, conceptClass)
        .then(() => {
          this.setState({ redirect: '/conceptClass' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deleteConceptClass() {
    const { conceptClassId } = this;
    deleteConceptClassById(conceptClassId)
      .then(() => {
        this.setState({ redirect: '/conceptClass' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      nameChangeHandler,
      descriptionChangeHandler,
      retireReasonChangeHandler,
      submitHandler,
      cancelButtonHandler,
      retireConceptClass,
      deleteConceptClass,
      conceptClassId,
    } = this;

    const { conceptClass, redirect } = this.state;
    const { name, description, retireReason } = conceptClass;

    const submitButtonContent = conceptClassId === 'add'
      ? 'Add Concept Class'
      : 'Save Concept Class';

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <>
        <form>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              name="name"
              onChange={nameChangeHandler.bind(this)}
              value={name}
              size="30"
            />
            <br />
          </label>

          <label htmlFor="description">
            Description:
            <textarea
              type="text"
              id="description"
              name="description"
              onChange={descriptionChangeHandler.bind(this)}
              value={description}
              rows="3"
              cols="30"
            />
            <br />
          </label>

          <button type="button" onClick={submitHandler.bind(this)}>{submitButtonContent}</button>
          <button type="button" onClick={cancelButtonHandler.bind(this)}>
            Cancel
          </button>
        </form>

        {conceptClassId !== 'add' && (
          <div>
            <hr />
            <p>Retire this Concept Class</p>
            <label htmlFor="retireReason">
              Reason:
              <input
                type="text"
                id="retireReason"
                name="retireReason"
                onChange={retireReasonChangeHandler.bind(this)}
                value={retireReason}
              />
              <br />
            </label>

            <button type="button" onClick={retireConceptClass.bind(this)}>
              Retire this Concept Class
            </button>
          </div>
        )}

        {conceptClassId !== 'add' && (
          <div>
            <hr />
            <p>Permanently Delete Concept Class</p>
            <button type="button" onClick={deleteConceptClass.bind(this)}>
              Permanently Delete Concept Class
            </button>
          </div>
        )}
      </>
    );
  }
}

ModifyConceptClass.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ModifyConceptClass);
