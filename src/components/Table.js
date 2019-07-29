import React, { Component } from "react";
import { Search, Edit, Trash, Pause } from "react-feather";

class Table extends Component {
  // eslint-disable-next-line
  state = {
    titles: [],
    data: [],
    limit: 10,
    offset: 0,
    count: 1,
    currentPagination: 0,
    custom: false,
    customText: "",
    tableLoading: true
  };
  render() {
    return (
      <>
        <div className={"d-flex flex-fill flex-column "}>
          <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div className="d-flex flex-column justify-content-center position-relative">
              <Search className="search-icon" color="#dedede" />
              <input
                type="search"
                className="form-control pl-5"
                placeholder="Search here"
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <span className="mr-2">Show </span>
              <select
                className="form-control form-control-sm"
                onChange={event => {
                  this.setState({ limit: parseInt(event.target.value) });
                  // console.log(this.state.limit);
                  setTimeout(() => {
                    this.fetchTable();
                  }, 100);
                }}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="ml-2"> entries </span>
            </div>
          </div>

          <div className="d-flex flex-fill tb-cover position-relative">
            {this.state.tableLoading && (
              <div
                className={
                  "loader h-100 w-100 d-flex flex-row align-items-center justify-content-center show-loader"
                }>
                <div class="lds-roller">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            )}
            <table className="table table-striped text-dark table-bordered table-hover">
              <thead>
                <tr>
                  {this.state.titles.map((title, i) => (
                    <th key={i} className="text-capitalize">
                      {title.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((data, index) => (
                  <tr key={index} className="cursor-pointer">
                    {Object.keys(data).map((d, i) => {
                      let o =
                        data[d] == null || data[d] == "" ? " - " : data[d];
                      // if (typeof o == "object") o = "-";
                      return (
                        <td key={i} className="table-data">
                          {o}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row align-items-center">
              <span className="mr-2">
                Showing {this.state.offset} to{" "}
                {this.state.offset + this.state.limit} of {this.state.count}{" "}
                entries{" "}
              </span>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.setState({ offset: 0, currentPagination: 0 });
                        setTimeout(() => {
                          this.fetchTable();
                        }, 100);
                      }}>
                      &laquo;
                    </button>
                  </li>
                  <li
                    className="page-item"
                    onClick={() => {
                      if (this.state.currentPagination - 1 >= 0) {
                        this.setState({
                          offset:
                            (this.state.currentPagination - 1) *
                            this.state.offset,
                          currentPagination: this.state.currentPagination - 1
                        });
                      }
                      setTimeout(() => {
                        this.fetchTable();
                      }, 100);
                    }}>
                    <button className="page-link">&lt;</button>
                  </li>

                  {this.generatePagination(this.state.currentPagination)}

                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        if (
                          this.state.currentPagination + 1 <
                          parseInt(this.state.count / this.state.limit)
                        ) {
                          this.setState({
                            offset:
                              (this.state.currentPagination + 1) *
                              this.state.limit,
                            currentPagination: this.state.currentPagination + 1
                          });
                          setTimeout(() => {
                            this.fetchTable();
                          }, 100);
                        }
                      }}>
                      &gt;
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => {
                        this.setState({
                          offset: this.state.count - this.state.limit,
                          currentPagination: parseInt(
                            this.state.count / this.state.limit
                          )
                        });
                        setTimeout(() => {
                          this.fetchTable();
                        }, 100);
                      }}>
                      &raquo;
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.fetchTable();
  }

  // eslint-disable-next-line

  fetchTable = () => {
    this.setState({ tableLoading: true });
    this.props.fetch({ $skip: this.state.offset, $limit: this.state.limit });
  };

  generatePagination() {
    // console.log("currentPagination :", this.state.currentPagination);
    let count = parseInt(this.state.count);
    let { limit } = this.state;
    let { offset } = this.state;

    let pagination = [];

    let number = count / limit;
    let position = parseInt(number * (offset / count));
    position -= 2;
    if (position < 0) position = 0;
    let n = position;

    if (n + 5 > number) {
      n = n - 5 - (n - number);
    }

    while (position < n + 5) {
      let pos = position;
      pagination.push(
        <li
          key={pos}
          className={
            "page-item " +
            (this.state.currentPagination === position ? "active" : "")
          }>
          <button
            className="page-link"
            onClick={() => {
              // console.log("next position :: ", pos);
              let offset = pos * limit;
              this.setState({ offset, currentPagination: pos });
              setTimeout(() => {
                this.fetchTable();
              }, 100);
            }}>
            {pos + 1}
          </button>
        </li>
      );
      position++;
    }

    return pagination;
  }

  componentWillReceiveProps(props) {
    if (typeof props.data.data == "object") {
      let titles;
      let { data } = props.data;

      // console.log("tableData", data);
      if (data.length === 0) {
        titles = this.state.titles;
      } else {
        titles = Object.keys(data[0]);
      }

      this.setState({
        data,
        titles,
        count: props.data.total,
        tableLoading: false
      });
    }
  }
}

export default Table;
