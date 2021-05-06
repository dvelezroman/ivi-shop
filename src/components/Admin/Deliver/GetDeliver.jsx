import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import { Segment, Message, Header } from "semantic-ui-react";
import Deliver from "./Deliver";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
const FormExampleForm = () => (
  <>
    <Header as="h2">ปรับสถานะการจัดส่งสินค้า</Header>
    <Query
      fetchPolicy="network-only"
      query={gql`
        {
          usersOrder(status: "successful") {
            id
            name
            createdAt
            total
            status
          }
        }
      `}
    >
      {({ loading, error, data, refetch }) => {
        if (loading)
          return (
            <Segment textAlign="center">
              <Message compact>loading</Message>
            </Segment>
          );
        if (error)
          return (
            <Segment textAlign="center">
              <Message warning compact>
                {error.message}
              </Message>
            </Segment>
          );

        return (
          <Deliver
            refetch={refetch}
            deliver={[].concat.apply(
              [],
              data.usersOrder.map(thisOrder => ({
                key: thisOrder.id,
                value: thisOrder.id,
                text: thisOrder.id,
                description:
                  "ยอดรวม: " +
                  formatter.format(thisOrder.total) +
                  " วันที่: " +
                  moment.unix(thisOrder.createdAt / 1000).format("llll")
              }))
              )
            }
          />
        );
      }}
    </Query>
  </>
);

export default FormExampleForm;
