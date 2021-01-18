import React from "react";
import { List } from "@material-ui/core";
import Task from "./Task";

function TaskList({ tasks, updateComplete, deleteTask }) {
  const displayTasks = (tasks) => {
    if (tasks.length > 0) {
      return (
        <List>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              updateComplete={updateComplete}
              deleteTask={deleteTask}
            />
          ))}
        </List>
      );
    } else {
      return <h3>Good job! Currently no task😃</h3>;
    }
  };

  return <>{displayTasks(tasks)}</>;
}

export default TaskList;
