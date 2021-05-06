import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Category from "./Category";
import { Segment, Message, Menu, Placeholder } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <Menu vertical fluid attached="top">
        <Menu.Item as={Link} to="/c">
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
            if (loading)
              return (
                <Placeholder>
                  <Menu.Item>
                    <Placeholder.Line />
                  </Menu.Item>
                  <Menu.Item>
                    <Placeholder.Line />
                  </Menu.Item>
                  <Menu.Item>
                    <Placeholder.Line />
                  </Menu.Item>
                </Placeholder>
              );
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
