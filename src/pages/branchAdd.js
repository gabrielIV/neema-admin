import React, { Component } from "react";
import Form from "../components/form";
import { X, Trash, Plus } from "react-feather";
import { Route, Link, Switch } from "react-router-dom";

class branchAdd extends Component {
  state = { activeSlide: 0, files: [] };
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Branch</h3>
            <small className="text-muted ml-2">Clients > Add a Branch</small>
          </div>
        </div>
        {this.state.activeSlide === 0 && (
          <div className="">
            <Form
              inputs={[
                {
                  label: "Branch Name",
                  name: "BranchNAME",
                  value: ""
                },
                {
                  label: "Branch Code",
                  name: "BranchCode",
                  value: ""
                }
              ]}
              submit={data => this.setState({ activeSlide: 1 })}
            />
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

export default branchAdd;
