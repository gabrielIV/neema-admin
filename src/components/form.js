import React, { Component } from "react";

class Form extends Component {
  state = {
    inputs: this.props.inputs
  };
  render() {
    return (
      <div className="py-3 bg-light border-top d-flex flex-fill">
        <div className="container">
          {this.state.inputs.map((d, i) => {
            let input;
            if (d.type == "break") {
              return <hr className="my-4 mx-3" />;
            } else if (d.type == "select") {
              input = (
                <select
                  className="form-control"
                  value={d.value}
                  onChange={e => {
                    let { inputs } = this.state;
                    inputs[i].value = e.target.value;
                    this.setState({ inputs });
                  }}>
                  {Object.keys(d.options).map((dt, ind) => (
                    <option key={dt} value={d.options[dt]}>
                      {dt}
                    </option>
                  ))}
                </select>
              );
            } else {
              input = (
                <input
                  type={d.type}
                  placeholder="..."
                  className="form-control text-input"
                  value={d.value}
                  onChange={e => {
                    let { inputs } = this.state;
                    inputs[i].value = e.target.value;
                    this.setState({ inputs });
                  }}
                />
              );
            }

            return (
              <div className="mx-3 d-inline-block mb-3">
                <span className="ml-1 mb-2 d-block">{d.label}</span>
                {input}
              </div>
            );
          })}

          <div className=" my-3 d-flex flex-row justify-content-between mt-5">
            <button
              className="btn btn-primary px-5  ml-3"
              onClick={this.submit}>
              Submit
            </button>
            <button
              className="btn btn-outline-primary px-5  ml-5"
              onClick={() => {
                if (!window.confirm("Reset form ?")) return;
                this.setState({ inputs: this.prevData });
              }}>
              Reset form
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.prevData = this.state.inputs;
  }

  submit = () => {
    let { inputs } = this.state;
    let output = {};
    inputs.map(d => {
      if (typeof d.name !== "undefined") output[d.name] = d.value;
    });

    this.props.submit(output);
  };
}

export default Form;
