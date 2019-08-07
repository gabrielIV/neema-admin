import React, { Component } from "react";
import Chart from "../components/chart";
import { Target, DollarSign, TrendingDown, User } from "react-feather";

class Home extends Component {
  state = {
    chartDefaults: {
      label: "Total users",
      fill: true,
      borderColor: "#4e73df",
      borderCapStyle: "square"
    }
  };
  render() {
    return (
      <div>
        <div className="p-3 d-flex flex-row justify-content-between align-items-center">
          <h2 className="font-weight-bold">Dashboard</h2>
        </div>
        <div className="px-3">
          <div className="row mb-5 ">
            <div className="col-md-3">
              <div className="card material-blue text-white">
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  <Target className="mr-4" />
                  <span className="title font-weight-bold">Target</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small>
                      <small> Kshs</small>
                    </small>{" "}
                    2,300,000
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card material-green text-white">
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  <DollarSign className="mr-4" />
                  <span className="title font-weight-bold">Sales</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small>
                      <small> Kshs</small>
                    </small>{" "}
                    2,300,000
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card material-deep-orange text-white">
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  <TrendingDown className="mr-4" />
                  <span className="title font-weight-bold">Arrears</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small>
                      <small> Kshs</small>
                    </small>{" "}
                    2,300,000
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card material-deep-purple text-white">
                <div className="card-header trg-header d-flex flex-row align-items-center">
                  <User className="mr-4" />
                  <span className="title font-weight-bold">Total users</span>
                </div>
                <div className="card-body text-white">
                  <h3 className="font-weight-bold">
                    <small className="opacity-0">
                      <small> Kshs</small>
                    </small>{" "}
                    15,320
                  </h3>
                </div>
              </div>
            </div>

            {/* <div className="col-md-3">
              <div className="card icon tex-">
                <h1 className="text-center p-2">2,500</h1>
                <div className="card-header">Daily Active Users</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card icon tex-">
                <h1 className="text-center p-2">-26.31%</h1>
                <div className="card-header">Daily Growth rate</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card icon tex-">
                <h1 className="text-center p-2">1.31%</h1>
                <div className="card-header">Average Growth rate</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card icon">
                <h1 className="text-center p-2">2,080</h1>
                <div className="card-header">Total number of users</div>
              </div>
            </div> */}
          </div>

          {/* <div className="w-100 d-block" className="p-3 mt-5">
            <h3 className="font-weight-bold">Perfomance</h3>
          </div> */}
          <div className="row">
            <div className="col-md-6">
              <Chart
                title="Perfomance"
                filters={
                  <div className="d-flex flex-row">
                    <div className="mx-2 flex-column">
                      <small className="mb-2 font-weight-bold">Branch </small>
                      <select
                        name=""
                        id=""
                        className="form-control py-1 filter-option">
                        <option value="0">ALL</option>
                        <option value="1">NAIROBI</option>
                        <option value="2">BranchNAME</option>
                        <option value="3">BranchNAME</option>
                        <option value="4">BranchNAME</option>
                      </select>
                    </div>
                    <div className="mx-2 flex-column">
                      <small className="mb-2 font-weight-bold">Zone </small>
                      <select
                        name=""
                        id=""
                        className="form-control py-1 filter-option">
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
                    label: "Target",
                    backgroundColor: "white",
                    borderColor: "#2196f3",
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
                    label: "Sales",
                    borderColor: "#4caf50",
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
                    label: "Arrears",
                    borderColor: "#f44336",
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
                  }
                ]}
              />
            </div>

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
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
