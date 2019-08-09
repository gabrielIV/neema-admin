import React, { Component } from "react";
import Form from "../components/form";
import { X, Trash, Plus, Check, CheckCircle } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";
import Map from "../components/map";
import Modal from "../components/modal";

class clientAdd extends Component {
  state = {
    activeSlide: 0,
    files: [],
    details: {
      full_names: "",
      msisdn: "",
      email: "",
      gender_id: "1",
      password: "",
      identification_type: "1",
      identification: "",
      marital_status_id: "1",
      zone_id: "1"
    },
    documents: { IDFront: "", IDBack: "" },
    business: {
      business_name: "",
      business_registration_no: "",
      business_description: "",
      physical_address: ""
    },
    guarantor: {
      guarantor_name: "",
      identification_type: "1",
      identification: "",
      guarantor_msisdn: ""
    },
    modalVisible: false,
    uploadSuccessful: false
  };
  render() {
    return (
      <div>
        {/* <Map /> */}
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Client</h3>
            <small className="text-muted ml-2">Clients > Add a Client</small>
          </div>
        </div>

        <Route
          path="/clientAdd/1"
          render={props => (
            <div className="">
              <div className="container">
                <h3>1. Client details</h3>
              </div>
              <Form
                inputs={[
                  {
                    label: "Full name",
                    name: "full_names",
                    value: this.state.details.full_names
                  },
                  {
                    label: "Phone number",
                    name: "msisdn",
                    value: this.state.details.msisdn,
                    type: "tel"
                  },
                  {
                    label: "Email address",
                    name: "email",
                    value: this.state.details.email,
                    type: "email"
                  },
                  {
                    label: "Gender",
                    name: "gender_id",
                    value: this.state.details.gender_id,
                    type: "select",
                    options: [
                      { name: "Male", value: 1 },
                      { name: "Female", value: "2" }
                    ]
                  },
                  //   { label: "", name: "user_type", value: "1" },
                  {
                    label: "Password",
                    name: "password",
                    value: this.state.details.password,
                    type: "password"
                  },
                  { type: "break" },
                  {
                    label: "Identification Type",
                    name: "identification_type",
                    value: this.state.details.identification_type,
                    type: "select",
                    options: [
                      { name: "Identity Card", value: 1 },
                      { name: "Passport Number", value: 2 }
                    ]
                  },
                  {
                    label: "ID number",
                    name: "identification",
                    value: this.state.details.identification
                  },
                  {
                    label: "Marital status",
                    name: "marital_status_id",
                    value: this.state.details.marital_status_id,
                    type: "select",
                    options: [
                      { name: "Single", value: 1 },
                      { name: "Married", value: 2 }
                    ]
                  },
                  {
                    label: "Zone",
                    name: "zone_id",
                    value: this.state.details.zone_id,
                    type: "select",
                    options: [
                      ...window.zones.map((d, i) => {
                        return { name: d.zone_name, value: d.id };
                      })
                    ]
                  }
                ]}
                submit={data => {
                  // console.log(data);
                  this.setState({ details: data });
                  setTimeout(() => {
                    if (this.verify(data)) {
                      props.history.push("/clientAdd/2");
                    }
                  }, 0);
                }}
              />
            </div>
          )}
        />

        <Route
          path="/clientAdd/2"
          render={props => (
            <div>
              <div className="container">
                <h3>2. Documents</h3>
              </div>

              <div className="bg-light py-5">
                <div className="container">
                  <div className="d-flex flex-row flex-wrap">
                    <div>
                      <h5 className="ml-1 mb-2 d-block font-weight-bold">
                        ID front
                      </h5>
                      <label className="id-card d-flex flex-row align-items-center justify-content-center">
                        <input
                          type="file"
                          placeholder="..."
                          className="form-control p-1 d-none"
                          accept="image/*"
                          onChange={e => {
                            this.setState({
                              documents: {
                                ...this.state.documents,
                                IDFront: e.target.files[0]
                              }
                            });
                          }}
                        />

                        <div className="d-flex flex-row align-items-center text-dark">
                          <Plus />
                          <h5 className="ml-2 mb-0">Chooose a file</h5>
                        </div>

                        {this.state.documents.IDFront !== "" && (
                          <img
                            src={URL.createObjectURL(
                              this.state.documents.IDFront
                            )}
                            className="id-img"
                            alt=""
                          />
                        )}
                      </label>
                    </div>

                    <div className="ml-5">
                      <h5 className="ml-1 mb-2 d-block font-weight-bold">
                        ID Back
                      </h5>
                      <label className="id-card d-flex flex-row align-items-center justify-content-center">
                        <input
                          type="file"
                          placeholder="..."
                          className="form-control p-1 d-none"
                          accept="image/*"
                          onChange={e => {
                            this.setState({
                              documents: {
                                ...this.state.documents,
                                IDBack: e.target.files[0]
                              }
                            });
                          }}
                        />

                        <div className="d-flex flex-row align-items-center text-dark">
                          <Plus />
                          <h5 className="ml-2 mb-0">Chooose a file</h5>
                        </div>

                        {this.state.documents.IDBack !== "" && (
                          <img
                            src={URL.createObjectURL(
                              this.state.documents.IDBack
                            )}
                            className="id-img"
                            alt=""
                          />
                        )}
                      </label>
                    </div>
                  </div>

                  <div className=" my-3 d-flex flex-row justify-content-between mt-5">
                    <button
                      className="btn btn-primary px-5  ml-3"
                      onClick={() => {
                        if (this.verify(this.state.documents)) {
                          props.history.push("/clientAdd/3");
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
          path="/clientAdd/3"
          render={props => (
            <div>
              <div className="container d-flex flex-row justify-content-between align-items-center mb-3">
                <h3>3. Add a Business</h3>
              </div>

              <div className="py-3 bg-light border-top d-flex flex-fill">
                <div className="container">
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">Business Name</span>
                    <input
                      placeholder="..."
                      className="form-control text-input"
                      value={this.state.business.business_name}
                      onChange={e => {
                        this.setState({
                          business: {
                            ...this.state.business,
                            business_name: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">
                      Business Registration Number
                    </span>
                    <input
                      placeholder="..."
                      className="form-control text-input"
                      value={this.state.business.business_registration_no}
                      onChange={e => {
                        this.setState({
                          business: {
                            ...this.state.business,
                            business_registration_no: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">
                      Business Description
                    </span>
                    <textarea
                      rows="5"
                      type="textarea"
                      placeholder="..."
                      className="form-control text-input"
                      value={this.state.business.business_description}
                      onChange={e => {
                        this.setState({
                          business: {
                            ...this.state.business,
                            business_description: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">Physical Address</span>
                    <input
                      placeholder="..."
                      className="form-control text-input"
                      value={this.state.business.physical_address}
                      onChange={e => {
                        this.setState({
                          business: {
                            ...this.state.business,
                            physical_address: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
                  <hr className="my-4 mx-3" />

                  <div className="d-flex flex-row">
                    <div className="ml-3">
                      <span className="ml-1 mb-2 d-block">
                        Store Front Photo
                      </span>
                      <label className="id-card d-flex flex-row align-items-center justify-content-center">
                        <input
                          type="file"
                          placeholder="..."
                          className="form-control p-1 d-none"
                          accept="image/*"
                          onChange={e => {
                            this.setState({
                              StoreFront: e.target.files[0]
                            });
                          }}
                        />

                        <div className="d-flex flex-row align-items-center text-dark">
                          <Plus />
                          <h5 className="ml-2 mb-0">Chooose a file</h5>
                        </div>

                        {this.state.StoreFront && (
                          <img
                            src={URL.createObjectURL(this.state.StoreFront)}
                            className="id-img"
                            alt=""
                          />
                        )}
                      </label>
                    </div>
                  </div>

                  <div
                    className=" my-3 d-flex flex-row justify-content-between mt-5"
                    onClick={() => {
                      if (this.verify(this.state.business)) {
                        props.history.push("/clientAdd/4");
                      }
                    }}>
                    <button className="btn btn-primary px-5  ml-3">Next</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        <Route
          path="/clientAdd/4"
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
                    onClick={() => this.addClient()}>
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
                  <h3>Adding user ...</h3>
                ) : (
                  <h3>User added successfully</h3>
                )}
              </div>
            </div>
            {this.state.uploadSuccessful && (
              <div className="text-center">
                <Link
                  to="/clientStatus/1"
                  className="btn btn-primary mt-4 px-5">
                  Done
                </Link>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }

  generateVerificationData = () => {
    let data = {
      "Client Details": {
        ...this.state.details,
        gender_id: { "1": "Male", "2": "Female" }[this.state.details.gender_id],
        identification_type: { "1": "National ID card", "2": "Passport" }[
          this.state.details.identification_type
        ],
        marital_status_id: { "1": "Single", "2": "Married" }[
          this.state.details.marital_status_id
        ],
        zone_id: "1"
      },
      Documents: this.state.documents,
      "Business Details": this.state.business
    };
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
    } else {
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

  addClient = () => {
    this.setState({ modalVisible: true });
    fetch(`${window.server}/users`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.details)
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        if (response.code === 400) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          console.log(response);
          this.setState({ user_id: response.user_id });
          setTimeout(() => {
            this.addBusiness();
          }, 100);
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };

  addBusiness = () => {
    console.log(
      JSON.stringify({
        ...this.state.business,
        user_id: this.state.user_id
      })
    );
    fetch(`${window.server}/client-business`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.business,
        user_id: this.state.user_id
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        if (response.code === 400) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          this.uploadDocuments();
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };

  uploadDocuments = () => {
    let formData = new FormData();

    formData.append("files", this.state.documents.IDFront);
    formData.append("files", this.state.documents.IDBack);
    formData.append("user_id", this.state.user_id);
    formData.append("document_type", "1");

    fetch(`${window.server}/uploads`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400) {
          alert(
            response.message +
              " \n " +
              (response.errors[0] ? response.errors[0].message : "")
          );
          this.setState({ modalVisible: false });
        } else {
          this.setState({ uploadSuccessful: true });
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };
}

export default clientAdd;
