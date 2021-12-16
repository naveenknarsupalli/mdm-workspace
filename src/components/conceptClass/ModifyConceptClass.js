import { Redirect, withRouter } from 'react-router-dom';
import {
  deleteConceptClassById,
  getConceptClassById,
  postConceptClass,
  putConceptClassById,
} from '../../api/services';

import React from 'react';

class ModifyConceptClass extends React.Component {
  constructor(props) {
    super(props);
    const initialConceptClassState = {
      name: '',
      description: '',
      retireReason: '',
      retired: false,
    };
    this.state = { conceptClass: initialConceptClassState, redirect: null };
  }

  componentDidMount() {
    const conceptClassId = this.props.match.params.id;
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
    this.setState({ conceptClass: conceptClass });
  }

  descriptionChangeHandler(event) {
    const { conceptClass } = this.state;
    conceptClass.description = event.target.value;
    this.setState({ conceptClass: conceptClass });
  }

  retireReasonChangeHandler(event) {
    const { conceptClass } = this.state;
    conceptClass.retireReason = event.target.value;
    this.setState({ conceptClass: conceptClass }, () => {
      console.log(this.state.conceptClass);
    });
  }

  submitHandler(event) {
    event.preventDefault();
    const { conceptClass } = this.state;
    const conceptClassId = this.props.match.params.id;
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

  cancelButtonHandler(event) {
    this.setState({ redirect: '/conceptClass' });
  }

  retireConceptClass(event) {
    event.preventDefault();
    const { conceptClass } = this.state;
    conceptClass.retired = true;

    const conceptClassId = this.props.match.params.id;
    this.setState({ conceptClass: conceptClass }, () => {
      putConceptClassById(conceptClassId, conceptClass)
        .then(() => {
          this.setState({ redirect: '/conceptClass' });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deleteConceptClass(event) {
    event.preventDefault();
    const conceptClassId = this.props.match.params.id;
    deleteConceptClassById(conceptClassId)
      .then(() => {
        this.setState({ redirect: '/conceptClass' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const {
      nameChangeHandler,
      descriptionChangeHandler,
      retireReasonChangeHandler,
    } = this;

    const {
      submitHandler,
      cancelButtonHandler,
      retireConceptClass,
      deleteConceptClass,
    } = this;

    const { name, description, retireReason } = this.state.conceptClass;

    // const conceptClassId = this.props.match.params.id;
    const submitButtonContent =
      this.props.match.params.id === 'add'
        ? 'Add Concept Class'
        : 'Save Concept Class';

    return (
      <React.Fragment>
        <form onSubmit={submitHandler.bind(this)}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler.bind(this)}
            value={name}
            size="30"
          />
          <br />

          <label htmlFor="description">Description: </label>
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

          <button type="submit">{submitButtonContent}</button>

          <button type="button" onClick={cancelButtonHandler.bind(this)}>
            Cancel
          </button>
        </form>

        {this.props.match.params.id !== 'add' && (
          <div>
            <hr />
            <p>Retire this Concept Class</p>
            <label htmlFor="retireReason">Reason: </label>
            <input
              type="text"
              id="retireReason"
              name="retireReason"
              onChange={retireReasonChangeHandler.bind(this)}
              value={retireReason}
            />
            <br />

            <button type="button" onClick={retireConceptClass.bind(this)}>
              Retire this Concept Class
            </button>
          </div>
        )}

        {this.props.match.params.id !== 'add' && (
          <div>
            <hr />
            <p>Permanently Delete Concept Class</p>
            <button type="button" onClick={deleteConceptClass.bind(this)}>
              Permanently Delete Concept Class
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(ModifyConceptClass);
