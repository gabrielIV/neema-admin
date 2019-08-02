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
import _403 from "./img/403.png";
import _500 from "./img/500.jpg";
import clientEdit from "./pages/clients/clientEdit";
import loanView from "./pages/loanVIew";
import branchManagersAdd from "./pages/branchManagersAdd";
import branchManagerView from "./pages/branchManagerView";
import officerAdd from "./pages/officerAdd";
import zoneAdd from "./pages/zoneAdd";
import branchAdd from "./pages/branchAdd";

// Configs
window.server = "http://197.254.22.228:3030";

// window.zones = [];
// window.branches = [];

// end Configs
window.verifyNumber = n => {
  n = n + "";
  if (n[0] + n[1] + n[2] === "254") {
    return parseInt(n);
  } else {
    return parseInt("254" + parseInt(n));
  }
};

if (localStorage.token) {
  window.user = JSON.parse(localStorage.user);
} else {
}

class App extends Component {
  state = { loaded: false, status: 0, errorload: false };
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        {(this.state.loaded || !localStorage.token) && (
          <Route path="/" component={Portal} />
        )}
        {this.getStatus(this.state.status, this.state.errorload)}
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
        console.log(response);
        if (response.code) {
          this.setState({
            status: response.code,
            completeload: true,
            errorload: true
          });
          return false;
        }
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

    // fetch accounts
    fetch(`${window.server}/accounts`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        window.accounts = [
          { account_type_id: 0, description: "ALL", balance: 0 },
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
    if (window.zones && window.branches && window.accounts)
      this.setState({ loaded: true, errorload: true });
  };

  getStatus = () => {
    if (!this.state.errorload)
      return (
        <div className="loader h-100 w-100 d-flex flex-row align-items-center justify-content-center show-loader">
          <div class="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );

    if (this.state.status !== 0 && this.state.status !== 0) {
      if (this.state.status === 403) {
        return (
          <div className="loader h-100 w-100 d-flex flex-row align-items-center justify-content-center show-loader">
            <img src={_403} alt="" />
          </div>
        );
      } else {
        return (
          <div className="loader h-100 w-100 d-flex flex-row align-items-center justify-content-center show-loader">
            <img src={_500} alt="" />
          </div>
        );
      }
    }
  };
}

class Portal extends Component {
  state = {};
  render() {
    if (typeof localStorage.token === "undefined") {
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
            <div
              to="/notifications"
              className="nav-link d-flex flex-row align-items-center">
              <Bell color="white" size={18} />
              <span className="text-white ml-2">Notifications</span>
            </div>
            <div
              id="collapseUtilities"
              class="collapse show"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar">
              <div class="bg-white py-2 collapse-inner rounded">
                <Link class="collapse-item" to="/sms">
                  SMS
                </Link>
                <Link class="collapse-item" to="/emails">
                  Emails
                </Link>
              </div>
            </div>
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
            <Route path="/officerAdd" exact component={officerAdd} />
            <Route
              path="/branchManagerView/:path/:id"
              component={branchManagerView}
            />
            <Route path="/clientEdit" component={clientEdit} />
            <Route path="/loans" exact component={Loans} />
            <Route path="(/loanAdd|/loanAdd/:id)" component={LoanAdd} />
            <Route path="/loanView/:id" exact component={loanView} />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/notifications" exact component={Notifications} />
            <Route path="/officers" exact component={Officers} />
            <Route path="/branches" exact component={Branches} />
            <Route path="/branchAdd" exact component={branchAdd} />
            <Route path="/zones" exact component={Zones} />
            <Route path="/zoneAdd" exact component={zoneAdd} />
            <Route path="/branchManagers" exact component={BranchManagers} />
            <Route
              path="/branchManagersAdd"
              exact
              component={branchManagersAdd}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
