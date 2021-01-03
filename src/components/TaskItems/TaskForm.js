import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
// import { v4 as uuidv4 } from "uuid";
//import axios from "axios";

function TaskForm({ createTask }) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    done: false,
  });

  function handleTaskInputChange(e) {
    setTask({ ...task, title: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (task.title !== "") {
      createTask(task.title);
      setTask({ ...task, title: "" });
    }
  }

  return (
    <form className="taskform" onSubmit={handleSubmit}>
      <TextField
        label="Add Task"
        className="taskform-input"
        name="task"
        type="text"
        value={task.title || ""}
        onChange={handleTaskInputChange}
      />
      <Button style={{ padding: 16 }} type="submit">
        Submit
      </Button>
    </form>
  );
}

export default TaskForm;
