import React, { Component } from "react";
import { Search } from "react-feather";

class Map extends Component {
  state = { query: "", predictions: [] };
  timeout = null;
  render() {
    return (
      <div className="backdrop d-flex flex-row align-items-center justify-content-center">
        <div className=" search-modal">
          <div className="position-relative d-flex flex-row">
            <Search color="grey" className="s-i align-self-center ml-2" />
            <input
              type="search"
              className="form-control form-control-lg pl-5"
              placeholder="Search here"
              onChange={e => {
                clearTimeout(this.timeout);
                this.setState({ query: e.target.value });
                this.timeout = setTimeout(() => {
                  this.search();
                }, 500);
              }}
            />
          </div>
          <div className="autocomplete">
            <ul class="list-group">
              {this.state.predictions.map((d, i) => (
                <li class="list-group-item pl-5 py-2" key={i}>
                  {d.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  search = () => {
    fetch(
      "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBrXomkQVD93H0PoUN-hkF3U04aVjk46NQ&input=" +
        this.state.query +
        "&sessiontoken=1234567890",
      {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(d => {
        alert("Error saving the data");
        console.log(d);
      });
  };
}

export default Map;
