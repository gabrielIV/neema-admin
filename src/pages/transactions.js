import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";

class Users extends Component {
  state = { tableData: { data: [] }, tableError: false, query: {} };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h3 className="font-weight-bold">Transactions</h3>
          {/* <Link
            to="/clientAdd"
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary btn-sm btn-round">
            <Plus size={18} /> <span className="pl-1">Loans</span>
          </Link> */}
        </div>

        <Filter
          getFilter={filter => {
            setTimeout(() => {
              this.setState({
                query: { ...this.state.query, ...filter }
              });
              // console.log(this.state);
            }, 0);
          }}
          filter={window.accounts.map(d => {
            return {
              label: d.description,
              name: "account_id",
              value: d.account_type_id
            };
          })}
        />
        <div className="mt-4">
          <Table
            data={this.state.tableData}
            fetch={params => {
              this.setState({ query: { ...this.state.query, ...params } });
            }}
            fetchError={this.state.tableError}
          />
        </div>
      </div>
    );
  }

  fetchClients = () => {
    this.setState({ tableError: false });
    let urlParams = Object.entries(this.state.query)
      .map(e => e.join("="))
      .join("&");
    console.log(urlParams);
    fetch(
      `${window.server}/transactions?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}`,
      {
        headers: {
          Authorization: localStorage.token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let data = [];
        let status = [
          "",
          <button className="btn btn-outline-primary btn-sm">
            Loan Created
          </button>,
          <button className="btn btn-primary btn-sm">Loan Active</button>,
          <button className="btn btn-success btn-sm">Loan Repaid</button>,
          <button className="btn btn-danger btn-sm">Loan Defaulted</button>
        ];
        response.data.map(d => {
          data.push({
            Time: d.created_at,
            transaction_id: d.transaction_id,
            description: d.description,
            "Cash Out": d.dr,
            "Cash in": d.cr,
            "New Balance": d.new_bal
            // id: 1,
            // account_id: 2,
            // loan_id: "LIHO2YTNZ",
            // user_id: "UMQ99A7F7UTZ3",
            // prev_bal: 0,
            // account_prev_bal: 100000,
            // account_new_bal: 102000,
            // updated_at: "2019-08-01T10:39:28.000Z"
            // agent_id: 1
          });
        });
        response.data = data;
        this.setState({ tableData: response });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.state.query) !== JSON.stringify(prevState.query)) {
      let $t = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        $t.fetchClients();
      }, 100);
    }
  }
}

export default Users;
