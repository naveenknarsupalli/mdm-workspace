import { Link } from "react-router-dom";
import React from "react";
import RelationshipTypeList from "../components/relationshipType/RelationshipTypeList";
import { SECONDARY_LINK } from "../styles/bootstrap";
import RelationshipTypes from "../components/relationshipType/RelationshipTypes";
import RelationshipForm from "../components/relationshipType/RelationshipForm";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}));

function RelationshipTypePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h3>Patient Relationship Management</h3>
      <div className="text-center">
        <Link to="/relationshipType/add" className={SECONDARY_LINK}>
          Add Relationship Type
        </Link>
      </div>
      {/* <RelationshipTypeList /> */}
      <RelationshipTypes />

      <Paper className={classes.pageContent}>
        <RelationshipForm />
      </Paper>
    </React.Fragment>
  );
}

export default RelationshipTypePage;
