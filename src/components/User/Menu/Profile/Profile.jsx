import React, { Component } from "react";
import { CartContext } from "../../../CartContext";
import ProfileFrom from "./ProfileFrom"
class Profile extends Component {
  state = {
  };
  render() {
    return (
        <CartContext.Consumer>
          {cart => (
            cart.user && (
                <ProfileFrom cart={cart}/>
            )
          )}
        </CartContext.Consumer>
    );
  }

}

export default Profile;
