import React, { Component } from "react";
import Chart from "../components/chart";
import {
  Target,
  DollarSign,
  TrendingDown,
  User,
  Calendar
} from "react-feather";
import moment from "moment";

class Home extends Component {
  state = {
    chartDefaults: {
      label: "Total users",
      fill: true,
      borderColor: "#4e73df",
      borderCapStyle: "square"
    },
    totals: [
      {
        color: "material-blue",
        icon: <Target className="mr-4" />,
        label: "Target",
        amount: 0
      },
      {
        color: "material-green",
        icon: <DollarSign className="mr-4" />,
        label: "Sales",
        amount: 0
      },
      {
        icon: <TrendingDown className="mr-4" />,
        color: "material-red",
        label: "Arrears",
        amount: 0
      }
    ],
    totalsEndDate: moment().format("YYYY-MM-DD"),
    totalsStartDate: moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD")
  };
  render() {
    return (
      <div>
        <div className="p-3 d-flex flex-row justify-content-between align-items-center d-flex flex-row align-items-center">
          <h2 className="font-weight-bold">Dashboard</h2>
          <div className="position-relative d-flex flex-row">
            <select
              className="form-control"
              onChange={e => {
                this.setState({
                  totalsStartDate: moment()
                    .subtract(parseInt(e.target.value), "days")
                    .format("YYYY-MM-DD")
                });
                setTimeout(() => {
                  this.fetchSales();
                }, 0);
              }}>
              <option value="1">Yesterday</option>
              <option value="7">This week</option>
              <option value="30">last 30 days</option>
              <option value="90">last 90 days</option>
              <option value="180">last 6 months</option>
              <option value="365">last 1 year</option>
              <option value="7">last 5 years</option>
            </select>
          </div>
        </div>
        <div className="px-3">
          <div className="row mb-5 ">
            {this.state.totals.map((d, i) => (
              <div className="col-md-3" key={i}>
                <div className={"card text-white " + d.color}>
                  <div className="card-header trg-header d-flex flex-row align-items-center">
                    {d.icon}
                    <span className="title font-weight-bold">{d.label}</span>
                  </div>
                  <div className="card-body text-white">
                    <h3 className="font-weight-bold">
                      <small>
                        <small> Kshs</small>
                      </small>{" "}
                      {d.amount.toLocaleString()}
                    </h3>
                  </div>
                </div>
              </div>
            ))}

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

  componentDidMount = () => {
    this.fetchSales();
  };

  fetchSales = () => {
    this.setState({ modalVisible: true });
    console.log(this.state.totalsStartDate);
    fetch(
      `${window.server}/utils/salestotals?&startdate=${
        this.state.totalsStartDate
      }&enddate=${this.state.totalsEndDate}`,
      {
        method: "GET",
        headers: {
          Authorization: localStorage.token
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.code === 400 || response.code === 403) {
        } else {
          let { totals } = this.state;
          Object.keys(response.data[0]).map((d, i) => {
            totals[i].amount = response.data[0][d];
          });
          this.setState({ totals });
        }
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
        this.setState({ modalVisible: false });
      });
  };
}

export default Home;
