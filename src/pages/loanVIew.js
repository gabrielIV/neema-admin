import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import Filter from "../components/filter";
import Table from "../components/Table";

class loanView extends Component {
  state = { data: [{}], tableData: [] };
  render() {
    return (
      <div>
        <div className="text-mute pt-3 pl-3">
          <small className="text-mute">Loans > View</small>
        </div>

        <div className="p-3">
          <div>
            <h3 className="font-weight-bold mb-5">Loan Details</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group user-details list-group-flush">
                  {Object.keys(this.state.data[0]).map(d => (
                    <li className="list-group-item d-flex flex-row list-group-item-action text-dark">
                      <div className="user-detail-title font-weight-bold text-capitalize">
                        {d}
                      </div>
                      <div>{this.state.data[0][d]}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-5 col-md-4">
                <div className="card">
                  <div className="card-header d-flex flex-row align-items-center justify-content-between">
                    <h5 className="font-weight-bold m-0"> Client</h5>

                    <Link
                      to="/clientView/details/UAE9NNSUXW3"
                      className="btn btn-sm btn-primary">
                      View
                    </Link>
                  </div>

                  <div className="card-body">
                    <div class="d-flex flex-row align-items-center">
                      <div class="border avatar-lg bg-light d-flex flex-row align-items-center justify-content-center">
                        <span class="initials">B</span>
                      </div>
                      <div class="ml-4">
                        <h4>Boniface Mwangi</h4>
                        <div>+ 254715229228</div>
                        <div class="ml-2 mt-1">
                          <span class="badge badge-secondary px-1">Client</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-5">
                  <div className="card-header d-flex flex-row align-items-center justify-content-between">
                    <h5 className="font-weight-bold m-0"> Agent</h5>

                    <Link
                      to={"officerView/details/UAE9NNSUXW3"}
                      className="btn btn-sm btn-primary">
                      View
                    </Link>
                  </div>

                  <div className="card-body">
                    <div class="d-flex flex-row align-items-center">
                      <div class="border avatar-lg bg-light d-flex flex-row align-items-center justify-content-center">
                        <span class="initials">S</span>
                      </div>
                      <div class="ml-4">
                        <h4>Simon wanjala</h4>
                        <div>+ 254715229228</div>
                        <div class="ml-2 mt-1">
                          <span class="badge badge-secondary px-1">Agent</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-weight-bold mt-5">Transactions</h3>
          </div>

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

  componentDidMount = () => {
    this.fetch();
  };

  fetch = () => {
    let user_id = this.props.match.params.id;
    fetch(`${window.server}/loans?loan_id=${user_id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
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
            "Loan ID": d.loan_id,
            "Start Date": d.loan_start_date,
            "End Date": d.loan_end_date,
            Description: "",
            "Client Name": d.client[0].full_names,
            "Amount disbursed":
              "kes " + d.loan_amount_disbursed.toLocaleString(),
            "Loan Amount": "kes " + d.loan_amount.toLocaleString(),
            Balance: "kes " + d.loan_amount_paid.toLocaleString(),
            "Loan Installments": d.loan_installments.toLocaleString(),
            "Last payment date": d.last_repayment_date,
            "Loan Status": status[d.loan_status]
            // agent_id: 1
          });
        });
        response.data = data;
        this.setState({ data });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };

  fetchClients = () => {
    this.setState({ tableError: false });
    let urlParams = Object.entries(this.state.query)
      .map(e => e.join("="))
      .join("&");
    console.log(urlParams);
    fetch(
      `${window.server}/transactions?${Object.entries(this.state.query)
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

export default loanView;
