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
                }
              ]}
              submit={data => {
                this.addBranch(data);
              }}
            />
          </div>
        )}
      </div>
    );
  }

  addBranch = data => {
    this.setState({ modalVisible: true });
    fetch(`${window.server}/users`, {
      method: "POST",
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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
          this.setState({ branch_name: "" });
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };
}

export default branchAdd;
