import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from "./Order";
import Loader from "../../../Loader"; 
import { Message, Segment } from "semantic-ui-react";
class SingleOrder extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    const  id  = this.props.id;
    console.log('singleorder')
    return (

          <Query
            query={gql`
              query GetOrder($id: ID!) {
                userOrder(id: $id) {
                  id
                  total
                  paymentId
                  status
                  address {
                    firstName
                    lastName
                    addr
                    distric
                    province
                    mobileNumber
                    postcode
                  }
                  orderProduct {
                    slug
                    title
                    price
                    option
                    quantity
                  }
                  createdAt
                  updatedAt
                }
              }
            `}
            variables={{ id }}
          >
            {({ loading, error, data, refetch}) => {
              if (loading) return <Loader />;
              if (error)
                return (
                  <Segment basic textAlign="center">
                    <Message warning compact>
                      {error.message}
                    </Message>
                  </Segment>
                );
              return <Order key={data.userOrder.id} refetch={refetch} order={data.userOrder} />;
            }}
          </Query>

    );
  }
}
export default SingleOrder;
