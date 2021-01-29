import { Route, Switch } from "react-router-dom";
import SideBar from "./SideBar";
import TasksContainer from "./TaskItems/TasksContainer";
import TagsContainer from "./TagsItems/TagsContainer";
import Toolbar from "@material-ui/core/Toolbar";
import OverviewTable from "./OverviewTable";
import TagTable from "./TagsItems/TagTable";
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
    paddingTop: "25px",
    paddingLeft: "240px",
    display: "center",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Welcome(props) {
  const classes = useStyles();
  return (
    <Route>
      <SideBar />
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path="/welcome">
            <h1 align="center">Hey! What's your plan for today?</h1>
            <TasksContainer />
          </Route>
          <Route path="/overview" component={OverviewTable} />
          <Route path="/tags/:tagId" component={TagTable} />
          <Route exact path="/tags" component={TagsContainer} />
        </Switch>
      </main>
    </Route>
  );
}
