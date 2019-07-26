import React, { Component } from "react";
import Form from "../components/form";

class clientAdd extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Client</h3>
            <small className="text-muted ml-2">Clients > Add a Client</small>
          </div>
        </div>

        <Form
          inputs={[
            {
              label: "Full name",
              name: "full_names",
              value: "Boniface Mbaria"
            },
            { label: "Phone number", name: "msisdn", value: "254715229228" },
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
              options: { Male: 1, Female: 2 }
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
              options: { "Identity Card": 1, "Passport Number": 2 }
            },
            { label: "ID number", name: "identification", value: "29495518" },
            {
              label: "Marital status",
              name: "marital_status_id",
              value: "1",
              type: "select",
              options: { Single: 1, Married: 2 }
            },
            { label: "Zone", name: "zone_id", value: "1" }
          ]}
          submit={data => this.submit(data)}
        />
      </div>
    );
  }

  submit = data => {
    console.log(JSON.stringify(data));
    fetch(`${window.server}/users`, {
      headers: {
        Authorization: localStorage.token,
        "Content-Type": "application/json"
      },
      method: "post",
      data: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400) {
          alert(response.message);
        } else {
          alert("successfully added");
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
      });
  };
}

export default clientAdd;
