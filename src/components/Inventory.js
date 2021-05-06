import React, { Component } from "react";
import { CartContext } from "./CartContext";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import toast from "toasted-notes";
const MY_QUERY = gql`
  query MY_QUERY {
    me {
      id
      name
      email
      type
      mobileNumber
      address {
        id
        firstName
        lastName
        addr
        distric
        province
        mobileNumber
        postcode
      }
    }
  }
`;

const AUTH_TOKEN = "auth-token";
let item = [];
class Inventory extends Component {
  constructor(props) {
    if (localStorage.getItem("items"))
      item = JSON.parse(localStorage.getItem("items"));
    super(props);
    this.state = {
      items: item,
      price: localStorage.getItem("price") || 0,
      itemSum: localStorage.getItem("itemSum") || 0,
      user: undefined,
      token: localStorage.getItem(AUTH_TOKEN) || undefined
    };
  }
  componentDidMount() {
    if (!this.state.user && this.state.token) {
      this.runQuery();
    }
  }

  async runQuery() {
    try {
      const res = await this.props.client.query({
        fetchPolicy: "network-only",
        query: MY_QUERY
      });
      if (!res) {
        localStorage.removeItem(AUTH_TOKEN);
      }
      this.setState({
        user: res.data.me
      });
      console.log(res);
      console.log("update user context");
      this.updatesum();
    } catch (e) {
      console.log("Unexpected error occurred");
      localStorage.removeItem(AUTH_TOKEN);
      this.setState({
        user: undefined,
        token: undefined
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
  updatesum() {
    this.setState({
      price:
        this.state.items.reduce(
          (acc, { price, selected }) => acc + price * selected,
          0
        ) || 0,
      itemSum:
        this.state.items.reduce((acc, { selected }) => acc + selected, 0) || 0
    });
    localStorage.setItem("price", this.state.price);
    localStorage.setItem("itemSum", this.state.itemSum);
  }
  onAddToCart = this.onAddToCart.bind(this);
  async onAddToCart(p, n) {
    var text = "";
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    console.log(p.quantity);
    if (index >= 0) {
      var newArray = [...this.state.items];
      console.log("n:" + (newArray[index].selected + n) + "|" + p.quantity);
      if (newArray[index].selected + n > p.quantity) {
        text = "สิ้นค้าในร้านไม่พอให้เพิ่มเข้าตะกร้า";
      } else {
        newArray[index].selected += parseInt(n, 10);
        await this.setState({
          items: newArray
        });
        text = "เพิ่มสินค้า " + n + " ชิ้นเข้าตะกร้า";
      }
    } else {
      p.selected = parseInt(n, 10);
      await this.setState({
        items: [...this.state.items, p]
      });
      text = "เพิ่มสินค้า " + n + " ชิ้นเข้าตะกร้า";
    }
    toast.notify(text, { position: "bottom-right" });
    await localStorage.setItem("items", JSON.stringify(this.state.items));

    this.updatesum();
  }
  onSetCartValue = this.onSetCartValue.bind(this);
  async onSetCartValue(p, value) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    value = parseInt(value, 10);
    if (!value || value < 1) {
      value = 1;
    }
    if (value > p.quantity) value = p.quantity;
    if (index >= 0) {
      var newArray = [...this.state.items];
      newArray[index].selected = value;
      this.setState({
        items: newArray
      });
    }
    await localStorage.setItem("items", JSON.stringify(this.state.items));
    this.updatesum();
  }
  onDeleteFromCart = this.onDeleteFromCart.bind(this);
  async onDeleteFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    var newArray = [...this.state.items];
    newArray.splice(index, 1);
    this.setState({
      items: newArray
    });
    toast.notify("ลบสินค้าออกจากตะกร้า", {
      position: "bottom-right"
    });
    await localStorage.setItem("items", JSON.stringify(newArray));
    await this.updatesum();
  }
  onRemoveFromCart = this.onRemoveFromCart.bind(this);
  async onRemoveFromCart(p) {
    const index = this.state.items.findIndex(function(object) {
      return object.slug === p.slug;
    });
    var newArray = [...this.state.items];
    if (this.state.items[index].selected > 1) {
      newArray[index].selected -= 1;
      this.setState({
        items: newArray
      });
    } else {
      newArray.splice(index, 1);
      this.setState({
        items: newArray
      });
    }
    await localStorage.setItem("items", JSON.stringify(newArray));
    await this.updatesum();
  }
  onClearCart = this.onClearCart.bind(this);
  async onClearCart() {
    await this.setState({
      items: [],
      price: 0,
      itemSum: 0
    });
    localStorage.removeItem("items");
    localStorage.setItem("price", 0);
    localStorage.setItem("itemSum", 0);
    await this.updatesum();
    console.log("cleared cart");
  }
  onLogout = this.onLogout.bind(this);
  onLogout() {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.clear();
    this.setState({
      token: localStorage.getItem(AUTH_TOKEN) || undefined,
      user: undefined
    });
    this.updatesum();
    this.forceUpdate();
  }
  onLogin = this.onLogin.bind(this);
  onLogin() {
    this.runQuery();
  }

  render() {
    console.log(this.state.items);
    return (
      <CartContext.Provider
        value={{
          items: this.state.items,
          price: this.state.price,
          itemSum: this.state.itemSum,
          user: this.state.user,
          onLogout: this.onLogout,
          onLogin: this.onLogin,
          onAddToCart: this.onAddToCart,
          onRemoveFromCart: this.onRemoveFromCart,
          onDeleteFromCart: this.onDeleteFromCart,
          onSetCartValue: this.onSetCartValue,
          onEditCartItem: this.onEditCartItem,
          onEditCart: this.onEditCart,
          onClearCart: this.onClearCart
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default withApollo(Inventory);
