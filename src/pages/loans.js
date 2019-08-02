import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";
import Chart from "../components/chart";

class Loans extends Component {
  state = { tableData: { data: [] }, tableError: false, query: {}, filter: {} };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h3 className="font-weight-bold">Loans</h3>
          <Link
            to={"/loanAdd/"}
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary  btn-round">
            <Plus size={18} /> <span className="pl-1">Add a Loan</span>
          </Link>
        </div>

        <div class="row mb-5 text-center mt-5">
          <div class="col-md-3">
            <div class="card icon tex-">
              <h1 class="text-center p-2">5,000</h1>
              <div class="card-header">Total Disbursed loans</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card icon tex-">
              <h1 class="text-center p-2">3,000</h1>
              <div class="card-header">Active loans</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card icon tex-">
              <h1 class="text-center p-2">2,430</h1>
              <div class="card-header">Repaid loans</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card icon ">
              <h1 class="text-center p-2">2,080</h1>
              <div class="card-header">Defaulted loans</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 my-5">
          <Chart
            title="Loans perfomance Analysis"
            filters={
              <div class="d-flex flex-row">
                <div class="mx-2 flex-column">
                  <small class="mb-2 font-weight-bold">Branch </small>
                  <select name="" id="" class="form-control py-1 filter-option">
                    <option value="0">ALL</option>
                    <option value="1">NAIROBI</option>
                    <option value="2">BranchNAME</option>
                    <option value="3">BranchNAME</option>
                    <option value="4">BranchNAME</option>
                  </select>
                </div>
                <div class="mx-2 flex-column">
                  <small class="mb-2 font-weight-bold">Zone </small>
                  <select name="" id="" class="form-control py-1 filter-option">
                    <option value="0">ALL</option>
                    <option value="1">ONFON ZONE</option>
                    <option value="2">TESTNAME</option>
                    <option value="3">TESTNAME</option>
                    <option value="4">TESTNAME</option>
                  </select>
                </div>
              </div>
            }
            datasets={[
              {
                fill: false,
                label: "Active loans",
                backgroundColor: "white",
                borderColor: "#4CAF50",
                data: [
                  7054,
                  7063,
                  7454,
                  7661,
                  7875,
                  8056,
                  9158,
                  9504,
                  9613,
                  9636,
                  9742,
                  9760
                ]
              },
              {
                fill: false,
                label: "Repaid loans",
                borderColor: "#f44336",
                backgroundColor: "white",
                data: [
                  7020,
                  7127,
                  7293,
                  7329,
                  7544,
                  7631,
                  7772,
                  8688,
                  8853,
                  8969,
                  9779,
                  9924
                ]
              },
              {
                fill: false,
                label: "Defaulted  loans",
                borderColor: "#E91E63",
                backgroundColor: "white",
                data: [
                  7116,
                  7384,
                  7586,
                  7948,
                  8271,
                  8307,
                  8573,
                  8740,
                  9009,
                  9111,
                  9620,
                  9887
                ]
              }
            ]}
          />
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
            "Client Name": d.client[0].full_names,
            "Amount disbursed":
              "kes " + d.loan_amount_disbursed.toLocaleString(),
            "Loan Amount": "kes " + d.loan_amount.toLocaleString(),
            Balance: "kes " + d.loan_amount_paid.toLocaleString(),
            "Loan Installments": d.loan_installments.toLocaleString(),
            action: (
              <>
                <Link
                  to={"loanView/" + d.loan_id}
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

export default Loans;
