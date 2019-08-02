import React, { Component } from "react";
import Form from "../../components/form";
import { X, Trash, Plus } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";

class clientAdd extends Component {
  state = { activeSlide: 3, files: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Client</h3>
            <small className="text-muted ml-2">Clients > Add a Client</small>
          </div>
        </div>
        {this.state.activeSlide === 0 && (
          <div className="">
            <div className="container">
              <h3>1. Client details</h3>
            </div>
            <Form
              inputs={[
                {
                  label: "Full name",
                  name: "full_names",
                  value: "Boniface Mbaria"
                },
                {
                  label: "Phone number",
                  name: "msisdn",
                  value: "254715229228"
                },
                {
                  label: "Email address",
                  name: "email",
                  value: "bndibx@gmail.com",
                  type: "email"
                },
                {
                  label: "Gender",
                  name: "gender_id",
                  value: "1",
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
                  value: "qwerty",
                  type: "password"
                },
                { type: "break" },
                {
                  label: "Identification Type",
                  name: "identification_type",
                  value: "1",
                  type: "select",
                  options: [
                    { name: "Identity Card", value: 1 },
                    { name: "Passport Number", value: 2 }
                  ]
                },
                {
                  label: "ID number",
                  name: "identification",
                  value: "29495518"
                },
                {
                  label: "Marital status",
                  name: "marital_status_id",
                  value: "1",
                  type: "select",
                  options: [
                    { name: "Single", value: 1 },
                    { name: "Married", value: 2 }
                  ]
                },
                {
                  label: "Zone",
                  name: "zone_id",
                  value: "1",
                  type: "select",
                  options: [
                    ...window.zones.map((d, i) => {
                      return { name: d.zone_name, value: d.id };
                    })
                  ]
                }
              ]}
              submit={data => this.setState({ activeSlide: 1 })}
            />
          </div>
        )}

        {this.state.activeSlide === 1 && (
          <div>
            <div className="container">
              <h3>2. Documents</h3>
            </div>

            <div className="bg-light py-5">
              <div class="container">
                {/* <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Add a file</span>
                  <input
                    type="file"
                    placeholder="..."
                    class="form-control p-1"
                    value=""
                    accept="image/*"
                    onChange={e => {
                      this.setState({
                        files: [...this.state.files, e.target.files[0]]
                      });
                    }}
                  />
                </div>
                <div className="p-3 d-flex flex-row flex-wrap">
                  {this.state.files.map((d, i) => (
                    <div className="m-2 card document-card" key={i}>
                      <X
                        color="gray"
                        className="remove-document"
                        onClick={() => {
                          let { files } = this.state;
                          files.splice(i, 1);
                          this.setState({ files });
                        }}
                      />
                      <img
                        src={URL.createObjectURL(d)}
                        className="document-img"
                        alt=""
                      />
                    </div>
                  ))}
                </div> */}

                <div className="d-flex flex-row flex-wrap">
                  <div>
                    <h5 class="ml-1 mb-2 d-block font-weight-bold">ID front</h5>
                    <label class="id-card d-flex flex-row align-items-center justify-content-center">
                      <input
                        type="file"
                        placeholder="..."
                        class="form-control p-1 d-none"
                        value=""
                        accept="image/*"
                        onChange={e => {
                          this.setState({
                            IDfront: e.target.files[0]
                          });
                        }}
                      />

                      <div className="d-flex flex-row align-items-center text-dark">
                        <Plus />
                        <h5 className="ml-2 mb-0">Chooose a file</h5>
                      </div>

                      {this.state.IDfront && (
                        <img
                          src={URL.createObjectURL(this.state.IDfront)}
                          className="id-img"
                          alt=""
                        />
                      )}
                    </label>
                  </div>

                  <div className="ml-5">
                    <h5 class="ml-1 mb-2 d-block font-weight-bold">ID Back</h5>
                    <label class="id-card d-flex flex-row align-items-center justify-content-center">
                      <input
                        type="file"
                        placeholder="..."
                        class="form-control p-1 d-none"
                        value=""
                        accept="image/*"
                        onChange={e => {
                          this.setState({
                            IDBack: e.target.files[0]
                          });
                        }}
                      />

                      <div className="d-flex flex-row align-items-center text-dark">
                        <Plus />
                        <h5 className="ml-2 mb-0">Chooose a file</h5>
                      </div>

                      {this.state.IDBack && (
                        <img
                          src={URL.createObjectURL(this.state.IDBack)}
                          className="id-img"
                          alt=""
                        />
                      )}
                    </label>
                  </div>
                </div>

                <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                  <button
                    class="btn btn-primary px-5  ml-3"
                    onClick={() => this.setState({ activeSlide: 2 })}>
                    Submit
                  </button>
                  <button class="btn btn-outline-primary px-5  ml-5">
                    Reset form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.activeSlide === 2 && (
          <div>
            <div className="container d-flex flex-row justify-content-between align-items-center mb-3">
              <h3>3. Add a Business</h3>

              <button
                class="btn btn-primary px-5  ml-3"
                onClick={() => this.setState({ activeSlide: 3 })}>
                Skip
              </button>
            </div>

            <div class="py-3 bg-light border-top d-flex flex-fill">
              <div class="container">
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Business Name</span>
                  <input
                    placeholder="..."
                    class="form-control text-input"
                    value="Business"
                  />
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">
                    Business Registration Number
                  </span>
                  <input
                    placeholder="..."
                    class="form-control text-input"
                    value="112345678"
                  />
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Business Description</span>
                  <input
                    type="textarea"
                    placeholder="..."
                    class="form-control text-input"
                    value="We sell men's  shoes"
                  />
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Physical address</span>
                  <input
                    placeholder="..."
                    class="form-control text-input"
                    value="Nairobu CBD"
                  />
                </div>

                <div className="ml-3">
                  <span class="ml-1 mb-2 d-block">Store Front Photo</span>
                  <label class="id-card d-flex flex-row align-items-center justify-content-center">
                    <input
                      type="file"
                      placeholder="..."
                      class="form-control p-1 d-none"
                      value=""
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

                <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                  <button class="btn btn-primary px-5  ml-3">Submit</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.activeSlide === 3 && (
          <div>
            <div className="container">
              <h3>4. Create a guarantor</h3>
            </div>

            <div class="py-3 bg-light border-top d-flex flex-fill">
              <div class="container">
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Guarantor Name</span>
                  <input
                    placeholder="..."
                    class="form-control text-input"
                    value="william"
                  />
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Identification Type</span>
                  <select class="form-control">
                    <option value="1">Identity Card</option>
                    <option value="2">Passport Number</option>
                  </select>
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Identification</span>
                  <input
                    type="textarea"
                    placeholder="..."
                    class="form-control text-input"
                    value="33331993"
                  />
                </div>
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Description</span>
                  <textarea
                    placeholder="..."
                    class="form-control text-input"
                    value="..."
                  />
                </div>
                <hr class="my-4 mx-3" />

                <div className="d-flex flex-row">
                  <div className="ml-3">
                    <span class="ml-1 mb-2 d-block font-weight-bold">
                      ID Front
                    </span>
                    <label class="id-card d-flex flex-row align-items-center justify-content-center">
                      <input
                        type="file"
                        placeholder="..."
                        class="form-control p-1 d-none"
                        value=""
                        accept="image/*"
                        onChange={e => {
                          this.setState({
                            GIDFront: e.target.files[0]
                          });
                        }}
                      />

                      <div className="d-flex flex-row align-items-center text-dark">
                        <Plus />
                        <h5 className="ml-2 mb-0">Choose a file</h5>
                      </div>

                      {this.state.GIDFront && (
                        <img
                          src={URL.createObjectURL(this.state.GIDFront)}
                          className="id-img"
                          alt=""
                        />
                      )}
                    </label>
                  </div>

                  <div className="ml-3">
                    <span class="ml-1 mb-2 d-block font-weight-bold">
                      ID Back
                    </span>
                    <label class="id-card d-flex flex-row align-items-center justify-content-center">
                      <input
                        type="file"
                        placeholder="..."
                        class="form-control p-1 d-none"
                        value=""
                        accept="image/*"
                        onChange={e => {
                          this.setState({
                            GIDBack: e.target.files[0]
                          });
                        }}
                      />

                      <div className="d-flex flex-row align-items-center text-dark">
                        <Plus />
                        <h5 className="ml-2 mb-0">Choose a file</h5>
                      </div>

                      {this.state.GIDBack && (
                        <img
                          src={URL.createObjectURL(this.state.GIDBack)}
                          className="id-img"
                          alt=""
                        />
                      )}
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row mt-5">
                  <div className="ml-3">
                    <span class="ml-1 mb-2 d-block font-weight-bold">
                      Guarantor location
                    </span>
                    <div className="map-card card">
                      <iframe
                        title="document-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7337109204586!2d36.891327514958746!3d-1.336003499025586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1273fbf5e9f3%3A0x3333f1e957f8404f!2sOnfon+Media+Ltd!5e0!3m2!1sen!2ske!4v1564652443634!5m2!1sen!2ske"
                        frameborder="0"
                        allowfullscreen
                        className="h-100"
                      />
                    </div>
                  </div>
                </div>

                <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                  <Link
                    to="/clients"
                    class="btn btn-primary px-5  ml-3 btn-lg"
                    onClick={() => {
                      alert("Added successfully");
                    }}>
                    Finish
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  addClient = data => {
    console.log(JSON.stringify(data));
    fetch(`${window.server}/users`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2Mzk1MzY0OSwiZXhwIjoxNTY1NjgxNjQ5LCJhdWQiOiJodHRwczovL25lZW1heWFtdW5ndS5jb20iLCJpc3MiOiJuZWVtYSBhcGkiLCJzdWIiOiJuZWVtYXlhbXVuZ3UiLCJqdGkiOiJmY2IxOTczMS04NTY5LTQwMjktYmM2MC0zMTQ2YTVlOTA4NTkifQ.n5CBbZXo2IdBjUcvBMSOq4wk21mpn6rej_JPF_Qz3Eg",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400) {
          alert(response.message);
        } else {
          alert("successfully added");
          this.setState({ user_id: "U0WO33PGVLSIB", activeSlide: 1 });
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
      });
  };

  uploadFiles = () => {
    let formData = new FormData();

    if (this.state.files.length < 0) {
      alert("Please add atleast one file.");
      return false;
    }

    this.state.files.map(d => {
      formData.append("files", d);
    });

    formData.append("user_id", this.state.user_id);

    fetch(`${window.server}/users`, {
      method: "POST",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU2Mzk1MzY0OSwiZXhwIjoxNTY1NjgxNjQ5LCJhdWQiOiJodHRwczovL25lZW1heWFtdW5ndS5jb20iLCJpc3MiOiJuZWVtYSBhcGkiLCJzdWIiOiJuZWVtYXlhbXVuZ3UiLCJqdGkiOiJmY2IxOTczMS04NTY5LTQwMjktYmM2MC0zMTQ2YTVlOTA4NTkifQ.n5CBbZXo2IdBjUcvBMSOq4wk21mpn6rej_JPF_Qz3Eg"
      },
      body: formData
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400) {
          alert(response.message);
        } else {
          alert("successfully added");
          this.setState({ activeSlide: 2 });
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
      });
  };
}

export default clientAdd;
