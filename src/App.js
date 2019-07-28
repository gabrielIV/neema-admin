import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/home";
import {
  ChevronLeft,
  Grid,
  Activity,
  User,
  User as UsersIcon,
  MousePointer,
  LogOut,
  DollarSign,
  Bell,
  UserCheck,
  Target,
  List,
  Share2
} from "react-feather";
import Login from "./pages/login";
import Users from "./pages/clients";
import Loans from "./pages/loans";
import Transactions from "./pages/transactions";
import Notifications from "./pages/notifications";
import Officers from "./pages/officers";
import Branches from "./pages/branches";
import Zones from "./pages/zones";
import clientAdd from "./pages/clientAdd";
import BranchManagers from "./pages/branchManagers";
import ClientView from "./pages/clientView";
import LoanAdd from "./pages/loanAdd";

// Configs
window.server = "http://197.254.22.228:3030";

// end Configs

if (localStorage.token) {
  window.user = JSON.parse(localStorage.user);
} else {
}

class App extends Component {
  state = { loaded: false };
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {(this.state.loaded || !localStorage.token) && (
          <Route path="/" component={Portal} />
        )}
      </Switch>
    );
  }

  componentDidMount = () => {
    // fetch zones
    fetch(`${window.server}/zone`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        window.zones = [
          { id: 0, zone_name: "ALL", zone_code: "ALL", branch_id: 0 },
          ...response.data
        ];
        this.checkStatus();
      })
      .catch(d => {
        console.log(d);
      });

    // fetch branches
    fetch(`${window.server}/branches`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        window.branches = [
          { id: 0, branch_name: "ALL", branch_code: "ALL" },
          ...response.data
        ];
        this.checkStatus();
      })
      .catch(d => {
        console.log(d);
      });
  };

  checkStatus = () => {
    // console.log(window.zones, window.branches);
    if (window.zones && window.branches) this.setState({ loaded: true });
  };
}

class Portal extends Component {
  state = {};
  render() {
    if (typeof localStorage.token === "undefined") {
      this.props.history.push("/login");
      alert("undefined");
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
            <div className="sidebar-brand-text text-left">Neema lending</div>
          </Link>

          <div className="sidebar-heading">pages</div>
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link d-flex flex-row align-items-center">
              <Grid color="white" size={18} />
              <span className="text-white ml-2">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/clients"
              className="nav-link d-flex flex-row align-items-center">
              <UsersIcon color="white" size={18} />
              <span className="text-white ml-2">Users</span>
            </Link>
            <div
              id="collapseUtilities"
              class="collapse show"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar">
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">listing:</h6>
                <Link class="collapse-item" to="/clients">
                  Clients
                </Link>
                <Link class="collapse-item" to="/branchManagers">
                  Branch Managers
                </Link>
                <Link class="collapse-item" to="/officers">
                  Officers
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <Link
              to="/loans"
              className="nav-link d-flex flex-row align-items-center">
              <DollarSign color="white" size={18} />
              <span className="text-white ml-2">Loans</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/transactions"
              className="nav-link d-flex flex-row align-items-center">
              <List color="white" size={18} />
              <span className="text-white ml-2">Transactions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/notifications"
              className="nav-link d-flex flex-row align-items-center">
              <Bell color="white" size={18} />
              <span className="text-white ml-2">Notifications</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/branches"
              className="nav-link d-flex flex-row align-items-center">
              <Share2 color="white" size={18} />
              <span className="text-white ml-2">Branches</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/zones"
              className="nav-link d-flex flex-row align-items-center">
              <Target color="white" size={18} />
              <span className="text-white ml-2">Zones</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              to="/zones"
              className="nav-link d-flex flex-row align-items-center">
              <Grid color="white" size={18} />
              <span className="text-white ml-2">Zones</span>
            </Link>
          </li> */}
          {/* 
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities">
              <i class="fas fa-fw fa-wrench" />
              <span>Categories</span>
            </a>
            <div
              id="collapseUtilities"
              class="collapse show"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar">
              <div class="bg-white py-2 collapse-inner rounded">
                <h6 class="collapse-header">listing:</h6>
                <span class="collapse-item">Manufacturing</span>
                <span class="collapse-item">Service Industry</span>
                <span class="collapse-item">Transport</span>

                <span class="collapse-item">Agriculture</span>
                <span class="collapse-item">Food Industry</span>
              </div>
            </div>
          </li> */}

          <li className="nav-item">
            <button
              className="nav-link d-flex flex-row align-items-center bg-transparent btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  localStorage.clear();
                  this.props.history.push("/login");
                }
              }}>
              <LogOut color="white" size={18} />
              <span className="text-white ml-2">Logout</span>
            </button>
          </li>

          {/* <div className="text-center d-none d-md-inline sidebarToggle w-100">
            <button className="rounded-circle border-0" id="sidebarToggle">
              <ChevronLeft color={"white"} />
            </button>
          </div> */}
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div className="bg-white d-flex flex-fill flex-column">
            <Route path="/" exact component={Home} />
            <Route path="/clients" exact component={Users} />
            <Route path="/clientAdd" exact component={clientAdd} />
            <Route path="/clientView/:path/:id" component={ClientView} />
            <Route path="/loans" exact component={Loans} />
            <Route path="/loanAdd/:id" exact component={LoanAdd} />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/notifications" exact component={Notifications} />
            <Route path="/officers" exact component={Officers} />
            <Route path="/branches" exact component={Branches} />
            <Route path="/zones" exact component={Zones} />
            <Route path="/branchManagers" exact component={BranchManagers} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
