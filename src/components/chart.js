import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  state = {
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "November",
        "December"
      ],
      datasets: this.props.datasets
    }
  };
  render() {
    return (
      <div>
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="font-weight-bold">{this.props.title}</h5>
          </div>

          <Line
            options={{
              tooltips: {
                mode: "index",
                intersect: false
              },
              hover: {
                mode: "nearest",
                intersect: true
              }
            }}
            data={this.state.data}
          />
          <div className="card-footer d-flex flex-row justify-content-between align-items-center">
            <select className="form-control w-auto">
              <option value="">Today</option>
              <option value="">Yesterday</option>
              <option value="">last 7 days</option>
              <option value="">Last 28 days</option>
              <option value="">Last 90 days</option>
            </select>
            {this.props.filters}
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
