import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Segment,
  Message,
  Container,
  Header,
  Icon,
  Grid,
  Divider
} from "semantic-ui-react";
import moment from "moment";
import OrderItem from "../Menu/Order/OrderItem";
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
class Checkout extends Component {
  state = {
    showError: false,
    isLogged: false
  };
  componentWillMount() {}
  render() {
    const { errorMessage } = this.state;
    const id = this.props.order.id;
    return (
      <Container>
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

        <Segment textAlign="center">
          <Header as="h2" icon color="green">
            <Icon name="check" />
            สั่งซื้อเรียบร้อย
          </Header>
          <Divider horizontal>
            <Header as="h3">
              <Icon name="ordered list" />
              รายการสั่งซื้อของคุณคือ #{this.props.order.id}
            </Header>
          </Divider>
          <Grid columns={3} divided>
            <Grid.Row>
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
                  รอชำระเงิน
                  <Header.Subheader>กรุณาชำระเงิน</Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Divider horizontal>
                  <Header as="h3">รายการสินค้า</Header>
                </Divider>
                <OrderItem order={this.props.order} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Divider horizontal>
                  <Header as="h3">สถานที่จัดส่ง</Header>
                </Divider>
              </Grid.Column>
            </Grid.Row>
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
            <Grid.Row>
              <Grid.Column width={16}>
                <Mutation
                  mutation={CREATE_PAYMENT_MUTATION}
                  variables={{
                    id
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button fluid color="blue" onClick={mutation}>
                      ชำระเงิน.
                    </Button>
                  )}
                </Mutation>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
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

export default Checkout;
