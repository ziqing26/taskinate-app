import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TagBox({ taglist, rowData, updateTags }) {
  const classes = useStyles();
  const handleChange = (event, value, rowData) => {
    updateTags(event, value, rowData);
  };
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id={rowData.id.toString()}
        options={taglist}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option, value) => option.name === value.name}
        defaultValue={rowData.tags}
        value={rowData.tags}
        onChange={(event, value) => handleChange(event, value, rowData)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            // label="Multiple values"
            placeholder="Add"
          />
        )}
      />
    </div>
  );
}
