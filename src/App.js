import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import TasksContainer from "./components/TaskItems/TasksContainer";
import TagsContainer from "./components/TagsItems/TagsContainer";
import { CssBaseline } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import DataTable from "./components/DataTable";
import TagDetails from "./components/TagsItems/TagDetails";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 1,
    marginLeft: 0,
    marginRight: 0,
  },
  content: {
    paddingTop: "30px",
    paddingLeft: "300px",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        {/* <CssBaseline /> */}
        <SideBar />
        <main className={classes.content}>
          <Toolbar />
          {/* <TagArray /> */}

          <Switch>
            <Route exact path="/">
              <h1 align="center">Hey! What's the plan today?</h1>
              <TasksContainer />
            </Route>
            <Route exact path="/overview" component={DataTable} />
            <Route path="/tags/:tagId" component={TagDetails} />
            <Route exact path="/tags" component={TagsContainer} />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}
