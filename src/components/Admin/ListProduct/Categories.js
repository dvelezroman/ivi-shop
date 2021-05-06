import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Category from "./Category";
import Loader from "../../Loader";
import { Segment, Message, Menu } from "semantic-ui-react";
import {  Link } from "react-router-dom";

class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <Menu vertical fluid attached="top">
            <Menu.Item as={Link} to="/admin/product/list">
              <h5>All Cetegories</h5>
            </Menu.Item>
            
      <Query
        query={gql`
          {
            categories {
              id
              slug
              title
              subCategory {
                id
                slug
                title
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error)
            return (
              <Segment basic textAlign="center">
                <Message warning compact>
                  {error.message}
                </Message>
              </Segment>
            );
          return data.categories.map((currentCategory, i) => (
            <Category key={i} category={currentCategory} />
          ));
        }}
      </Query>
      </Menu>
    );
  }
}
export default Products;
