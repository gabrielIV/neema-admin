import React, { Component } from "react";
import Chart from "../../components/chart";

class Perfomance extends Component {
  state = {};
  render() {
    return (
      <div class="p-3">
        <div className="col-md-6 my-5">
          <Chart
            title="User perfomance"
            filters={
              <div class="d-flex flex-row">
                <div class="mx-2 flex-column">
                  <small class="mb-2 font-weight-bold">Branch </small>
                  <select name="" id="" class="form-control py-1 filter-option">
                    <option value="0">ALL</option>
                    <option value="1">NAIROBI</option>
                    <option value="2">BranchNAME</option>
                    <option value="3">BranchNAME</option>
                    <option value="4">BranchNAME</option>
                  </select>
                </div>
                <div class="mx-2 flex-column">
                  <small class="mb-2 font-weight-bold">Zone </small>
                  <select name="" id="" class="form-control py-1 filter-option">
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
                label: "Income",
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
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Perfomance;
