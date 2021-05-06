import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Orders from "./Orders";

import {
  Message,
  Segment,
  Table,
  Header,
  Placeholder,
  Menu
} from "semantic-ui-react";

const MY_ORDER = gql`
  query myOrder($status: String) {
    myOrder(status: $status) {
      id
      paymentId
      total
      status
      orderProduct {
        slug
        title
        price
        quantity
      }
      createdAt
    }
  }
`;

const Placehold = props => {
  return (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
  );
};
class SingleOrder extends React.Component {
  state = { status: "wait" };
  handleItemClick = (e, { name }) => this.setState({ status: name });

  render() {
    const { status } = this.state;
    return (
      <> 
        <Header as="h3">Order | รายการสั่งซื้อ</Header>
        <Menu tabular>
          <Menu.Item
            name="wait"
            active={status === "wait"}
            onClick={this.handleItemClick}
          >
            ที่ต้องชำระ
          </Menu.Item>
          <Menu.Item
            name="successful"
            active={status === "successful"}
            onClick={this.handleItemClick}
          >
            รอการจัดส่ง
          </Menu.Item>
          <Menu.Item
            name="sended"
            active={status === "sended"}
            onClick={this.handleItemClick}
          >
            ที่สำเร็จ
          </Menu.Item>
          <Menu.Item
            name="cancel"
            active={status === "cancel"}
            onClick={this.handleItemClick}
          >
            ยกเลิกแล้ว
          </Menu.Item>
        </Menu>
        <Query
          fetchPolicy="network-only"
          query={MY_ORDER}
          variables={{ status }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Placehold />;
            if (error)
              return (
                <Segment basic textAlign="center">
                  <Message warning compact>
                    {error.message}
                  </Message>
                </Segment>
              );
            return (
              <Table>
                <Table.Body>
                  {data.myOrder.map((currentOrder, i) => (
                    <Orders
                      key={i}
                      order={currentOrder}
                      setId={this.props.setId}
                    />
                  ))}
                </Table.Body>
              </Table>
            );
          }}
        </Query>
      </>
    );
  }
}
export default SingleOrder;
