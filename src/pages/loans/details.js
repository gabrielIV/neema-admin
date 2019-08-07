import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Plus } from "react-feather";
import Filter from "../../components/filter";
import Table from "../../components/Table";

class loanDetails extends Component {
  state = { data: [{}], tableData: [] };
  render() {
    return (
      <div>
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
                {this.state.response && (
                  <>
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
                        <div className="d-flex flex-row align-items-center">
                          <div className="border avatar-lg bg-light d-flex flex-row align-items-center justify-content-center">
                            <span className="initials">
                              {this.state.response.data[0].client.full_names[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4>
                              {this.state.response.data[0].client.full_names}
                            </h4>
                            <div>
                              + {this.state.response.data[0].client.msisdn}
                            </div>
                            <div className="ml-2 mt-1">
                              <span className="badge badge-secondary px-1">
                                Client
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card mt-5">
                      <div className="card-header d-flex flex-row align-items-center justify-content-between">
                        <h5 className="font-weight-bold m-0">Credit officer</h5>

                        <Link
                          to={"/officerView/details/UAE9NNSUXW3"}
                          className="btn btn-sm btn-primary">
                          View
                        </Link>
                      </div>

                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <div className="border avatar-lg bg-light d-flex flex-row align-items-center justify-content-center">
                            <span className="initials">
                              {
                                this.state.response.data[0].officer
                                  .full_names[0]
                              }
                            </span>
                          </div>
                          <div className="ml-4">
                            <h4>
                              {this.state.response.data[0].officer.full_names}
                            </h4>
                            <div>
                              + {this.state.response.data[0].officer.msisdn}
                            </div>
                            <div className="ml-2 mt-1">
                              <span className="badge badge-secondary px-1">
                                Credit officer
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
            "Client Name": d.client.full_names,
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
        // response.data = data;
        this.setState({ data });
        console.log(data);
        this.setState({ response });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };
}

export default loanDetails;
