import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Modal,
  Segment,
  Message,
  Container,
  Header,
  Dropdown
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
import Cart from "../../Cart/CartSummary";
import AddAddress from "../../User/Menu/MyAddress/AddAddress";
import Complete from "./Complete";
const ADD_ORDER_MUTATION = gql`
  mutation addUserOrderMutation(
    $total: Int
    $address: Addressinput!
    $products: [OrderProductinput]!
  ) {
    addUserOrder(total: $total, address: $address, orderProduct: $products) {
      id
      total
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
    }
  }
`;
class Checkout extends Component {
  state = {
    addrIndex: null,
    total: null,
    address: [],
    products: null,
    disable: true,
    showError: false,
    isLogged: false,
    completed: false,
    order: undefined
  };
  handleChangeAddress = (value, cart) => {
    if (cart.itemSum > 0) {
      let address = cart.user.address[value];
      var product = JSON.parse(localStorage.getItem("items")) || [];
      try {
        delete address.__typename;
        delete address.id;
        product.map(function(a, i) {
          let res = a;
          res.quantity = a.selected;
          delete res.id;
          delete res.selected;
          delete res.title;
          delete res.price;
          delete res.description;
          delete res.descriptionHtml;
          delete res.category;
          delete res.subCategory;
          delete res.image;
          delete res.__typename;
          delete res.updatedAt;
          return res;
        });
        console.log(product);
      } catch {}
      this.setState({
        addrIndex: value,
        //total: cart.price,
        total: 0,
        address: address,
        products: product,
        disable: false
      });
      console.log(address);
      console.log(this.state.total);
      console.log(cart.items);
      console.log(product);
    }
  };
  render() {
    const { errorMessage, total, address, products } = this.state;
    if (this.state.completed) return <Complete order={this.state.order} />;
    return (
      <Container style={{ padding: "3em 0em" }}>
        <CartContext.Consumer>
          {cart => (
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
              <Segment padded>
                {cart.user && (
                  <Dropdown
                    style={{ width: "80%" }}
                    placeholder="เลือกที่อยู่เพื่อจัดส่งสินค้า"
                    selection
                    onChange={(e, { value }) =>
                      this.handleChangeAddress(value, cart)
                    }
                    value={this.state.addrIndex}
                    options={cart.user.address.map(function(a, i) {
                      let text =
                        a.mobileNumber +
                        " " +
                        a.firstName +
                        " " +
                        a.lastName +
                        " " +
                        a.addr +
                        " อำเภอ " +
                        a.distric +
                        " จังหวัด " +
                        a.province +
                        " " +
                        a.postcode;
                      return {
                        key: a.id,
                        text: text,
                        value: i
                      };
                    })}
                  />
                )}

                <Modal
                  trigger={
                    <Button style={{ width: "19%" }} attached="right" fluid>
                      เพิ่มที่อยู่ไหม่
                    </Button>
                  }
                  basic
                  size="small"
                >
                  <AddAddress />
                </Modal>
              </Segment>
              <Segment padded>
                <Cart />
              </Segment>
              <Segment.Group>
                <Segment padded>
                  <Header as="h3">วิธีการจัดส่ง</Header>
                </Segment>
                <Segment padded textAlign="right">
                  <Mutation
                    mutation={ADD_ORDER_MUTATION}
                    variables={{
                      total,
                      address,
                      products
                    }}
                    onCompleted={data => this._confirm(data, cart)}
                    onError={error => this._error(error)}
                  >
                    {mutation => (
                      <Button
                        color="blue"
                        fluid
                        disabled={this.state.disable}
                        size="large"
                        onClick={mutation}
                      >
                        บันทึก
                      </Button>
                    )}
                  </Mutation>
                </Segment>
              </Segment.Group>
            </>
          )}
        </CartContext.Consumer>
      </Container>
    );
  }

  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async (data, cart) => {
    await cart.onClearCart();
    const orders = data.addUserOrder;
    console.log(orders);
    this.setState({ completed: true, order: orders });
    //window.location = "/myorders";
  };
  _error = async error => {
    //alert(error);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
}

export default Checkout;
