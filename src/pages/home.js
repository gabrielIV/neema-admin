import React, { Component } from "react";
import Chart from "../components/chart";

class Home extends Component {
  state = {
    chartDefaults: {
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
      pointHitRadius: 10
    }
  };
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
              <Chart
                title="Average growth rate"
                datasets={[
                  {
                    ...this.state.chartDefaults,
                    label: "Total Income",
                    data: [
                      4753,
                      4340,
                      25538,
                      48505,
                      30044,
                      38824,
                      24393,
                      30590,
                      44654,
                      48626,
                      23198,
                      29082
                    ]
                  }
                ]}
              />
            </div>
            <div className="col-md-6">
              <Chart
                title="Monthly Active users"
                datasets={[
                  {
                    ...this.state.chartDefaults,
                    data: [
                      8618,
                      8773,
                      9876,
                      7757,
                      9532,
                      7855,
                      7802,
                      7648,
                      8693,
                      8697,
                      8140,
                      7325
                    ]
                  }
                ]}
              />
            </div>
          </div>
          <div class="w-100 d-block" class="p-3 mt-5">
            <h3 class="font-weight-bold">Perfomance</h3>
          </div>
          <div class="row">
            <div className="col-md-6">
              <Chart
                title="Zones perfomance"
                filters={
                  <div class="d-flex flex-row">
                    <div class="mx-2 flex-column">
                      <small class="mb-2 font-weight-bold">Branch </small>
                      <select
                        name=""
                        id=""
                        class="form-control py-1 filter-option">
                        <option value="0">ALL</option>
                        <option value="1">NAIROBI</option>
                        <option value="2">BranchNAME</option>
                        <option value="3">BranchNAME</option>
                        <option value="4">BranchNAME</option>
                      </select>
                    </div>
                    <div class="mx-2 flex-column">
                      <small class="mb-2 font-weight-bold">Zone </small>
                      <select
                        name=""
                        id=""
                        class="form-control py-1 filter-option">
                        <option value="0">ALL</option>
                        <option value="1">ONFON ZONE</option>
                        <option value="2">TESTNAME</option>
                        <option value="3">TESTNAME</option>
                        <option value="4">TESTNAME</option>
                      </select>
                    </div>
                  </div>
                }
                datasets={[
                  {
                    fill: false,
                    label: "Branch 1",
                    backgroundColor: "white",
                    data: [
                      7054,
                      7063,
                      7454,
                      7661,
                      7875,
                      8056,
                      9158,
                      9504,
                      9613,
                      9636,
                      9742,
                      9760
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 2",
                    borderColor: "#f44336",
                    backgroundColor: "white",
                    data: [
                      7020,
                      7127,
                      7293,
                      7329,
                      7544,
                      7631,
                      7772,
                      8688,
                      8853,
                      8969,
                      9779,
                      9924
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#E91E63",
                    backgroundColor: "white",
                    data: [
                      7116,
                      7384,
                      7586,
                      7948,
                      8271,
                      8307,
                      8573,
                      8740,
                      9009,
                      9111,
                      9620,
                      9887
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#673AB7",
                    backgroundColor: "white",
                    data: [
                      7306,
                      7517,
                      7576,
                      7888,
                      7940,
                      7978,
                      8225,
                      8314,
                      8427,
                      9088,
                      9346,
                      9487
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#2196F3",
                    backgroundColor: "white",
                    data: [
                      7394,
                      7549,
                      7987,
                      8392,
                      8406,
                      8414,
                      9106,
                      9407,
                      9817,
                      9822,
                      9877,
                      9886
                    ]
                  }
                ]}
              />
            </div>

            <div className="col-md-6">
              <Chart
                title="Branches perfomance"
                filters={
                  <div class="d-flex flex-row">
                    <div class="mx-2 flex-column">
                      <small class="mb-2 font-weight-bold">Branch </small>
                      <select
                        name=""
                        id=""
                        class="form-control py-1 filter-option">
                        <option value="0">ALL</option>
                        <option value="1">NAIROBI</option>
                        <option value="2">BranchNAME</option>
                        <option value="3">BranchNAME</option>
                        <option value="4">BranchNAME</option>
                      </select>
                    </div>
                  </div>
                }
                datasets={[
                  {
                    fill: false,
                    label: "Branch 1",
                    backgroundColor: "white",
                    data: [
                      7021,
                      7159,
                      8026,
                      8491,
                      8558,
                      8581,
                      8675,
                      8912,
                      9223,
                      9457,
                      9595,
                      9754
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 2",
                    borderColor: "#f44336",
                    backgroundColor: "white",
                    data: [
                      7043,
                      7224,
                      7514,
                      7855,
                      8438,
                      8505,
                      8647,
                      9025,
                      9129,
                      9419,
                      9470,
                      9755
                    ]
                  },
                  {
                    ...this.state.chartDefaults,
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#E91E63",
                    backgroundColor: "white",
                    data: [
                      7153,
                      7329,
                      7681,
                      7720,
                      8061,
                      8310,
                      8326,
                      9063,
                      9127,
                      9337,
                      9707,
                      9763
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#673AB7",
                    backgroundColor: "white",
                    data: [
                      7422,
                      7963,
                      8057,
                      8155,
                      8350,
                      8373,
                      8477,
                      8853,
                      9406,
                      9487,
                      9691,
                      9703
                    ]
                  },
                  {
                    fill: false,
                    label: "Branch 3",
                    borderColor: "#2196F3",
                    backgroundColor: "white",
                    data: [
                      7394,
                      7549,
                      7987,
                      8392,
                      8406,
                      8414,
                      9106,
                      9407,
                      9817,
                      9822,
                      9877,
                      9886
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
