import React, { Component } from "react";
import { Grid, Menu, Segment, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import Profile from "./Profile/Profile";
import MyAddres from "./MyAddress/MyAddress";
import Orders from "./Order/ListOrder";
import Order from "./Order/SingleOrder";
export default class MyMenu extends Component {
  state = {
    activeItem: "profile",
    orderId: undefined
  };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, orderId: undefined });

  setId = id => {
    this.setState({ orderId: id });
    console.log(id);
  };

  componentDidMount() {
    if (this.props.match.params.active) {
      this.setState({ activeItem: this.props.match.params.active });
    }
    if (this.props.match.params.id) {
      this.setState({ orderId: this.props.match.params.id });
    }
    console.log(this.state.activeItem);
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment secondary  vertical style={{ padding: "2em 5rem",height: "85vh"}}>
        <Segment style={{ marginBottom:"2em"}}>
          <Grid>
            <Grid.Column width={4}>
              <Header>การตั่งค่า</Header>
              <Menu fluid vertical tabular>
                <Menu.Item
                  name="profile"
                  as={Link}
                  to={"/my/profile/"}
                  active={activeItem === "profile"}
                  onClick={this.handleItemClick}
                >
                  ข้อมูลส่วนตัว
                </Menu.Item>
                <Menu.Item
                  name="address"
                  as={Link}
                  to={"/my/address/"}
                  active={activeItem === "address"}
                  onClick={this.handleItemClick}
                >
                  ที่อยู่ของฉัน
                </Menu.Item>
                <Menu.Item
                  name="orders"
                  as={Link}
                  to={"/my/orders/"}
                  active={activeItem === "orders"}
                  onClick={this.handleItemClick}
                >
                  การซื้อของฉัน
                </Menu.Item>
                <CartContext.Consumer>
                  {cart =>
                    cart.user &&
                    (cart.user.type !== "user" && (
                      <Menu.Item
                        name="จัดการร้านค้า"
                        as={Link}
                        to={"/admin" || ""}
                      />
                    ))
                    
                  }
                </CartContext.Consumer>
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12}>
              <Segment>
                {activeItem === "profile" && <Profile />}
                {activeItem === "address" && <MyAddres />}
                {activeItem === "orders" &&
                  (this.state.orderId ? (
                    <Order id={this.state.orderId} />
                  ) : (
                    <Orders setId={this.setId} />
                  ))}
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
    );
  }
}
