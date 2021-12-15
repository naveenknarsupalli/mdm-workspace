import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {
  deleteRelationshipById,
  getRelationshipById,
  createRelationship,
  updateRelationshipById,
} from '../../api/services';

class ModifyRealationship extends React.Component {
  constructor(props) {
    super(props);
    const initialRelationshipState = {
      aisToB: '',
      bisToA: '',
      description: '',
      retireReason: '',
      retired: false,
    };

    this.state = {
      relationship: initialRelationshipState,
      relationshipId: this.props.match.params.id,
      redirect: null,
    };
  }

  componentDidMount() {
    const { relationshipId } = this.state;
    if (relationshipId !== 'add') {
      getRelationshipById(relationshipId)
        .then((response) => {
          this.setState({ relationship: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  aisToBChangeHandler(event) {
    const { relationship } = this.state;
    relationship.aisToB = event.target.value;
    this.setState({ relationship });
  }

  bisToAChangeHandler(event) {
    const { relationship } = this.state;
    relationship.bisToA = event.target.value;
    this.setState({ relationship });
  }

  descriptionChangeHandler(event) {
    const { relationship } = this.state;
    relationship.description = event.target.value;
    this.setState({ relationship });
  }

  saveRelationship() {
    const { relationshipId, relationship } = this.state;
    if (relationshipId === 'add') this.createRelationshipWithData(relationship);
    else this.updateRelationshipWithData(relationshipId, relationship);
  }

  createRelationshipWithData(relationship) {
    createRelationship(relationship)
      .then(() => {
        this.setState({ redirect: '/relationship' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateRelationshipWithData(relationshipId, relationship) {
    updateRelationshipById(relationshipId, relationship)
      .then(() => {
        this.setState({ redirect: '/relationship' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  retireReasonChangeHandler(event) {
    const { relationship } = this.state;
    relationship.retireReason = event.target.value;
    this.setState({ relationship });
  }

  retireRelationship() {
    const { relationshipId, relationship } = this.state;
    relationship.retired = true;
    this.setState({ relationship }, () => {
      this.updateRelationshipWithData(relationshipId, relationship);
    });
  }

  unretireRelationship() {
    const { relationshipId, relationship } = this.state;
    relationship.retireReason = '';
    relationship.retired = false;
    this.setState({ relationship }, () => {
      this.updateRelationshipWithData(relationshipId, relationship);
    });
  }

  deleteRelationship() {
    const { relationshipId } = this.state;
    deleteRelationshipById(relationshipId)
      .then(() => {
        this.setState({ redirect: '/relationship' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getValueFor(field) {
    return field === null ? '' : field;
  }

  render() {
    const { relationship, relationshipId, redirect } = this.state;
    const {
      aisToBChangeHandler,
      bisToAChangeHandler,
      descriptionChangeHandler,
      saveRelationship,
      retireReasonChangeHandler,
      retireRelationship,
      unretireRelationship,
      deleteRelationship,
      getValueFor,
    } = this;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <React.Fragment>
        <div>
          <label htmlFor="aisToB">
            A is to B*:
            <input
              type="text"
              id="aisToB"
              name="aisToB"
              value={getValueFor(relationship.aisToB)}
              onChange={aisToBChangeHandler.bind(this)}
            />
          </label>
          <br />

          <label htmlFor="bisToA">
            B is to A*:
            <input
              type="text"
              id="bisToA"
              name="bisToA"
              value={getValueFor(relationship.bisToA)}
              onChange={bisToAChangeHandler.bind(this)}
            />
          </label>
          <br />

          <label htmlFor="description">
            Description:
            <textarea
              id="description"
              name="description"
              rows="3"
              cols="20"
              value={getValueFor(relationship.description)}
              onChange={descriptionChangeHandler.bind(this)}
            />
          </label>
          <br />

          <button type="button" onClick={saveRelationship.bind(this)}>
            Save Relationship Type
          </button>
          <br />
        </div>

        {relationshipId !== 'add' && !relationship.retired && (
          <div>
            <hr />

            <p>Retire Relationship Type</p>

            <label htmlFor="retireReason">
              Reason:
              <input
                type="text"
                id="retireReason"
                name="retireReason"
                value={getValueFor(relationship.retireReason)}
                onChange={retireReasonChangeHandler.bind(this)}
              />
            </label>
            <br />

            <button type="button" onClick={retireRelationship.bind(this)}>
              Retire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipId !== 'add' && relationship.retired && (
          <div>
            <hr />

            <p>Unretire Relationship Type</p>

            <button type="button" onClick={unretireRelationship.bind(this)}>
              Unretire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipId !== 'add' && (
          <div>
            <hr />

            <p>Delete Relationship Type Forever</p>

            <button type="button" onClick={deleteRelationship.bind(this)}>
              Delete Relationship Type Forever
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(ModifyRealationship);
