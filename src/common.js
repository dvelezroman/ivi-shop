//import React from 'react';
//import { Redirect } from 'react-router'
import jwtDecode from "jwt-decode";
const AUTH_TOKEN = "auth-token";
const isLogin = props => {
  const token = localStorage.getItem(AUTH_TOKEN);
  var res = "";
  if (token !== null) {
    var decoded = jwtDecode(token);
    res = decoded;
    if (Date.now() / 1000 > res.exp) {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.clear();
      console.log("expire")
    }else{
    }
  } else {
    res = null;
  }

  return res;
};
export default isLogin;
