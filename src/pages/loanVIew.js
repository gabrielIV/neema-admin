import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";

import Tabs from "../components/tabs";
import loanDetails from "./loans/details";
import loanTransactions from "./loans/transactons";
import loanCollateral from "./loans/collateral";

class loanView extends Component {
  state = { data: [{}], tableData: [] };
  render() {
    return (
      <div className="w-100">
        <Tabs
          tabs={[
            {
              label: "details",
              link: "/loanView/details/" + this.props.match.params.id
            },
            {
              label: "transactions",
              link: "/loanView/transactions/" + this.props.match.params.id
            },
            {
              label: "collateral",
              link: "/loanView/collateral/" + this.props.match.params.id
            }
          ]}>
          <Route path="/loanView/details/:id" exact component={loanDetails} />
          <Route
            path="/loanView/transactions/:id"
            exact
            component={loanTransactions}
          />
          <Route
            path="/loanView/collateral/:id"
            exact
            component={loanCollateral}
          />
        </Tabs>
      </div>
    );
  }
}

export default loanView;
