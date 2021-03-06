import { Redirect, withRouter } from "react-router-dom";
import {
  createRelationshipType,
  deleteRelationshipTypeById,
  getRelationshipTypeById,
  updateRelationshipTypeById
} from "../../api/services";

import React from "react";
import _ from "lodash";

class ModifyRelationshipType extends React.Component {
  constructor(props) {
    super(props);
    const initialRelationshipTypeState = {
      aisToB: "",
      bisToA: "",
      description: "",
      retireReason: "",
      retired: false
    };

    this.state = {
      relationshipType: initialRelationshipTypeState,
      relationshipTypeId: this.props.match.params.id,
      redirect: null
    };
  }

  componentDidMount() {
    const { relationshipTypeId } = this.state;
    if (relationshipTypeId !== "add") {
      getRelationshipTypeById(relationshipTypeId)
        .then((response) => {
          this.setState({ relationshipType: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  aisToBChangeHandler(event) {
    const { relationshipType } = this.state;
    relationshipType.aisToB = event.target.value;
    this.setState({ relationshipType });
  }

  bisToAChangeHandler(event) {
    const { relationshipType } = this.state;
    relationshipType.bisToA = event.target.value;
    this.setState({ relationshipType });
  }

  descriptionChangeHandler(event) {
    const { relationshipType } = this.state;
    relationshipType.description = event.target.value;
    this.setState({ relationshipType });
  }

  saveRelationshipType() {
    const { relationshipTypeId, relationshipType } = this.state;
    if (relationshipTypeId === "add")
      this.createRelationshipTypeWithData(relationshipType);
    else
      this.updateRelationshipTypeWithData(relationshipTypeId, relationshipType);
  }

  createRelationshipTypeWithData(relationshipType) {
    createRelationshipType(relationshipType)
      .then(() => {
        this.setState({ redirect: "/relationshipType" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateRelationshipTypeWithData(relationshipTypeId, relationshipType) {
    updateRelationshipTypeById(relationshipTypeId, relationshipType)
      .then(() => {
        this.setState({ redirect: "/relationshipType" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  retireReasonChangeHandler(event) {
    const { relationshipType } = this.state;
    relationshipType.retireReason = event.target.value;
    this.setState({ relationshipType });
  }

  retireRelationshipType() {
    const { relationshipTypeId, relationshipType } = this.state;
    relationshipType.retired = true;
    this.setState({ relationshipType }, () => {
      this.updateRelationshipTypeWithData(relationshipTypeId, relationshipType);
    });
  }

  unretireRelationshipType() {
    const { relationshipTypeId, relationshipType } = this.state;
    relationshipType.retireReason = "";
    relationshipType.retired = false;
    this.setState({ relationshipType }, () => {
      this.updateRelationshipTypeWithData(relationshipTypeId, relationshipType);
    });
  }

  deleteRelationshipType() {
    const { relationshipTypeId } = this.state;
    deleteRelationshipTypeById(relationshipTypeId)
      .then(() => {
        this.setState({ redirect: "/relationshipType" });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getValueFor(field) {
    return field === null ? "" : field;
  }

  render() {
    const { relationshipType, relationshipTypeId, redirect } = this.state;
    const {
      aisToBChangeHandler,
      bisToAChangeHandler,
      descriptionChangeHandler,
      saveRelationshipType,
      retireReasonChangeHandler,
      retireRelationshipType,
      unretireRelationshipType,
      deleteRelationshipType,
      getValueFor
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
              value={_.get(relationshipType, "aisToB", "")}
              // value={getValueFor(relationshipType.aisToB)}
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
              value={getValueFor(relationshipType.bisToA)}
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
              value={getValueFor(relationshipType.description)}
              onChange={descriptionChangeHandler.bind(this)}
            />
          </label>
          <br />

          <button type="button" onClick={saveRelationshipType.bind(this)}>
            Save Relationship Type
          </button>
          <br />
        </div>

        {relationshipTypeId !== "add" && !relationshipType.retired && (
          <div>
            <hr />

            <p>Retire Relationship Type</p>

            <label htmlFor="retireReason">
              Reason:
              <input
                type="text"
                id="retireReason"
                name="retireReason"
                value={getValueFor(relationshipType.retireReason)}
                onChange={retireReasonChangeHandler.bind(this)}
              />
            </label>
            <br />

            <button type="button" onClick={retireRelationshipType.bind(this)}>
              Retire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipTypeId !== "add" && relationshipType.retired && (
          <div>
            <hr />

            <p>Unretire Relationship Type</p>

            <button type="button" onClick={unretireRelationshipType.bind(this)}>
              Unretire Relationship Type
            </button>
            <br />
          </div>
        )}

        {relationshipTypeId !== "add" && (
          <div>
            <hr />

            <p>Delete Relationship Type Forever</p>

            <button type="button" onClick={deleteRelationshipType.bind(this)}>
              Delete Relationship Type Forever
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(ModifyRelationshipType);
