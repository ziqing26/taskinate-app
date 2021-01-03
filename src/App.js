import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Drawer from "./components/Drawer";
import TasksContainer from "./components/TaskItems/TasksContainer";
import { CssBaseline } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import DataTable from "./components/DataTable";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Drawer />
        <main>
          <Toolbar />
          <Switch>
            <Route exact={true} path="/">
              <h1 align="center">Hey! What's the plan today?</h1>
              <TasksContainer />
            </Route>
            <Route path="/overview" component={DataTable} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}
