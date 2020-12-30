import React from "react";
import { Checkbox, IconButton, ListItem, Typography } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function Task({ task, updateComplete, deleteTask }) {
  function handleCheckboxClick(e) {
    updateComplete(e, task.id);
  }

  function handleRemoveClick(e) {
    deleteTask(task.id);
  }

  return (
    <ListItem>
      <Checkbox
        value={task.done}
        checked={task.done}
        onClick={handleCheckboxClick}
      />
      <Typography
        style={{
          textDecoration: task.done ? "line-through" : null,
        }}
      >
        {task.title}
      </Typography>
      <IconButton onClick={handleRemoveClick}>
        <HighlightOffIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}

export default Task;
