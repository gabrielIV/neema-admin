import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";
import { Target, DollarSign, TrendingDown } from "react-feather";
import moment from "moment";

class Sales extends Component {
  state = {
    tableData: { data: [] },
    tableError: false,
    query: {},
    totals: [
      {
        color: "material-blue",
        icon: <Target className="mr-4" />,
        label: "Target",
        amount: 0
      },
      {
        color: "material-green",
        icon: <DollarSign className="mr-4" />,
        label: "Sales",
        amount: 0
      },
      {
        icon: <TrendingDown className="mr-4" />,
        color: "material-red",
        label: "Arrears",
        amount: 0
      }
    ],
    totalsEndDate: moment().format("YYYY-MM-DD"),
    totalsStartDate: moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD")
  };
  timeout = null;
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h2 className="">Sales</h2>
          {/* <Link
            to="/clientAdd"
            className="option-card pr-3 d-flex flex-row btn align-items-center btn-primary btn-sm btn-round">
            <Plus size={18} /> <span className="pl-1">Loans</span>
          </Link> */}
        </div>

        <div className="row mb-5 mt-4">
          {this.state.totals.map((d, i) => (
            <div className="col-md-3" key={i}>
              <div className={"card text-white " + d.color}>
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  {d.icon}
                  <span className="title font-weight-bold">{d.label}</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small>
                      <small> Kshs</small>
                    </small>{" "}
                    {d.amount.toLocaleString()}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Filter
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
            sort="created_at"
            sortDirection={-1}
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

  fetchSales = () => {
    this.setState({ tableError: false });
    let urlParams = Object.entries(this.state.query)
      .map(e => e.join("="))
      .join("&");
    // console.log(urlParams);
    fetch(`${window.server}/transactions?${urlParams}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let data = [];

        response.data.map(d => {
          data.push({
            Time: d.created_at,
            transaction_id: d.transaction_id,
            description: d.description,
            "Cash Out": d.dr,
            "Cash in": d.cr,
            "New Balance": d.new_bal
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
        $t.fetchSales();
      }, 100);
    }
  }
}

export default Sales;
