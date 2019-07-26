import React, { Component } from "react";
import Form from "../components/form";
import { DateRangePicker } from "react-date-range";
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
    dateVisible: false
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

        <div class="py-3 bg-light border-top d-flex flex-fill">
          <div class="container ">
            <div className="d-flex flex-row">
              <div class="mx-3 d-inline-block mb-3">
                <span class="ml-1 mb-2 d-block">Loan amout</span>
                <input
                  type="number"
                  placeholder="..."
                  class="form-control text-input"
                  value="0"
                />
              </div>

              <div className="d-block position-relative">
                <div className="mx-2 flex-column">
                  <span className="mb-2">Date range </span>
                  <div
                    className="form-control mt-2  d-flex flex-row align-items-center noselect"
                    onClick={() => {
                      this.setState({ dateVisible: true });
                    }}>
                    <span>
                      <b>From</b>
                      {moment(this.state.ranges.startDate).format(
                        " MMMM Do YYYY "
                      )}
                      <b>&nbsp;&nbsp; To</b>
                      {moment(this.state.ranges.endDate).format(
                        " MMMM Do YYYY "
                      )}
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "card date-card " + (this.state.dateVisible ? "" : "d-none")
                  }>
                  <DateRangePicker
                    ranges={[this.state.ranges]}
                    onChange={ranges => this.updateDateRange(ranges)}
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
            </div>

            <div class=" my-3 d-flex flex-row justify-content-between mt-5">
              <button class="btn btn-primary px-5  ml-3">Submit</button>
              <button class="btn btn-outline-primary px-5  ml-5">
                Reset form
              </button>
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
