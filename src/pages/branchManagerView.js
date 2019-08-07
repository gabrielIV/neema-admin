import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Plus, Circle } from "react-feather";
import ClientLoans from "./clients/loans";
import ClientTransactions from "./clients/transactions";
import Tabs from "../components/tabs";
import BranchLoans from "./branchMangers/loans";
import BranchOfficers from "./branchMangers/officers";
import BranchManagerDetails from "./branchMangers/details";

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
    ]
  };
  render() {
    return (
      <div>
        <div className="text-mute pt-3 pl-3">
          <small className="text-mute">Clients > View</small>
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

          {this.state.status.map(d => (
            <Link
              to={"/loanStatus/" + d.value}
              className="col-md-3 mb-3 icon btn">
              <div className={"card client-status text-white " + d.color}>
                <div className="card-header trg-header d-flex flex-row align-items-center justify-content-between">
                  <Circle className="" />
                  <span className="title font-weight-bold">{d.label}</span>
                  <Circle className="opacity-0" />
                </div>
                <div className="card-body text-white text-center">
                  <h3 className="font-weight-bold">
                    {d.number.toLocaleString()}
                  </h3>
                  {d.amount !== "" && (
                    <span>Kshs {d.amount.toLocaleString()} Total</span>
                  )}
                  {d.amount === "" && <br />}
                </div>
              </div>
            </Link>
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
        </Tabs>
      </div>
    );
  }

  componentDidMount = () => {
    this.fetch();
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
}

export default ClientView;
