import React, { Component } from "react";
import Form from "../components/form";
import { X, Trash, Plus } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";

class branchManagersAdd extends Component {
  state = { activeSlide: 0, files: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Branch Manager</h3>
            <small className="text-muted ml-2">
              Branch Managers > Add a Branch Manager
            </small>
          </div>
        </div>
        {this.state.activeSlide === 0 && (
          <div className="">
            {/* <div className="container">
              <h3>1. Client details</h3>
            </div> */}

            <div className="pb-3 pt-5 bg-light border-top d-flex flex-fill">
              <div className="container">
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Full name</span>
                  <input
                    placeholder="..."
                    className="form-control text-input"
                    value="Boniface Mbaria"
                  />
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Phone number</span>
                  <input
                    placeholder="..."
                    className="form-control text-input"
                    value="254715229228"
                  />
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Email address</span>
                  <input
                    type="email"
                    placeholder="..."
                    className="form-control text-input"
                    value="bndibx@gmail.com"
                  />
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Gender</span>
                  <select className="form-control">
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Password</span>
                  <input
                    type="password"
                    placeholder="..."
                    className="form-control text-input"
                    value="qwerty"
                  />
                </div>
                <hr className="my-4 mx-3" />
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Identification Type</span>
                  <select className="form-control">
                    <option value="1">Identity Card</option>
                    <option value="2">Passport Number</option>
                  </select>
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">ID number</span>
                  <input
                    placeholder="..."
                    className="form-control text-input"
                    value="29495518"
                  />
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Marital status</span>
                  <select className="form-control">
                    <option value="1">Single</option>
                    <option value="2">Married</option>
                  </select>
                </div>
                <div className="mx-3 d-inline-block mb-3">
                  <span className="ml-1 mb-2 d-block">Branch</span>
                  <select className="form-control">
                    <option value="0">ALL</option>
                    <option value="1">ONFON ZONE</option>
                    <option value="2">TESTNAME</option>
                    <option value="3">TESTNAME</option>
                    <option value="4">TESTNAME</option>
                  </select>
                </div>
                <div className=" my-3 d-flex flex-row justify-content-between mt-5">
                  <Link
                    to="/branchManagers"
                    className="btn btn-primary px-5  ml-3"
                    onClick={() => {
                      alert("Added successfully");
                    }}>
                    Submit
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

export default branchManagersAdd;
