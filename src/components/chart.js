import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  state = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Total users",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(78, 115, 223,0.4)",
          borderColor: "#4e73df",
          borderCapStyle: "square",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  };
  render() {
    return (
      <div>
        <div className="card shadow-sm">
          <div className="card-header">
            <h5>Growth rate</h5>
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
          <div className="card-footer d-flex flex-row justify-content-between">
            <select className="form-control w-auto">
              <option value="">Today</option>
              <option value="">Yesterday</option>
              <option value="">last 7 days</option>
              <option value="">Last 28 days</option>
              <option value="">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
