import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from "./Product";
import Loader from "../Loader";
import { Message, Segment } from "semantic-ui-react";

class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    const { slug } = this.props.match.params
    return (
      <>
        <Query
          query={gql`
            query GetProduct($slug: String!) { 
              product(slug: $slug) {
                id
                slug
                title
                price
                description
                descriptionHtml
                quantity
                category
                subCategory
                image {
                  altText
                  name
                }
              }
            }
          `}
          variables={{ slug }}
          fetchPolicy="network-only"
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
            return <Product key={data.product.id} product={data.product} />;
          }}
        </Query>
      </>
    );
  }
}
export default Products;
