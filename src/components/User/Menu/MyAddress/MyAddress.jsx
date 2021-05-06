import React, { Component } from "react";
import {
  Button,
  Modal,
  Segment,
  Message,
  Container,
  Header,
  Card
} from "semantic-ui-react";
import { CartContext } from "../../../CartContext";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import RemoveAddress from "./RemoveAddress";
class Checkout extends Component {
  state = {};

  render() {
    const { errorMessage } = this.state;
    return (
      <Container>
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
              <Segment basic padded>
                
              <Header>แก้ไขที่อยู่</Header>
                {cart.user && (
                  <Card.Group>
                    {cart.user.address.map(function(a, i) {
                      return (
                        <Card key={i} fluid>
                          <Card.Content>
                            <Card.Header>
                              {a.firstName + " " + a.lastName}
                            </Card.Header>
                            <Card.Meta>{a.mobileNumber}</Card.Meta>
                            <Card.Description>
                              {a.addr +
                                " อำเภอ " +
                                a.distric +
                                " จังหวัด " +
                                a.province +
                                " " +
                                a.postcode}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <div className="ui two buttons">
                              <Modal
                                trigger={
                                  <Button basic color="blue" >
                                    แก้ไข
                                  </Button>
                                }

                                basic
                                size="small"
                              >
                                <EditAddress a={a} cart={cart} />
                              </Modal>
                              <Modal
                                trigger={
                                  <Button basic color="red">
                                    ลบ
                                  </Button>
                                }
                                basic
                                size="small"
                              >
                                <RemoveAddress a={a} cart={cart} />
                              </Modal>
                            </div>
                          </Card.Content>
                        </Card>
                      );
                    })}
                  </Card.Group>
                )}

                <Modal
                  trigger={
                    <Button fluid basic color="green" style={{ marginTop: "2em" }}>
                      เพิ่มที่อยู่ไหม่
                    </Button>
                  }
                  basic
                  size="small"
                >
                  <>
                    <Segment basic>
                      <Header as="h3">เพิ่มที่อยู่ไหม่</Header>
                    </Segment>
                    <AddAddress />
                  </>
                </Modal>
              </Segment>
            </>
          )}
        </CartContext.Consumer>
      </Container>
    );
  }
}

export default Checkout;
