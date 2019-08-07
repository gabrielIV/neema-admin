import React, { Component } from "react";

class BranchManagerDetails extends Component {
  state = { data: [{}] };
  render() {
    return (
      <div className="p-3">
        <ul className="list-group user-details">
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
    );
  }

  componentDidMount = () => {
    this.fetch();
  };

  fetch = () => {
    let user_id = this.props.match.params.id;
    fetch(`${window.server}/users?user_id=${user_id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let data = [];
        response.data.map(d => {
          data.push({
            "User ID": d.user_id,
            "Full Name": d.full_names,
            email: d.email,
            gender: ["", "Male", "Female"][d.gender_id],
            identification: d.identification,
            "Marital status": ["", "Single", "Married"][d.marital_status_id],
            balance: d.balance,
            // identification_type: 1,
            "Phone Number": d.msisdn,
            zone: d.zone.zone_name
          });
        });
        response.data = data;
        this.setState({ data });
      })
      .catch(d => {
        this.setState({ tableError: true });
        console.log(d);
      });
  };
}

export default BranchManagerDetails;
