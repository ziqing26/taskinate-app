import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Registrations/Login";
import Signup from "./components/Registrations/Signup";
import TasksContainer from "./components/TaskItems/TasksContainer";
import TagsContainer from "./components/TagsItems/TagsContainer";
import TagTable from "./components/TagsItems/TagTable";
import OverviewTable from "./components/OverviewTable";
import SideBar from "./components/SideBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  content: {
    paddingTop: "30px",
    paddingLeft: "250px",
    display: "center",
  },
});

axios.defaults.baseURL = "https://taskinate-api.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: [],
    };
  }
  componentDidMount() {
    this.loginStatus();
  }
  loginStatus = () => {
    axios
      .get("/api/v3/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
    console.log(this.state.user);
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: [],
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  userData={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            {/* <Route
              exact
              path="/welcome"
              render={(props) => (
                <Welcome
                  {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  userData={this.state.user}
                />
              )}
            /> */}
            <Route>
              <SideBar />
              <Toolbar />
              <main className={classes.content}>
                <br />
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
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default withStyles(styles)(App);
