import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import Filter from "../../components/filter";
import * as moment from "moment";

import Table from "../../components/Table";

class loanCollateral extends Component {
  state = { data: [{}], tableData: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <div>
            <Filter
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

    fetch(
      `${window.server}/collaterals?${Object.entries(this.state.query)
        .map(e => e.join("="))
        .join("&")}&loan_id=${id}`,
      {
        headers: {
          Authorization: localStorage.token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);

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

export default loanCollateral;
