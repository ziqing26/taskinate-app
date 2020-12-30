import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

//const LOCAL_STORAGE_KEY = "taskinate-app-tasks";

function TasksContainer() {
  const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   const storageTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (storageTasks) {
  //     setTasks(storageTasks);
  //   }
  // }, []);
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  // }, [tasks]);
  // function createTask(task) {
  //   if( !task.target.value === ""){
  //     setTasks([task, ...tasks]);}
  // }

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    axios
      .get("api/v1/tasks")
      .then((response) => {
        console.log(response);
        setTasks(response.data);
      })
      .catch((error) => console.log(error));
  };

  const createTask = (e) => {
    axios
      .post("/api/v1/tasks/", { title: e, done: false })
      .then((response) => {
        setTasks([response, ...tasks]);
        getAllTasks();
      })
      .catch((error) => console.log(error));
  };

  function updateComplete(e, id) {
    console.log(e.target.checked);
    console.log(id);
    axios
      .put(`/api/v1/tasks/${id}`, { done: e.target.checked })
      .then((response) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === id) {
              return { ...task, done: !task.done };
            }
            return task;
          })
        );
      })
      .catch((error) => console.log(error));
  }

  function deleteTask(id) {
    axios
      .delete(`/api/v1/tasks/${id}`)
      .then((response) => {
        console.log("deleted");
      })
      .catch((error) => console.log(error));
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignContent="center">
        <Typography
          style={{ padding: 16 }}
          component={"span"}
          variant={"body2"}
        >
          <TaskForm createTask={createTask} />
          <TaskList
            tasks={tasks}
            updateComplete={updateComplete}
            deleteTask={deleteTask}
          />
        </Typography>
      </Grid>
    </>
  );
}

export default TasksContainer;
