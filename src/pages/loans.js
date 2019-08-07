import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus, Circle } from "react-feather";
import { Link } from "react-router-dom";
import Chart from "../components/chart";

class Loans extends Component {
  state = {
    tableData: { data: [] },
    tableError: false,
    query: {},
    filter: {},
    status: [
      {
        value: 1,
        label: "Total Loans",
        number: 2400,
        amount: "",
        color: "material-blue"
      },
      {
        value: 1,
        label: "Active Loans",
        number: 2400,
        amount: 40000,
        color: "material-green"
      },
      {
        value: 1,
        label: "Prepaid Loans",
        number: 2400,
        amount: 40000,
        color: "material-teal"
      },
      {
        value: 1,
        label: "Inactive Loans",
        number: 2400,
        amount: 40000,
        color: "material-orange"
      },
      {
        value: 1,
        label: "Dormant Loans",
        number: 2400,
        amount: 40000,
        color: "material-deep-orange"
      },
      {
        value: 1,
        label: "Defaulted Loans",
        number: 2400,
        amount: 40000,
        color: "material-red"
      },
      {
        value: 1,
        label: "Pending Loans",
        number: 2400,
        amount: 40000,
        color: "material-deep-purple"
      }
    ]
  };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h2 className="">Loans</h2>
          <Link
            to={"/loanAdd/"}
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary  btn-round">
            <Plus size={18} /> <span className="pl-1">Add a Loan</span>
          </Link>
        </div>

        <div className="row my-5 justify-content-center align-items-start">
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

        <div className="col-md-6 my-5">
          <Chart
            title="Loans perfomance Analysis"
            filters={
              <div className="d-flex flex-row">
                <div className="mx-2 flex-column">
                  <small className="mb-2 font-weight-bold">Branch </small>
                  <select
                    name=""
                    id=""
                    className="form-control py-1 filter-option">
                    <option value="0">ALL</option>
                    <option value="1">NAIROBI</option>
                    <option value="2">BranchNAME</option>
                    <option value="3">BranchNAME</option>
                    <option value="4">BranchNAME</option>
                  </select>
                </div>
                <div className="mx-2 flex-column">
                  <small className="mb-2 font-weight-bold">Zone </small>
                  <select
                    name=""
                    id=""
                    className="form-control py-1 filter-option">
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
