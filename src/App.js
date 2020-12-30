import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TasksContainer from "./components/TaskItems/TasksContainer";
import { CssBaseline } from "@material-ui/core";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <br />
      <h1 className="App">Hey! What's the plan today?</h1>
      <TasksContainer />
    </>
  );
}
