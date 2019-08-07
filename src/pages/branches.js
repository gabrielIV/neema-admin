import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";
import Chart from "../components/chart";

class Users extends Component {
  state = { tableData: { data: [] }, tableError: false, query: {} };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h3 className="font-weight-bold">Branches</h3>
          <Link
            to="/branchAdd"
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary btn-sm btn-round">
            <Plus size={18} /> <span className="pl-1">Create a New Branch</span>
          </Link>
        </div>

        <div className="col-md-6 my-5">
          <Chart
            title="Branches perfomance"
            filters={
              <div className="d-flex flex-row">
                <div className="mx-2 flex-column">
                  <small className="mb-2 font-weight-bold">Branch </small>
                  <select name="" id="" className="form-control py-1 filter-option">
                    <option value="0">ALL</option>
                    <option value="1">NAIROBI</option>
                    <option value="2">BranchNAME</option>
                    <option value="3">BranchNAME</option>
                    <option value="4">BranchNAME</option>
                  </select>
                </div>
              </div>
            }
            datasets={[
              {
                fill: false,
                label: "Branch 1",
                backgroundColor: "white",
                data: [
                  7021,
                  7159,
                  8026,
                  8491,
                  8558,
                  8581,
                  8675,
                  8912,
                  9223,
                  9457,
                  9595,
                  9754
                ]
              },
              {
                fill: false,
                label: "Branch 2",
                borderColor: "#f44336",
                backgroundColor: "white",
                data: [
                  7043,
                  7224,
                  7514,
                  7855,
                  8438,
                  8505,
                  8647,
                  9025,
                  9129,
                  9419,
                  9470,
                  9755
                ]
              },
              {
                ...this.state.chartDefaults,
                fill: false,
                label: "Branch 3",
                borderColor: "#E91E63",
                backgroundColor: "white",
                data: [
                  7153,
                  7329,
                  7681,
                  7720,
                  8061,
                  8310,
                  8326,
                  9063,
                  9127,
                  9337,
                  9707,
                  9763
                ]
              },
              {
                fill: false,
                label: "Branch 3",
                borderColor: "#673AB7",
                backgroundColor: "white",
                data: [
                  7422,
                  7963,
                  8057,
                  8155,
                  8350,
                  8373,
                  8477,
                  8853,
                  9406,
                  9487,
                  9691,
                  9703
                ]
              },
              {
                fill: false,
                label: "Branch 3",
                borderColor: "#2196F3",
                backgroundColor: "white",
                data: [
                  7394,
                  7549,
                  7987,
                  8392,
                  8406,
                  8414,
                  9106,
                  9407,
                  9817,
                  9822,
                  9877,
                  9886
                ]
              }
            ]}
          />
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
      `${window.server}/branches?${Object.entries(this.state.query)
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
