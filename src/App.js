import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/home";
import {
  ChevronLeft,
  Grid,
  Activity,
  User,
  MousePointer,
  LogOut
} from "react-feather";
import Login from "./pages/login";
import Users from "./pages/users";

// Configs
window.server = "http://197.254.22.228:3030";

// end Configs

if (localStorage.token) {
  window.user = JSON.parse(localStorage.user);
} else {
}

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Portal} />
    </Switch>
  );
}

class Portal extends Component {
  state = {};
  render() {
    if (localStorage.token === undefined) {
      this.props.history.push("/login");
    }
    return (
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-dark default-bg sidebar sidebar-dark accordion position-relative"
          id="accordionSidebar">
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">Neema lending</div>
          </Link>

          <div className="sidebar-heading">pages</div>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link d-flex flex-row align-items-center">
              <Grid color="white" />
              <span className="text-white ml-2">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/users"
              className="nav-link d-flex flex-row align-items-center">
              <User color="white" />
              <span className="text-white ml-2">Users</span>
            </Link>
          </li>

          <li className="nav-item muted">
            <Link
              to="/"
              className="nav-link d-flex flex-row align-items-center">
              <Activity color="white" />
              <span className="text-white ml-2">Progress reports</span>
            </Link>
          </li>

          <li className="nav-item muted">
            <Link
              to="/"
              className="nav-link d-flex flex-row align-items-center">
              <MousePointer color="white" />
              <span className="text-white ml-2">User behaviour</span>
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="nav-link d-flex flex-row align-items-center bg-transparent btn"
              onClick={() => {
                if (window.confirm("are you sure you want to logout?")) {
                  localStorage.clear();
                  this.props.history.push("/login");
                }
              }}>
              <LogOut color="white" />
              <span className="text-white ml-2">Logout</span>
            </button>
          </li>

          <div className="text-center d-none d-md-inline sidebarToggle w-100">
            <button className="rounded-circle border-0" id="sidebarToggle">
              <ChevronLeft color={"white"} />
            </button>
          </div>
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div className="bg-white d-flex flex-fill flex-column">
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
