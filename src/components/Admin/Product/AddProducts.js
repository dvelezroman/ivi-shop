import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AddProduct from "./AddProduct";
import Loader from "../../Loader";
import { Segment, Message } from "semantic-ui-react";

class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
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
          return <AddProduct
              category={data.categories}
              history={this.props.history}
            />
        }}
      </Query>
    );
  }
}
export default Products;
