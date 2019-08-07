import React, { Component } from "react";
import Table from "../../components/Table";
import Filter from "../../components/filter";
import { Plus, Circle } from "react-feather";
import { Link } from "react-router-dom";

class LoanStatus extends Component {
  state = {
    tableData: { data: [] },
    tableError: false,
    query: {},
    filter: {}
  };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-column ">
            <h2 className="m-0 mr">Active loans</h2>
            <div>
              <h5 className="mb-0 mt-2">5,000 total</h5>
            </div>
          </div>

          <div>
            <select className="form-control">
              <option value="">All loans</option>
              <option value="">Active loans</option>
              <option value="">Inactive loans</option>
              <option value="">Dormant loans</option>
            </select>
          </div>
        </div>

        <Filter
          filter={[
            { label: "All", name: "All", value: 0 },
            { label: "Created loans", name: "loan_status", value: 1 },
            { label: "Active loans", name: "loan_status", value: 2 },
            { label: "Repaid loans", name: "loan_status", value: 3 },
            { label: "Defaulted loans", name: "loan_status", value: 4 }
          ]}
          getFilter={filter => {
            console.log(filter);
            setTimeout(() => {
              this.setState({
                filter: { ...filter }
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
    let obj = { ...this.state.query, ...this.state.filter };
    this.setState({ tableError: false });
    let urlParams = Object.entries(obj)
      .map(e => e.join("="))
      .join("&");

    fetch(`${window.server}/loans?${urlParams}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
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
            "Start Date": d.loan_start_date,
            "Loan ID": d.loan_id,
            Description: "",
            "Client Name": d.client.full_names,
            "Amount disbursed":
              "kes " + d.loan_amount_disbursed.toLocaleString(),
            "Loan Amount": "kes " + d.loan_amount.toLocaleString(),
            Balance: "kes " + d.loan_amount_paid.toLocaleString(),
            "Loan Installments": d.loan_installments.toLocaleString(),
            action: (
              <>
                <Link
                  to={"/loanView/details/" + d.loan_id}
                  className="btn btn-sm btn-primary">
                  View
                </Link>{" "}
              </>
            )
            // "End Date": d.loan_end_date,
            // "Last payment date": d.last_repayment_date,
            // "Loan Status": status[d.loan_status]
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
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      let $t = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        $t.fetchClients();
      }, 100);
    }
  }
}

export default LoanStatus;
