import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import Filter from "../components/filter";
import * as moment from "moment";

import Table from "../components/Table";

class Accounts extends Component {
  state = { data: [{}], tableData: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <h2>Accounts</h2>
        </div>
        <div className="p-3">
          <div>
            {/* <Filter
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
        </div>
      </div>
    );
  }

  // componentDidMount = () => {
  //   this.fetch();
  // };

  fetch = () => {
    this.setState({ tableError: false });
    let urlParams = Object.entries(this.state.query)
      .map(e => e.join("="))
      .join("&");
    let id = this.props.match.params.id;
    console.log(urlParams);
    fetch(
      `${window.server}/accounts?${Object.entries(this.state.query)
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

        // response.data.map(d => {
        //   data.push({
        //     Time: moment(d.created_at).format("Do MMMM YYYY, h:mm:ss a"),
        //     transaction_id: d.transaction_id,
        //     description: d.description,
        //     "Cash Out": d.dr,
        //     "Cash in": d.cr,
        //     "New Balance": d.new_bal
        //     // id: 1,
        //     // account_id: 2,
        //     // loan_id: "LIHO2YTNZ",
        //     // user_id: "UMQ99A7F7UTZ3",
        //     // prev_bal: 0,
        //     // account_prev_bal: 100000,
        //     // account_new_bal: 102000,
        //     // updated_at: "2019-08-01T10:39:28.000Z"
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
        $t.fetch();
      }, 100);
    }
  }
}

export default Accounts;
