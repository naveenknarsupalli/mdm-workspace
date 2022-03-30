import { Grid, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1)
    }
  }
}));

const initialValues = {
  aisToB: "",
  bisToA: "",
  description: "",
  retireReason: "",
  retired: false
};

const RelationshipForm = () => {
  const [values, setValues] = useState(initialValues);
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item XS={6}>
          <TextField
            variant="outlined"
            label="A is to B"
            value={values.aisToB}
          />
          <TextField
            variant="outlined"
            label="B is to A"
            value={values.bisToA}
          />
          <TextField
            variant="outlined"
            label="Description"
            value={values.description}
          />
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </form>
  );
};

export default RelationshipForm;
