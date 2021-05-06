import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
const AUTH_TOKEN = "auth-token";
let token;
function checklogin() {
  let res = null;
  token = localStorage.getItem(AUTH_TOKEN) || null;
  if (token !== null) {
    var decoded = jwtDecode(token);
    res = decoded;
    if (Date.now() / 1000 > res.exp) {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.clear();
      console.log("Your key is expired! ");
    }
  } else {
    console.log(
      "You don't have a key,This is pivate route"
    );
  }
  return res;
}
const PRoute = ({ component: Component, ...rest }) => {
  let auth = checklogin();
  return (
    <Route
      {...rest}
      render={props =>
        !auth  ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PRoute

