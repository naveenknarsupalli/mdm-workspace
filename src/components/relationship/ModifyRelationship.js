import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  deleteRelationshipById,
  getRelationshipById,
  postRelationship,
  putRelationshipById,
} from "../../api/services";

class ModifyRealationship extends React.Component {
  constructor(props) {
    super(props);
    const initialRelationshipState = {
      aIsToB: "",
      bIsToA: "",
      description: "",
      retireReason: "",
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
    if (relationshipId !== "add") {
      getRelationshipById(relationshipId)
        .then((response) => {
          this.setState({ relationship: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  aIsToBChangeHandler(event) {
    const { relationship } = this.state;
    relationship.aIsToB = event.target.value;
    this.setState({ relationship: relationship });
  }

  bIsToAChangeHandler(event) {
    const { relationship } = this.state;
    relationship.bIsToA = event.target.value;
    this.setState({ relationship: relationship });
  }

  descriptionChangeHandler(event) {
    const { relationship } = this.state;
    relationship.description = event.target.value;
    this.setState({ relationship: relationship });
  }

  saveRelationship() {
    const { relationshipId, relationship } = this.state;
    if (relationshipId === "add") {
      postRelationship(relationship)
        .then(() => {
          this.setState({ redirect: "/relationship" });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      putRelationshipById(relationshipId, relationship)
        .then(() => {
          this.setState({ redirect: "/relationship" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  retireReasonChangeHandler(event) {
    const { relationship } = this.state;
    relationship.retireReason = event.target.value;
    this.setState({ relationship: relationship });
  }

  retireRelationship() {
    const { relationshipId, relationship } = this.state;
    relationship.retired = true;
    this.setState({ relationship: relationship }, () => {
      putRelationshipById(relationshipId, relationship)
        .then(() => {
          this.setState({ redirect: "/relationship" });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  unretireRelationship() {
    const { relationshipId, relationship } = this.state;
    relationship.retireReason = "";
    relationship.retired = false;
    this.setState({ relationship: relationship }, () => {
      putRelationshipById(relationshipId, relationship)
        .then(() => {
          this.setState({ redirect: "/relationship" });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  deleteRelationship() {
    const { relationshipId } = this.state;
    deleteRelationshipById(relationshipId)
      .then(() => {
        this.setState({ redirect: "/relationship" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { relationship, relationshipId, redirect } = this.state;
    const {
      aIsToBChangeHandler,
      bIsToAChangeHandler,
      descriptionChangeHandler,
      saveRelationship,
      retireReasonChangeHandler,
      retireRelationship,
      unretireRelationship,
      deleteRelationship,
    } = this;

    if (redirect) return <Redirect to={redirect} />;

    return (
      <React.Fragment>
        <div>
          <label htmlFor="aIsToB">A is to B*: </label>
          <input
            type="text"
            id="aIsToB"
            name="aIsToB"
            value={relationship.aIsToB}
            onChange={aIsToBChangeHandler.bind(this)}
          />
          <br />

          <label htmlFor="bIsToA">B is to A*: </label>
          <input
            type="text"
            id="bIsToA"
            name="bIsToA"
            value={relationship.bIsToA}
            onChange={bIsToAChangeHandler.bind(this)}
          />
          <br />

          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            cols="20"
            value={relationship.description}
            onChange={descriptionChangeHandler.bind(this)}
          />
          <br />

          <button type="button" onClick={saveRelationship.bind(this)}>
            Save Relationship Type
          </button>
          <br />
        </div>

        {relationshipId !== "add" && !relationship.retired && (
          <div>
            <hr />
            <p>Retire Relationship Type</p>
            <label htmlFor="retireReason">Reason: </label>
            <input
              type="text"
              id="retireReason"
              name="retireReason"
              value={relationship.retireReason}
              onChange={retireReasonChangeHandler.bind(this)}
            />
            <br />

            <button type="button" onClick={retireRelationship.bind(this)}>
              Retire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipId !== "add" && relationship.retired && (
          <div>
            <hr />

            <p>Unretire Relationship Type</p>

            <button type="button" onClick={unretireRelationship.bind(this)}>
              Unretire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipId !== "add" && (
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
