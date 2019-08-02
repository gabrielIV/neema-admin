import React, { Component } from "react";
import Form from "../components/form";
import { DateRangePicker, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import moment from "moment";
import { Check, X } from "react-feather";

class LoanAdd extends Component {
  state = {
    ranges: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    },
    dateVisible: false,
    currentDate: new Date(),
    collaterals: [1]
  };
  render() {
    return (
      <div>
        <div className="p-3">
          <div className="container">
            <h3 className="font-weight-bold mb-0">Add a Loan</h3>
            <small className="text-muted ml-2">
              Clients > View client > Add a loan
            </small>
          </div>
        </div>
        <div>
          <div className="container">
            <h3>1. Create loan</h3>
          </div>

          <div class="pb-3 pt-5 bg-light border-top d-flex flex-fill">
            <div class="container ">
              <div className="d-flex flex-row flex-wrap">
                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Loan amout</span>
                  <input
                    type="number"
                    placeholder="..."
                    class="form-control text-input"
                  />
                </div>

                <div className="d-block position-relative">
                  <div className="mx-2 flex-column">
                    <span className="mb-2">Start date </span>
                    <div
                      className="form-control mt-2  d-flex flex-row align-items-center noselect"
                      onClick={() => {
                        this.setState({ dateVisible: true });
                      }}>
                      <span>
                        <b>From</b>
                        {moment(this.state.currentDate).format(
                          " Do MMMM YYYY "
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      "card date-card " +
                      (this.state.dateVisible ? "" : "d-none")
                    }>
                    <Calendar
                      // ranges={[this.state.ranges]}
                      // onChange={ranges => this.updateDateRange(ranges)}
                      date={this.state.currentDate}
                      onChange={date => this.setState({ currentDate: date })}
                    />

                    <div className="p-3 text-center d-flex flex-row justify-content-between">
                      <button
                        onClick={() => {
                          this.setState({ dateVisible: false });
                        }}
                        className="btn btn-outline-danger btn-sm d-flex flex-row
                align-items-center align-self-center pr-4">
                        <X size={18} /> <span className="ml-2">Cancel</span>
                      </button>

                      <button
                        onClick={() => {
                          this.setState({ dateVisible: false });
                        }}
                        className="btn btn-primary btn-sm d-flex flex-row align-items-center align-self-center pr-4">
                        <Check size={18} /> <span className="ml-2">Done</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Number of Days</span>
                  <input
                    type="number"
                    placeholder="..."
                    class="form-control text-input"
                  />
                </div>

                <div class="mx-3 d-inline-block mb-3">
                  <span class="ml-1 mb-2 d-block">Choose a loan officer</span>
                  <input
                    type="number"
                    placeholder="..."
                    class="form-control text-input"
                  />
                </div>
              </div>

              <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                <button class="btn btn-primary px-5  ml-3">Submit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="container">
            <h3>2. Add loan Collateral</h3>
          </div>

          <div class="pb-3 pt-5 bg-light border-top d-flex flex-fill">
            <div class="container">
              {this.state.collaterals.map((d, i) => (
                <div className="collateral-card p-3 mb-3">
                  <div class="mx-3 d-inline-block mb-3">
                    <span class="ml-1 mb-2 d-block">Item name</span>
                    <input
                      placeholder="..."
                      class="form-control text-input"
                      value=""
                    />
                  </div>
                  <div class="mx-3 d-inline-block mb-3">
                    <span class="ml-1 mb-2 d-block">Quantity</span>
                    <input
                      type="number"
                      placeholder="..."
                      class="form-control text-input"
                      value=""
                    />
                  </div>
                  <div class="mx-3 d-inline-block mb-3">
                    <span class="ml-1 mb-2 d-block">Serial Number</span>
                    <input
                      placeholder="..."
                      class="form-control text-input"
                      value=""
                    />
                  </div>
                  <div class="mx-3 d-inline-block mb-3">
                    <span class="ml-1 mb-2 d-block">Total value</span>
                    <input
                      type="number"
                      placeholder="..."
                      class="form-control text-input"
                      value=""
                    />
                  </div>
                </div>
              ))}
              <div className="text-center mt-5">
                <button
                  class="btn btn-outline-primary px-5  ml-5"
                  onClick={() => {
                    let { collaterals } = this.state;
                    collaterals.push(1);
                    this.setState({
                      collaterals
                    });
                  }}>
                  Add collateral Item
                </button>
              </div>

              <div class=" my-3 d-flex flex-row justify-content-between mt-5">
                <button class="btn btn-primary px-5  ml-3">Submit</button>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            this.setState({ dateVisible: false });
          }}
          className={
            "date-bg-cover cursor-pointer " +
            (this.state.dateVisible ? "" : "d-none")
          }
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

  updateFilter = () => {
    let filterData = {};
    if (this.state.zone !== 0) {
      filterData = {
        zone_id: this.state.zone
        // dates: this.state.ranges
      };

      this.props.getFilter(filterData);
    }
  };
}

export default LoanAdd;
