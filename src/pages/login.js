import React, { Component } from "react";
import logo from "../img/amana-logo.png";

class Login extends Component {
  state = { custom: true };
  render() {
    return (
      <div className="d-flex flex-fill flex-column main-cover justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 bg-light d-lg-flex d-none  default-bg d-flex align-items-center justify-content-center flex-row" />
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                            Neema lending
                          </h1>
                        </div>

                        <div className="text-center mb-4">
                          <small className="text-muted">Admin login</small>
                        </div>

                        <div className="form-group">
                          <input
                            type="tel"
                            className="form-control form-control-user"
                            placeholder="Enter phone Address..."
                            onChange={e => {
                              this.setState({ phone: e.target.value });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            onChange={e => {
                              this.setState({ password: e.target.value });
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              checked
                            />
                            <label
                              className="custom-control-label"
                              for="customCheck">
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-user btn-block default-bg"
                          onClick={this.login}>
                          Login
                        </button>

                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  login = () => {
    let { phone } = this.state;
    let { password } = this.state;
    if (!(phone !== "" && password !== "")) {
      alert("Please fill in all the required values");
      return false;
    }

    this.setState({ disabled: true });
    // let data = { name, phone, password };

    fetch(window.server + "/authentication", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: `{"strategy": "local",  "msisdn": "${phone}", "password": "${password}"}`
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ disabled: false });

        if (response.code === 401) {
          alert(response.message);
          this.setState({ password: "" });
          return false;
        } else if (response.accessToken) {
          localStorage.token = response.accessToken;
          window.user = response;
          localStorage.user = JSON.stringify(window.user);
          this.props.history.push("/");
        }
      })
      .catch(() => {
        alert("something went wrong. Please try again later.");
      });
  };
}

export default Login;
