import React, { Component } from "react";
import Chart from "../components/chart";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="p-3 d-flex flex-row justify-content-between align-items-center">
          <h2 className="font-weight-bold">Dashboard</h2>
        </div>
        <div className="px-3">
          <div className="row mb-5 text-center">
            <div class="col-md-3">
              <div class="card icon tex-">
                <h1 class="text-center p-2">2,500</h1>
                <div class="card-header">Daily Active Users</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card icon tex-">
                <h1 class="text-center p-2">-26.31%</h1>
                <div class="card-header">Daily Growth rate</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card icon tex-">
                <h1 class="text-center p-2">1.31%</h1>
                <div class="card-header">Average Growth rate</div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card icon">
                <h1 class="text-center p-2">2,080</h1>
                <div class="card-header">Total number of users</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Chart />
            </div>
            <div className="col-md-6">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
