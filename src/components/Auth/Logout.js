import React from "react";
import { Redirect } from "react-router";
import { CartContext } from "../CartContext";

class DoLogout extends React.Component {
  componentDidMount() {
    let loggedout = false;
    this.props.context.onLogout();
    if (!loggedout) {
      loggedout = true;
    }
  }
  render() {
    return <Redirect to="/" />;
  }
}

const Logout = () => (
  <CartContext.Consumer>
    {cart => (
      <>
        <DoLogout context={cart} />
      </>
    )}
  </CartContext.Consumer>
);
export default Logout;
