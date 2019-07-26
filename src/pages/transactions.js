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
          filter={[
            { name: "All clients", value: 0 },
            { name: "Dormat clients", value: 20 },
            { name: "New clients", value: 20 },
            { name: "Served clients", value: 20 }
          ]}
          getFilter={filter => {
            setTimeout(() => {
              this.setState({
                query: { ...this.state.query, ...filter }
              });
              // console.log(this.state);
            }, 0);
          }}
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
        // let data = [];
        // let status = [
        //   "",
        //   <button className="btn btn-outline-primary btn-sm">
        //     Loan Created
        //   </button>,
        //   <button className="btn btn-primary btn-sm">Loan Active</button>,
        //   <button className="btn btn-success btn-sm">Loan Repaid</button>,
        //   <button className="btn btn-danger btn-sm">Loan Defaulted</button>
        // ];
        // response.data.map(d => {
        //   data.push({
        //     "Loan ID": d.loan_id,
        //     "Client Name": d.client[0].full_names,
        //     Amount: "kes " + d.loan_amount.toLocaleString(),
        //     "Amount disbursed":
        //       "kes " + d.loan_amount_disbursed.toLocaleString(),
        //     "Amount paid": "kes " + d.loan_amount_paid.toLocaleString(),
        //     "Loan Installments": d.loan_installments.toLocaleString(),
        //     "Start Date": d.loan_start_date,
        //     "End Date": d.loan_end_date,
        //     "Last payment date": d.last_repayment_date,
        //     "Loan Status": status[d.loan_status]
        //     // agent_id: 1
        //   });
        // });
        // response.data = data;
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
