import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import OrderItem from "./OrderItem";
import CancelOrder from "./CancelOrder";
import Receipt from "../../Receipt/Receipt";
import {
  Button,
  Segment,
  Message,
  Header,
  Icon,
  Grid,
  Divider,
  Modal
} from "semantic-ui-react";
import moment from "moment";

import ReactToPrint from "react-to-print";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($id: ID!) {
    createPayment(id: $id) {
      message
    }
  }
`;

class Order extends Component {
  state = {
    showError: false,
    isLogged: false
  };
  render() {
    const { errorMessage } = this.state;
    const id = this.props.order.id;
    return (
      <>
        {this.state.showError && (
          <Segment basic textAlign="center">
            <Message
              warning
              onDismiss={e => this.setState({ showError: false })}
              compact
            >
              {errorMessage}
            </Message>
          </Segment>
        )}

        <Segment basic textAlign="center">
          <OrderComponent order={this.props.order} />
          {this.props.order.status === "wait" && (
            <Mutation
              mutation={CREATE_PAYMENT_MUTATION}
              variables={{
                id
              }}
              onCompleted={data => this._confirm(data)}
              onError={error => this._error(error)}
            >
              {mutation => (
                <Button.Group fluid>
                  <Button positive onClick={mutation}>
                    ชำระเงิน.
                  </Button>
                  <Button.Or />
                  <Modal
                    trigger={<Button negative>ยกเลิก</Button>}
                    basic
                    size="small"
                  >
                    <CancelOrder
                      id={this.props.order.id}
                      refetch={this.props.refetch}
                    />
                  </Modal>
                </Button.Group>
              )}
            </Mutation>
          )}
        </Segment>
        {this.props.order.status !== "wait" && (
          <Modal trigger={<Button fluid>พิมพ์ใบเสร็จรับเงิน</Button>}>
            <Modal.Header>ใบเสร็จรับเงิน</Modal.Header>
            <Modal.Content>
              <ReactToPrint
                trigger={() => (
                  <Button fluid>
                    พิมพ์ใบเสร็จรับเงิน
                  </Button>
                )}
                content={() => this.componentRef}
              />
              <Receipt
                order={this.props.order}
                ref={el => (this.componentRef = el)}
              />
            </Modal.Content>
          </Modal>
        )}
      </>
    );
  }
  editorText = htmltext => {
    this.setState({
      productDescriptionHtml: htmltext
    });
    console.log(htmltext);
  };
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
    console.log(this.state.productPublished);
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async data => {
    const message = data.createPayment;
    console.log(message);
    window.location = message.message;
  };
  _error = async error => {
    //alert(error);
    console.log(this.state.productImage);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

class OrderComponent extends Component {
  render() {
    return (
      <Segment basic textAlign="center">
        <Divider horizontal>
          <Header as="h3">
            <Icon name="ordered list" />
            รายการสั่งซื้อของคุณคือ #{this.props.order.id}
          </Header>
        </Divider>
        <Grid columns={3} divided>
          <Grid.Row>
            {!this.props.order.status || this.props.order.status === "wait" ? (
              <Grid.Column>
                <Header>
                  <Icon name="calendar alternate outline" />
                  ชำระเงินค่าสินค้าภายใน
                </Header>
                <Header>
                  {moment
                    .unix(this.props.order.createdAt / 1000)
                    .add(1, "d")
                    .format("llll")}
                  <Header.Subheader>กรุณาชำระเงินก่อนเวลา</Header.Subheader>
                </Header>
              </Grid.Column>
            ) : (
              <Grid.Column>
                <Header>
                  <Icon name="calendar alternate outline" />
                  เวลาที่สำเร็จ
                </Header>
                <Header>
                  {moment
                    .unix(this.props.order.updatedAt / 1000)
                    .add(1, "d")
                    .format("llll")}
                </Header>
              </Grid.Column>
            )}

            <Grid.Column>
              <Header>
                <Icon name="money bill alternate outline" />
                จำนวนเงินที่ต้องชำระ
              </Header>
              <Header>{formatter.format(this.props.order.total)} บาท</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>สถานะรายการสั่งซื้อ</Header>
              <Header>
                {(() => {
                  switch (this.props.order.status) {
                    case null:
                      return <Header color="yellow">รอชำระเงิน</Header>;
                    case "sended":
                      return <Header color="blue">สำเร็จ</Header>;
                    case "successful":
                      return <Header color="green">ชำระเงินแล้ว</Header>;
                    case "failed":
                      return <Header color="red">ล้มเหลว</Header>;
                    case "cancel":
                      return <Header color="red">ยกเลิก</Header>;
                    default:
                      return <Header color="yellow">รอชำระเงิน</Header>;
                  }
                })()}
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider horizontal>
          <Header as="h3">รายการสินค้า</Header>
        </Divider>
        <OrderItem order={this.props.order} />
        <Divider horizontal>
          <Header as="h3">สถานที่จัดส่ง</Header>
        </Divider>
        <Header as="h4">
          {"คุณ " +
            this.props.order.address.firstName +
            " " +
            this.props.order.address.lastName +
            " " +
            "โทร. " +
            this.props.order.address.mobileNumber +
            " " +
            "ที่อยู่ " +
            this.props.order.address.addr +
            " " +
            this.props.order.address.distric +
            " " +
            this.props.order.address.province +
            " " +
            this.props.order.address.postcode}
        </Header>
      </Segment>
    );
  }
}
export default Order;
