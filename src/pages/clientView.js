import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Details from "./clients/details";
import { Plus } from "react-feather";
import ClientLoans from "./clients/loans";
import ClientTransactions from "./clients/transactions";
import Tabs from "../components/tabs";

class ClientView extends Component {
  state = { currentRoute: "" };
  render() {
    return (
      <div>
        <div className="text-mute pt-3 pl-3">
          <small className="text-mute">Clients > View</small>
        </div>

        <div className="profile p-3 d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center">
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
          <div className="d-flex flex-row justify-content-center">
            <Link
              to={"/clientEdit/" + this.props.match.params.id}
              className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary  btn-round mr-3">
              <Plus size={18} /> <span className="pl-1">Edit profile</span>
            </Link>

            <Link
              to={"/loanAdd/1/" + this.props.match.params.id}
              className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary  btn-round">
              <Plus size={18} /> <span className="pl-1">Add a Loan</span>
            </Link>
          </div>
        </div>

        <Tabs
          tabs={[
            {
              label: "DETAILS",
              link: "/clientView/details/" + this.props.match.params.id,
              component: Details
            },
            {
              label: "LOANS",
              link: "/clientView/loans/" + this.props.match.params.id,
              component: ClientLoans
            },
            {
              label: "TRANSCATIONS",
              link: "/clientView/transactions/" + this.props.match.params.id,
              component: ClientTransactions
            }
            // {
            //   label: "PERFOMANCE",
            //   link: "/clientView/perfomance/" + this.props.match.params.id,
            //   component:Perf
            // }
          ]}>
          <Route path="/clientView/details/:id" exact component={Details} />
          <Route path="/clientView/loans/:id" exact component={ClientLoans} />
          <Route
            path="/clientView/transactions/:id"
            exact
            component={ClientTransactions}
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
