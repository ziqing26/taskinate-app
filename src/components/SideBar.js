import React, { useState, useEffect } from "react";
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
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import TagsContainer from "./TagsItems/TagsContainer";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const drawerWidth = 240;
const primary = "#b2ebf2";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: primary,
    color: "#212121",
    zIndex: theme.zIndex.drawer + 1,
    flexGrow: 2,
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
  axios.defaults.baseURL = "https://taskinate-api.herokuapp.com";

  const classes = useStyles();
  const history = useHistory();
  const [userData, setUserData] = useState({
    isLoggedIn: true,
    user: [],
  });

  useEffect(() => {
    loginStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loginStatus = () => {
    axios
      .get("/api/v3/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          handleLogin(response);
        } else {
          handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  const handleLogin = (data) => {
    setUserData({
      isLoggedIn: true,
      user: data.user,
    });
    console.log(userData);
  };

  const handleLogout = () => {
    setUserData({
      isLoggedIn: false,
      user: {},
    });
  };

  const handleClick = () => {
    // window.location.reload(false);
    axios
      .delete("/api/v3/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <AssignmentTurnedInIcon />
          <Typography variant="h6" className={classes.title}>
            <Box
              fontWeight="fontWeightBold"
              fontFamily="Monospace"
              fontSize={24}
            >
              Taskinate
            </Box>
          </Typography>
          <Link to="/logout" onClick={handleClick}>
            <Button color="inherit">Logout</Button>
          </Link>
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
                <HomeRoundedIcon />
              </ListItemIcon>
              <Link to="/welcome">
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ViewListRoundedIcon />
              </ListItemIcon>
              <Link to="/overview">
                <ListItemText primary="Overview" />
              </Link>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <Accordion elevation={1} defaultExpanded={true}>
                <Link to="/tags">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    // aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <ListItemIcon>
                      <LocalOfferOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText> Tags </ListItemText>
                  </AccordionSummary>
                </Link>
                <AccordionDetails>
                  <TagsContainer />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
