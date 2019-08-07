import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus, Target, Circle } from "react-feather";
import { Link } from "react-router-dom";

class ClientStatus extends Component {
  state = { tableData: { data: [] }, tableError: false, query: {} };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-column ">
            <h2 className="m-0 mr">Active clients</h2>{" "}
            <div className="d-flex flex-row">
              <h5 className="mb-0 mt-2">
                5,000 <small>Clients</small>
              </h5>
              <h5 className="mb-0 mt-2 mx-2">&bull;</h5>
              <h5 className="mb-0 mt-2">
                <small>Kshs</small> 200,000 <small>total</small>
              </h5>
            </div>
          </div>

          <div>
            <select className="form-control">
              <option value="">All clients</option>
              <option value="">Active clients</option>
              <option value="">Inactive clients</option>
              <option value="">Dormant clients</option>
            </select>
          </div>
        </div>

        <Filter
          // filter={[
          //   { name: "All clients", value: 0 }
          // ]}
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
            zone: d.zone.zone_name,
            action: (
              <>
                <Link
                  to={"/clientView/details/" + d.user_id}
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
        console.error(d);
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

export default ClientStatus;
