import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Plus, Circle } from "react-feather";
import ClientLoans from "./clients/loans";
import ClientTransactions from "./clients/transactions";
import Tabs from "../components/tabs";
import BranchLoans from "./branchMangers/loans";
import BranchOfficers from "./branchMangers/officers";
import BranchManagerDetails from "./branchMangers/details";

import {
  Target,
  DollarSign,
  TrendingDown,
  User,
  Calendar
} from "react-feather";
import moment from "moment";

class ClientView extends Component {
  state = {
    currentRoute: "",
    status: [
      {
        value: 1,
        label: "Target",
        number: 2400,
        amount: 40000,
        color: "material-blue"
      },
      {
        value: 1,
        label: "Sales",
        number: 2400,
        amount: 40000,
        color: "material-green"
      },
      {
        value: 1,
        label: "Arrears",
        number: 2400,
        amount: 40000,
        color: "material-red"
      }
    ],
    totals: [
      {
        color: "material-blue",
        icon: <Target className="mr-4" />,
        label: "Target",
        amount: 0
      },
      {
        color: "material-green",
        icon: <DollarSign className="mr-4" />,
        label: "Sales",
        amount: 0
      },
      {
        icon: <TrendingDown className="mr-4" />,
        color: "material-red",
        label: "Arrears",
        amount: 0
      }
    ],
    totalsEndDate: moment().format("YYYY-MM-DD"),
    totalsStartDate: moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD")
  };
  render() {
    return (
      <div>
        <div className="text-mute pt-3 pl-3 d-flex flex-row justify-content-between">
          <small className="text-mute">Clients > View</small>
          <div className="position-relative d-flex flex-row mr-3">
            <select
              className="form-control"
              onChange={e => {
                this.setState({
                  totalsStartDate: moment()
                    .subtract(parseInt(e.target.value), "days")
                    .format("YYYY-MM-DD")
                });
                setTimeout(() => {
                  this.fetchSales();
                }, 0);
              }}>
              <option value="1">Yesterday</option>
              <option value="7">This week</option>
              <option value="30">last 30 days</option>
              <option value="90">last 90 days</option>
              <option value="180">last 6 months</option>
              <option value="365">last 1 year</option>
              <option value="7">last 5 years</option>
            </select>
          </div>
        </div>

        <div className="profile p-3 d-flex flex-row align-items-center row ">
          <div className="d-flex flex-row align-items-center col-md-3">
            <div className="border avatar-lg bg-light d-flex flex-row align-items-center justify-content-center">
              <span className="initials">
                {this.state.full_names ? this.state.full_names[0] : ""}
              </span>
            </div>
            <div className="ml-4">
              <h4>{this.state.full_names}</h4>
              <div>+ {this.state.msisdn}</div>
              <div className="ml-2 mt-1">
                <span className="badge badge-secondary px-1">Client</span>
              </div>
            </div>
          </div>

          {this.state.totals.map((d, i) => (
            <div className="col-md-3" key={i}>
              <div className={"card text-white " + d.color}>
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  {d.icon}
                  <span className="title font-weight-bold">{d.label}</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small>
                      <small> Kshs</small>
                    </small>{" "}
                    {d.amount.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Tabs
          tabs={[
            {
              label: "DETAILS",
              link:
                "/branchManagerView/details/" +
                this.props.match.params.id +
                "/" +
                this.props.match.params.branch
            },
            {
              label: "LOANS",
              link:
                "/branchManagerView/loans/" +
                this.props.match.params.id +
                "/" +
                this.props.match.params.branch
            },
            {
              label: "officers",
              link:
                "/branchManagerView/officers/" +
                this.props.match.params.id +
                "/" +
                this.props.match.params.branch
            },
            {
              label: "perfomance",
              link:
                "/branchManagerView/perfomance/" +
                this.props.match.params.id +
                "/" +
                this.props.match.params.branch
            }
          ]}>
          <Route
            path="/branchManagerView/details/:id/:branch"
            component={BranchManagerDetails}
          />
          <Route
            path="/branchManagerView/loans/:id/:branch"
            component={BranchLoans}
          />

          <Route
            path="/branchManagerView/officers/:id/:branch"
            component={BranchOfficers}
          />
          {/* <Route
            path="/branchManagerView/officers/:id/:branch"
            component={Perfoman}
          /> */}
        </Tabs>
      </div>
    );
  }

  componentDidMount = () => {
    this.fetch();
    this.fetchSales();
  };

  fetch = () => {
    let user_id = this.props.match.params.id;
    fetch(`${window.server}/users?user_id=${user_id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.data[0]);
        this.setState({ ...response.data[0] });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };

  fetchSales = () => {
    this.setState({ modalVisible: true });
    console.log(this.state.totalsStartDate);
    fetch(
      `${window.server}/utils/salestotals?&startdate=${
        this.state.totalsStartDate
      }&enddate=${this.state.totalsEndDate}&branch_code=${
        this.props.match.params.branch
      }`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400 || response.code === 403) {
        } else {
          let { totals } = this.state;
          Object.keys(response.data[0]).map((d, i) => {
            totals[i].amount = response.data[0][d];
          });
          this.setState({ totals });
        }
      })
      .catch(d => {
        console.error(d);
        this.setState({ modalVisible: false });
      });
  };
}

export default ClientView;
