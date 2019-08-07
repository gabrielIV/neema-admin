import React, { Component } from "react";
import Table from "../../components/Table";
import Filter from "../../components/filter";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";

class BranchOfficers extends Component {
  state = { tableData: { data: [] }, tableError: false, query: {} };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        {/* <Filter
          branches={true}
          zone={true}
          getFilter={filter => {
            setTimeout(() => {
              this.setState({
                query: { ...this.state.query, ...filter }
              });
              // console.log(this.state);
            }, 0);
          }}
        /> */}
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
    console.log(
      `${window.server}/users?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}&user_type=2&branch_code=` + this.props.match.params.branch
    );
    fetch(
      `${window.server}/users?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}&user_type=2&branch_code=` + this.props.match.params.branch,
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
            "Agent ID": d.agent_id,
            "Full Name": d.full_names,
            email: d.email,
            gender: ["", "Male", "Female"][d.gender_id],
            identification: d.identification,
            "Marital status": ["", "Single", "Married"][d.marital_status_id],
            balance: d.balance,
            // identification_type: 1,
            "Phone Number": d.msisdn,
            zone: d.zone ? d.zone.zone_name : "",
            action: (
              <>
                <Link
                  to={"/officerView/details/" + d.user_id}
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

export default BranchOfficers;
