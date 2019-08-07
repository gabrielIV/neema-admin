import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus, Target, Circle } from "react-feather";
import { Link } from "react-router-dom";
import Chart from "../components/chart";

class Users extends Component {
  state = {
    tableData: { data: [] },
    tableError: false,
    query: {},
    status: [
      {
        value: 1,
        label: "Total clients",
        number: 2400,
        amount: "",
        color: "material-blue"
      },
      {
        value: 1,
        label: "Active clients",
        number: 2400,
        amount: 40000,
        color: "material-green"
      },
      {
        value: 1,
        label: "Cleared clients",
        number: 2400,
        amount: 40000,
        color: "material-teal"
      },
      {
        value: 1,
        label: "Inactive clients",
        number: 2400,
        amount: 40000,
        color: "material-orange"
      },
      {
        value: 1,
        label: "Dormant clients",
        number: 2400,
        amount: 40000,
        color: "material-deep-orange"
      },
      {
        value: 1,
        label: "Defaulted clients",
        number: 2400,
        amount: 40000,
        color: "material-red"
      }
    ]
  };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h2 className="font-weight-bol mb-0">Clients</h2>
          <Link
            to="/clientAdd"
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary btn-sm btn-round">
            <Plus size={18} /> <span className="pl-1">Add a Client</span>
          </Link>
        </div>

        <div className="row my-5 justify-content-center align-items-start">
          {this.state.status.map((d, i) => (
            <Link
              key={i}
              to={"/clientStatus/" + d.value}
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

        <div className="row">
          <div className="col-md-6">
            <Chart
              title="Clients"
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
                  label: "Active",
                  backgroundColor: "white",
                  borderColor: "#2196f3",
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
                  label: "Inactive",
                  borderColor: "#4caf50",
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
                  label: "Dormant",
                  borderColor: "#f44336",
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
                    9887,
                    7875,
                    8056,
                    9158
                  ]
                },
                {
                  fill: false,
                  label: "Defaulted",
                  borderColor: "#f44336",
                  backgroundColor: "white",
                  data: [
                    7116,
                    7384,
                    7586,
                    7948,
                    7116,
                    7384,
                    7586,
                    7948,
                    9111,
                    9620,
                    9887
                  ]
                },
                {
                  fill: false,
                  label: "Cleared",
                  borderColor: "#f44336",
                  backgroundColor: "white",
                  data: [
                    9158,
                    9504,
                    9613,
                    9636,
                    9742,
                    9760,
                    7948,
                    8271,
                    7116,
                    7384,
                    7586,
                    9009,
                    9111,
                    9620,
                    9887
                  ]
                }
              ]}
            />
          </div>

          <div className="col-md-6">
            <Chart
              title="Average growth rate"
              datasets={[
                {
                  ...this.state.chartDefaults,
                  label: "Total Clients",
                  data: [
                    4753,
                    4340,
                    25538,
                    48505,
                    30044,
                    38824,
                    24393,
                    30590,
                    44654,
                    48626,
                    23198,
                    29082
                  ]
                }
              ]}
            />
          </div>
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
      `${window.server}/users?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}&user_type=1`,
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
        response.data.map(d => {
          data.push({
            "User ID": d.user_id,
            "Full Name": d.full_names,
            email: d.email,
            gender: ["", "Male", "Female"][d.gender_id],
            identification: d.identification,
            "Marital status": ["", "Single", "Married"][d.marital_status_id],
            balance: d.balance,
            // identification_type: 1,
            "Phone Number": d.msisdn,
            zone: d.zones[0].zone_name,
            action: (
              <>
                <Link
                  to={"clientView/details/" + d.user_id}
                  className="btn btn-sm btn-primary">
                  View
                </Link>{" "}
              </>
            )
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
