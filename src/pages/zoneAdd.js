import React, { Component } from "react";
import Form from "../components/form";
import { X, Trash, Plus } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";

class zoneAdd extends Component {
  state = { activeSlide: 0, files: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Zone</h3>
            <small className="text-muted ml-2">Clients > Add a Branch</small>
          </div>
        </div>
        {this.state.activeSlide === 0 && (
          <div className="">
            <div className="">
              <div className="pb-3 pt-5 bg-light border-top d-flex flex-fill">
                <div className="container">
                  <div className="mx-2 d-inline-block">
                    <span className="mb-2 ">Branch </span>
                    <select name="" id="" className="form-control py-1">
                      <option value="1">NAIROBI</option>
                      <option value="2">BranchNAME</option>
                      <option value="3">BranchNAME</option>
                      <option value="4">BranchNAME</option>
                    </select>
                  </div>
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">Zone Name</span>
                    <input
                      placeholder="..."
                      className="form-control text-input"
                      value=""
                    />
                  </div>
                  <div className="mx-3 d-inline-block mb-3">
                    <span className="ml-1 mb-2 d-block">Zone Code</span>
                    <input
                      placeholder="..."
                      className="form-control text-input"
                      value=""
                    />
                  </div>
                  <div className=" my-3 d-flex flex-row justify-content-between mt-5">
                    <button className="btn btn-primary px-5  ml-3">Submit</button>
                    <button className="btn btn-outline-primary px-5  ml-5">
                      Reset form
                    </button>
                  </div>
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

export default zoneAdd;
