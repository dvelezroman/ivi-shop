import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import EditProduct from "./EditProduct";
import Loader from "../../Loader";
import { Message, Segment } from "semantic-ui-react";
class Products extends React.Component {
  state = {};
  componentDidMount() {

  }
  
  render() {
    const { slug } = this.props.match.params;
  
    if(!slug)return <div>noparam</div>
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
                quantity
                description
                descriptionHtml
                category
                published
                subCategory
                image {
                  id
                  altText
                  name
                }
              }
            }
          `}
          variables={{ slug }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <Loader />;
            if (error)
              return (
                <Segment basic textAlign="center">
                  <Message warning compact>
                    {error.message}
                  </Message>
                </Segment>
              );
            return <EditProduct key={data.product.id} product={data.product} refetch={refetch} />;
          }}
        </Query>
      </>
    );
  }
}
export default Products;
