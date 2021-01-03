import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const drawerWidth = 240;

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Taskinate
          </Typography>
          <Button color="inherit">About</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <Link to="/">
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <Link to="/overview">
                <ListItemText primary="Overview" />
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Tags" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      {/* <main className={classes.content}>
        <Toolbar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <h1 align="center">Hey! What's the plan today?</h1>
              <TasksContainer />
            </Route>
            <Route path="/overview">
              <DataTable />
            </Route>
          </Switch>
        </BrowserRouter>
      </main> */}
    </div>
  );
}
