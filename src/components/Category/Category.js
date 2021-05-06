// https://www.npmjs.com/package/react-responsive-carousel
import React from 'react'
import {
  Dropdown 
} from "semantic-ui-react";
import {  Link } from "react-router-dom";

const Category = (props) => {
  return (
    <Dropdown scrolling item  text={props.category.title}>
      <Dropdown.Menu>
        <Dropdown.Item  as={Link} to={"/c/"+props.category.slug}>{"All "+props.category.title}</Dropdown.Item>
        {props.category.subCategory.map((data,i) => (<Dropdown.Item key={i}  as={Link} to={"/c/"+props.category.slug+"/"+data.slug}>{data.title}</Dropdown.Item>))}
      </Dropdown.Menu>
    </Dropdown>
  );

};

export default Category;
