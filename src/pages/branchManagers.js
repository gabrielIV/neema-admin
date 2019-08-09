import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus, Circle } from "react-feather";
import { Link } from "react-router-dom";
import Chart from "../components/chart";

class BranchManagers extends Component {
  state = {
    tableData: { data: [] },
    tableError: false,
    query: {},
    status: [
      {
        value: 1,
        label: "Total Loans",
        number: 2400,
        amount: "",
        color: "material-indigo"
      },
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
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h2 className="">Branch managers</h2>
          <Link
            to="/branchManagersAdd"
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary btn-sm btn-round">
            <Plus size={18} />
            <span className="pl-1">Add a Branch manager</span>
          </Link>
        </div>

        <Filter
          branches={true}
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
      `${window.server}/users?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}&user_type=3`,
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
            Branch: d.zone.branch.branch_name,
            action: (
              <>
                <Link
                  to={
                    "branchManagerView/details/" +
                    d.user_id +
                    "/" +
                    d.zone.branch.branch_code
                  }
                  className="btn btn-sm btn-primary">
                  View
                </Link>
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

export default BranchManagers;
