import React from "react";
import { Link } from "react-router-dom";
import { IconButton, ListItem, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function TagsItem({ tag, deleteTag }) {
  function handleRemoveClick(e) {
    deleteTag(tag.id);
    window.location.reload(false);
  }
  return (
    <ListItem>
      <Link to={`/tags/${tag.id}`}>
        <Typography>{tag.name}</Typography>
      </Link>
      <IconButton onClick={handleRemoveClick}>
        <HighlightOffIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}

export default TagsItem;
