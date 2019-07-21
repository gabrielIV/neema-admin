import React, { Component } from "react";
import { X } from "react-feather";

class Modal extends Component {
 state = { visible: this.props.visible };
 render() {
  return (
   <div
    class={this.state.visible ? "modal fade d-block show" : "modal fade"}
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
   >
    <div class="modal-dialog modal-dialog-centered" role="document">
     <div class="modal-content">
      <X
       className="icon position-absolute modal-close-icon m-2"
       onClick={() => {
        this.setState({ visible: false });
       }}
      />
      <div class="modal-body">{this.props.children}</div>
     </div>
    </div>
   </div>
  );
 }
 componentWillReceiveProps(props) {
  if (typeof props.visible !== "undefined") {
   this.setState({ visible: props.visible });
  }
 }
}

export default Modal;
