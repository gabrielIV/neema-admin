import React, { Component } from "react";
import Table from "../components/Table";
import Filter from "../components/filter";
import { Plus } from "react-feather";

class Notifications extends Component {
  state = {};
  render() {
    return (
      <div className="p-3 ">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <h3 className="font-weight-bold">Notifications</h3>
        </div>

        <Filter filter={[{ name: "All", value: 0 }]} />
        <div className="mt-4">
          <Table />
        </div>
      </div>
    );
  }
}

export default Notifications;
