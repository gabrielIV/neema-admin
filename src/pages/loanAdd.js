import React, { Component } from "react";
import Form from "../components/form";
import { X, Trash, Plus, Check, CheckCircle, UserCheck } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";
import Map from "../components/map";
import Modal from "../components/modal";
import moment from "moment";

class loanAdd extends Component {
  state = {
    activeSlide: 0,
    files: [],
    details: {
      user_id: this.props.match.params.id,
      loan_amount: "",
      loan_end_date: "",
      officer_id: ""
    },
    guarantor: {
      guarantor_name: "",
      identification_type: "1",
      identification: "",
      guarantor_msisdn: ""
    },
    modalVisible: false,
    officermodalVisible: false,
    uploadSuccessful: false,
    collaterals: [],
    officerData: { data: [] },
    officerName: "",
    guarantorReady: false
  };
  collateralCount = 0;
  render() {
    return (
      <div>
        {/* <Map /> */}
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Create a loan</h3>
            <small className="text-muted ml-2">Clients > Add a Client</small>
          </div>
        </div>

        <Route
          path="/loanAdd/1"
          render={props => (
            <div>
              <div className="container">
                <h3>1. Loan details</h3>
              </div>

              <div className="pb-3 pt-5 bg-light border-top d-flex flex-fill">
                <div className="container ">
                  <div className="d-flex flex-row flex-wrap">
                    <div className="mx-3 d-inline-block mb-3">
                      <span className="ml-1 mb-2 d-block">Loan amout</span>
                      <input
                        type="text"
                        placeholder="..."
                        className="form-control text-input"
                        value={this.state.details.loan_amount.toLocaleString()}
                        onChange={e => {
                          let n = e.target.value;
                          if (n === "") {
                            n = "0";
                          }
                          let val = parseInt(n.replace(/,/g, ""));
                          if (!isNaN(val)) {
                            this.setState({
                              details: {
                                ...this.state.details,
                                loan_amount: val
                              }
                            });
                          }
                        }}
                      />
                    </div>

                    <div className="mx-3 d-inline-block mb-3">
                      <span className="ml-1 mb-2 d-block">
                        Number of Days
                        {/* {this.state.details.loan_end_date} */}
                      </span>
                      <input
                        type="number"
                        placeholder="..."
                        className="form-control text-input"
                        onChange={e => {
                          let date = moment()
                            .add(parseInt(e.target.value), "days")
                            .format("YYYY-MM-DD");

                          this.setState({
                            details: {
                              ...this.state.details,
                              loan_end_date: date
                            }
                          });
                        }}
                      />
                    </div>

                    <div className="mx-3 d-inline-block mb-3">
                      <span className="ml-1 mb-2 d-block">
                        Choose a loan officer
                      </span>
                      <input
                        type="text"
                        placeholder="..."
                        className="form-control text-input"
                        readonly
                        value={this.state.officerName}
                        onClick={() => {
                          this.setState({ officermodalVisible: true });
                        }}
                      />
                    </div>
                  </div>

                  <div className=" my-3 d-flex flex-row justify-content-between mt-5">
                    <button
                      className="btn btn-primary px-5  ml-3"
                      onClick={() => {
                        if (this.verify(this.state.details)) {
                          this.props.history.push(
                            "/loanAdd/2/" + this.props.match.params.id
                          );
                        }
                      }}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        <Route
          path="/loanAdd/2"
          render={props => (
            <div className="">
              <div className="container">
                <h3>2. Add loan Collateral</h3>
              </div>

              <div className="pb-3 pt-5 bg-light border-top d-flex flex-fill">
                <div className="container">
                  {this.state.collaterals.map((d, i) => (
                    <div
                      className="collateral-card p-3 mb-3 position-relative"
                      key={i}>
                      <X
                        className="icon position-absolute modal-close-icon m-2 mr-4"
                        onClick={() => {
                          let { collaterals } = this.state;
                          collaterals.splice(i, 1);
                          this.setState({ collaterals });
                        }}
                      />
                      <div className="mx-3 d-inline-block mb-3">
                        <span className="ml-1 mb-2 d-block">Item name</span>
                        <input
                          placeholder="..."
                          className="form-control text-input"
                          value={d.item_name}
                          onChange={e => {
                            let { collaterals } = this.state;
                            collaterals[i].item_name = e.target.value;
                            this.setState({ collaterals });
                          }}
                        />
                      </div>
                      <div className="mx-3 d-inline-block mb-3">
                        <span className="ml-1 mb-2 d-block">Quantity</span>
                        <input
                          type="number"
                          placeholder="..."
                          className="form-control text-input"
                          value={d.quantity}
                          onChange={e => {
                            let { collaterals } = this.state;
                            collaterals[i].quantity = e.target.value;
                            this.setState({ collaterals });
                          }}
                        />
                      </div>
                      <div className="mx-3 d-inline-block mb-3">
                        <span className="ml-1 mb-2 d-block">Serial Number</span>
                        <input
                          placeholder="..."
                          className="form-control text-input"
                          value={d.serial_no}
                          onChange={e => {
                            let { collaterals } = this.state;
                            collaterals[i].serial_no = e.target.value;
                            this.setState({ collaterals });
                          }}
                        />
                      </div>
                      <div className="mx-3 d-inline-block mb-3">
                        <span className="ml-1 mb-2 d-block">Total value</span>
                        <input
                          type="number"
                          placeholder="..."
                          className="form-control text-input"
                          value={d.amount}
                          onChange={e => {
                            let { collaterals } = this.state;
                            collaterals[i].amount = e.target.value;
                            this.setState({ collaterals });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-outline-primary px-5  ml-5"
                      onClick={() => {
                        let { collaterals } = this.state;
                        collaterals.push({
                          item_name: "",
                          quantity: 1,
                          amount: 0,
                          serial_no: ""
                        });
                        this.setState({
                          collaterals
                        });
                      }}>
                      Add collateral Item
                    </button>
                  </div>

                  <div className=" my-3 d-flex flex-row justify-content-between mt-5">
                    <button
                      className="btn btn-primary px-5  ml-3"
                      onClick={() =>
                        this.props.history.push(
                          "/loanAdd/3/" + this.props.match.params.id
                        )
                      }>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        <Route
          path="/loanAdd/3"
          render={props => (
            <div className="">
              <div className="container">
                <h3>3. Add loan Guarantor</h3>
              </div>

              <div className="pb-3 pt-5 bg-light border-top d-flex flex-fill">
                <div class="container">
                  <div class="mx-3 d-inline-block mb-4">
                    <span class="ml-1 mb-2 d-block">Enter phone number</span>
                    <div className="d-flex flex-row align-items-center">
                      <input
                        placeholder="..."
                        class="form-control text-input"
                        value={this.state.guarantor.guarantor_msisdn}
                        onChange={e => {
                          this.setState({
                            guarantor: {
                              ...this.state.guarantor,
                              guarantor_msisdn: e.target.value
                            },
                            newGuarantor: false,
                            guarantorReady: false
                          });
                        }}
                      />
                    </div>
                  </div>
                  {(this.state.newGuarantor || this.state.guarantorReady) && (
                    <div>
                      <div>
                        <div class="mx-3 d-inline-block mb-3">
                          <span class="ml-1 mb-2 d-block">Full name</span>
                          <input
                            placeholder="..."
                            class="form-control text-input"
                            value={this.state.guarantor.guarantor_name}
                            onChange={e => {
                              this.setState({
                                guarantor: {
                                  ...this.state.guarantor,
                                  guarantor_name: e.target.value
                                }
                              });
                            }}
                            readOnly={this.state.guarantorReady}
                          />
                        </div>
                      </div>

                      <div class="mx-3 d-inline-block mb-3">
                        <span class="ml-1 mb-2 d-block">
                          Identification Type
                        </span>
                        <select
                          readOnly={this.state.guarantorReady}
                          class="form-control"
                          value={this.state.guarantor.identification_type}
                          onChange={e => {
                            this.setState({
                              guarantor: {
                                ...this.state.guarantor,
                                identification_type: e.target.value
                              }
                            });
                          }}>
                          <option value="1">Identity Card</option>
                          <option value="2">Passport Number</option>
                        </select>
                      </div>
                      <div class="mx-3 d-inline-block mb-3">
                        <span class="ml-1 mb-2 d-block">ID number</span>
                        <input
                          placeholder="..."
                          class="form-control text-input"
                          type="number"
                          value={this.state.guarantor.identification}
                          readOnly={this.state.guarantorReady}
                          onChange={e => {
                            this.setState({
                              guarantor: {
                                ...this.state.guarantor,
                                identification: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                    {this.state.newGuarantor || this.state.guarantorReady ? (
                      <button
                        class="btn btn-primary px-5  ml-3"
                        onClick={() => {
                          this.props.history.push(
                            "/loanAdd/4/" + this.props.match.params.id
                          );
                        }}>
                        <span>Submit</span>
                      </button>
                    ) : (
                      <button
                        class="btn btn-primary px-5  ml-3"
                        onClick={() => {
                          this.checkGuarantor();
                        }}>
                        <span>Next</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        <Route
          path="/loanAdd/4"
          render={props => (
            <div className="p-3 bg-light pb-5">
              <div className="container">
                <h3>Verify Information</h3>

                <hr />

                {this.generateVerificationData()}
              </div>
              <div className="container text-center">
                <div className="mt-3">
                  <button
                    className="btn btn-primary px-5 mb-5 mt-3"
                    onClick={() => {
                      if (this.state.newGuarantor) {
                        this.addGuarantor();
                      } else {
                        this.addLoan();
                      }
                    }}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        />

        <Modal visible={this.state.modalVisible} dismiss={false}>
          <div>
            <div className="d-flex flex-row align-items-center">
              {this.state.uploadSuccessful ? (
                <CheckCircle color="#4caf50" size={64} />
              ) : (
                <div class="lds-spinner">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              )}
              <div className="ml-5 text-dark">
                {!this.state.uploadSuccessful ? (
                  <h3>Adding Loan ...</h3>
                ) : (
                  <h3>Loan added successfully</h3>
                )}
              </div>
            </div>
            {this.state.uploadSuccessful && (
              <div className="text-center">
                <Link
                  to={"/clientView/loans/" + this.props.match.params.id}
                  className="btn btn-primary mt-4 px-5">
                  Done
                </Link>
              </div>
            )}
          </div>
        </Modal>

        <Modal visible={this.state.officermodalVisible}>
          <div>
            <h4>Choose an officer</h4>
            <div className="mt-4 d-flex flex-row align-items-center">
              <input
                type="tel"
                placeholder="Enter officer phone number"
                className="form-control form-control-lg"
                onChange={e => {
                  this.setState({ officerNumber: e.target.value });
                }}
                // {...(this.state.guarantorReady ? { readonly: true } : {})}
              />
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  this.fetchOfficer(
                    window.verifyNumber(this.state.officerNumber)
                  );
                }}>
                Search
              </button>
            </div>

            <div className="officer-search mt-3">
              <ul class="list-group list-group-flush">
                {this.state.officerData.data.map((d, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      this.setState({
                        details: {
                          ...this.state.details,
                          officer_id: d.user_id
                        },
                        officerName: d.full_names,
                        officermodalVisible: false
                      });
                    }}
                    class="list-group-item list-group-item-action officer-option d-flex flex-row align-items-center">
                    <UserCheck />
                    <div className="ml-3">{d.full_names}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  generateVerificationData = () => {
    let data = {
      "Loan Details": {
        ...this.state.details,
        officer_name: this.state.officerName,
        loan_amount: "Kshs " + this.state.details.loan_amount.toLocaleString()
      },
      Collateral: this.state.collaterals,
      "Guarantor Details": this.state.guarantor
    };
    // console.log(data);
    let result = [];
    Object.keys(data).map(d => {
      result.push(
        <>
          <div className="">
            <h5 className="font-weight-bold text-capitalize">{d}</h5>
          </div>
          <div className="d-flex flex-row flex-wrap">
            {Object.keys(data[d]).map(d2 => this.getFileType(data[d][d2], d2))}
          </div>
          <hr className="mb-5" />
        </>
      );
    });
    return result;
  };

  getFileType = (data, title) => {
    // console.log(typeof data, title);
    if (typeof data === "string") {
      return (
        <div className="m-3 mx-5">
          <span className="mb-2 font-weight-bold text-capitalize text-muted">
            {title.replace("_id", "").replace(/_/g, " ")}
          </span>
          <div className="mt-2">{data}</div>
        </div>
      );
    } else if (typeof data === "object") {
      let result = [];
      // console.log(data);
      Object.keys(data).map(d => {
        result.push(
          <div className="m-3 mx-5">
            <div className="mb-2 font-weight-bold text-capitalize text-muted">
              {d.replace(/_/g, " ")}
            </div>

            <div className="d-flex flex-row flex-wrap">
              <div className="mt-2">{data[d]}</div>
            </div>
          </div>
        );
      });

      return (
        <div className="card d-flex flex-row flex-wrap mt-3">{result}</div>
      );
    } else if (typeof data === "file") {
      return (
        <div className="mx-5 m-3">
          <div className="mb-2 font-weight-bold text-capitalize text-muted">
            {title.replace("_id", "").replace(/_/g, " ")}
          </div>
          <div className="id-card d-flex flex-row align-items-center justify-content-center">
            {data !== "" && (
              <img src={URL.createObjectURL(data)} className="id-img" alt="" />
            )}
          </div>
        </div>
      );
    }
  };

  verify(data) {
    let result = true;
    let missing = [];
    Object.keys(data).map(d => {
      if (data[d] === "") {
        missing.push(d.replace("_id", "").replace(/_/g, " "));
        result = false;
      }
    });
    missing.join(", ");
    if (!result) alert("Please fill all the require fields : " + missing);
    return result;
  }

  addLoan = () => {
    this.setState({ modalVisible: true });
    fetch(`${window.server}/loans`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.details,
        user_id: this.props.match.params.id,
        guarantor_id: this.state.guarantor_id
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400 || response.code === 403) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          this.setState({ loan_id: response.loan_id });
          setTimeout(() => {
            this.state.collaterals.map(d => {
              this.addCollateral(d);
            });
            if (!this.state.collaterals) {
              this.setState({ uploadSuccessful: true });
            }
          }, 100);
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };

  addGuarantor = () => {
    this.setState({ modalVisible: true });
    fetch(`${window.server}/guarantors`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.details,
        user_id: this.props.match.params.id
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400 || response.code === 403) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          console.log(response);
          this.setState({ guarantor_id: response.guarantor_id });
          setTimeout(() => {
            this.addLoan();
          }, 100);
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };

  addCollateral = data => {
    this.setState({ modalVisible: true });
    fetch(`${window.server}/collaterals`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...data,
        loan_id: this.state.loan_id
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.code === 400 || response.code === 403) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          console.log(response);

          this.collateralCount++;
          if (this.collateralCount === this.state.collaterals.length) {
            this.setState({ uploadSuccessful: true });
          }
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };

  fetchOfficer = number => {
    fetch(`${window.server}/users?msisdn=${number}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (!response.data.length) {
          alert("Sorry no officer was found with that phone Number");
        }
        this.setState({ officerData: response });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };

  checkGuarantor = () => {
    fetch(
      `${window.server}/guarantors?guarantor_msisdn=${window.verifyNumber(
        this.state.guarantor.guarantor_msisdn
      )}`,
      {
        headers: {
          Authorization: localStorage.token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.code === 400) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          console.log(response);
          if (response.data.length) {
            let data = response.data[0];
            let guarantor = {
              guarantor_name: data.guarantor_name,
              identification_type: data.identification_type,
              identification: data.identification,
              guarantor_msisdn: data.guarantor_msisdn
            };
            console.log("guarant", guarantor);
            this.setState({
              guarantor_id: data.guarantor_id,
              guarantor,
              guarantorReady: true,
              newGuarantor: false
            });
          } else {
            alert(
              "This is a First time Guarantor. Please Fill in his/her Details to proceed "
            );
            this.setState({
              newGuarantor: true,
              guarantorReady: false,
              guarantor: {
                guarantor_name: "",
                identification_type: "1",
                identification: ""
              }
            });
          }
        }
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };
}

export default loanAdd;
