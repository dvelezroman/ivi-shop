import React from "react";
import Adnav from "./Adnav/Adnav";
import { Redirect } from 'react-router';
import { CartContext } from "../CartContext";
const index = props => {
  return (
    <>

      <Adnav>{props.children}</Adnav>
    </>
  );
};
export default index;
