import React, { Component } from "react";
import { Route, Link, Switch, withRouter } from "react-router-dom";

class Tabs extends Component {
  state = { active: "" };
  render() {
    return (
      <div className="w-100">
        <div className=" border-bottom">
          <div className="tab-links d-flex flex-row mr-5">
            {this.props.tabs.map(d => (
              <Link
                to={d.link}
                className={
                  "tab-link mr-3 p-3 position-relative font-weight-bold text-uppercase " +
                  (d.link === this.state.active ? "active" : "")
                }>
                <span>{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="tabs">
          <div className="tab">{this.props.children}</div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    this.setState({ active: this.props.history.location.pathname });
  };

  componentWillReceiveProps(props) {
    if (props.history) {
      this.setState({ active: this.props.history.location.pathname });
    }
  }
}

// export default Tabs;

export default withRouter(props => <Tabs {...props} />);
