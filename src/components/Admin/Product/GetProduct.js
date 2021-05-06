import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from "../../Product/Product";
import Loader from "../../Loader";
import { Message, Segment } from "semantic-ui-react";
class Products extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    const  slug  = this.props.slug
    console.log(this.props.slug)
    return (
      <>
        <Query
          query={gql`
            query GetProduct($slug: String!) { 
              product(slug: $slug) {
                slug
                title
                price
                description
                descriptionHtml
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
