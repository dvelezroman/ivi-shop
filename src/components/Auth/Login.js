import React from "react";
import { Redirect } from "react-router";
import { CartContext } from "../CartContext";

const AUTH_TOKEN = "auth-token";
const Login = props => {
  const login = localStorage.getItem(AUTH_TOKEN);
  return ( 
    <>
      {!login && <Redirect to="/" />}
      <CartContext.Consumer>
        {cart => (
          <>
            {cart.onLogin()}
            <Redirect to="/" />
          </>
        )}
      </CartContext.Consumer>
    </>
  );
};
export default Login;
