import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import TasksContainer from "./components/TaskItems/TasksContainer";
import TagsContainer from "./components/TagsItems/TagsContainer";
// import { CssBaseline } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import OverviewTable from "./components/OverviewTable";
import TagTable from "./components/TagsItems/TagTable";
import { makeStyles } from "@material-ui/core/styles";
import SignIn from "./components/Authentication/SignIn";

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
    paddingTop: "25px",
    paddingLeft: "240px",
    display: "center",
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
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <Route>
            <SideBar />
            <main className={classes.content}>
              <Toolbar />

              <Switch>
                <Route exact path="/">
                  <h1 align="center">Hey! What's the plan today?</h1>
                  <TasksContainer />
                </Route>
                <Route path="/overview" component={OverviewTable} />
                <Route path="/tags/:tagId" component={TagTable} />
                <Route exact path="/tags" component={TagsContainer} />
              </Switch>
            </main>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
