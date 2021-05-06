import React from "react";
import { CartContext } from "../CartContext";
import {
  Table,
  Icon,
  Image,
  Header,
  Segment,
  Input,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import isLogin from "../../common";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0
});
const CartSum = props => {
  const login = isLogin();
  return (
    <>
      <CartContext.Consumer>
        {cart => (
          <div>
            {cart.items.length ? (
              <Segment basic clearing>
                <Table
                  fixed
                  basic="very"
                  celled
                  striped
                  unstackable
                  style={{ minWidth: 450 }}
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell width="8">สินค้า</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        ราคาต่อชิ้น
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "150px" }}
                        textAlign="center"
                      >
                        จำนวน
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        ราคารวม
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        จัดการ
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {cart.items.filter(onlyUnique).map((p, i) => (
                      <Table.Row key={i} verticalAlign="top">
                        <Table.Cell>
                          {p.image.length ? (
                            <Image
                              rounded
                              size="tiny"
                              src={
                                "http://sushingg-api.herokuapp.com/images/" +
                                p.image[0].name 
                              }
                            />
                          ) : (
                            <Image rounded size="tiny" src="/image/test.jpg" />
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <Header as="h4">
                            <Header.Content>
                              {p.title}{" "}
                              <Header.Subheader>
                                {p.description}{" "}
                              </Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Header as="h4">
                            <Header.Content>฿{formatter.format(p.price)}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Header as="h4">
                            <Header.Content>
                              <Icon
                                name="minus"
                                color="red"
                                onClick={() => cart.onRemoveFromCart(p)}
                              />
                              <Input
                                style={{ width: "50px" }}
                                size="mini"
                                type="tel"
                                value={parseInt(p.selected, 10)}
                                onChange={e =>
                                  cart.onSetCartValue(p, e.target.value)
                                }
                              />
                              <Icon
                                name="plus"
                                color="green"
                                onClick={() => cart.onAddToCart(p,1)}
                              />
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Header as="h4">
                            {formatter.format(p.selected * p.price) || "none"}
                          </Header>
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Header
                            as="h4"
                            color="red"
                            onClick={() => cart.onDeleteFromCart(p)}
                          >
                            ลบ
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Header as="h3" textAlign="left" floated="left">
                  <Header.Subheader />
                  {"สินค้าทั่งหมด " + cart.itemSum + " สินค้า"}
                </Header>
                {!login ? (
                  <Button
                    color="blue"
                    floated="right"
                    animated="fade"
                    as={Link}
                    to="/login"
                    style={{ marginLeft: "0.5em" }}
                  >
                    <Button.Content visible>
                      เข้าสู่ระบบเพื่อซื้อสินค้า
                    </Button.Content>
                    <Button.Content hidden>
                      <Icon name="sign-in" />
                    </Button.Content>
                  </Button>
                ) : (
                  <Button
                    color="blue"
                    floated="right"
                    animated="fade"
                    as={Link}
                    to="/checkout"
                    style={{ marginLeft: "0.5em" }}
                  >
                    <Button.Content visible>สั่งสินค้า</Button.Content>
                    <Button.Content hidden>Check out</Button.Content>
                  </Button>
                )}

                <Header as="h3" textAlign="right" floated="right">
                  <Header.Subheader>
                    {"รวมค่าสินค้า (" + cart.itemSum + " สินค้า) "}
                  </Header.Subheader>
                  {formatter.format(cart.price)} บาท
                </Header>
              </Segment>
            ) : (
              <Segment placeholder>
                <Header icon>
                  <Icon name="cart" />
                  ไม่มีสินค้าในรถเข็นของคุณ
                  <Header.Content>
                    <Link to="/">เลือกซื้อสินค้า</Link>
                  </Header.Content>
                </Header>
              </Segment>
            )}
          </div>
        )}
      </CartContext.Consumer>
    </>
  );
};
export default CartSum;
