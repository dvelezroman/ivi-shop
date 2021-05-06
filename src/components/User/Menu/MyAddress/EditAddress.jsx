import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Message,
  Container,
  Header
} from "semantic-ui-react";
import { CartContext } from "../../../CartContext";
const UPDATE_ADDRESS_MUTATION = gql`
  mutation updateUserAddress(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $addr: String!
    $distric: String!
    $province: String!
    $mobileNumber: String!
    $postcode: String!
  ) {
    updateUserAddress(
      id: $id
      firstName: $firstName
      lastName: $lastName
      addr: $addr
      distric: $distric
      province: $province
      mobileNumber: $mobileNumber
      postcode: $postcode
    ) {
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
`;
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      addr: "",
      distric: "",
      province: "",
      mobileNumber: "",
      postcode: "",
      showError: false,
      success: false
    };
  }

  componentDidMount() {
    let a = this.props.a;
    this.setState({
      firstName: a.firstName,
      lastName: a.lastName,
      addr: a.addr,
      distric: a.distric,
      province: a.province,
      mobileNumber: a.mobileNumber,
      postcode: a.postcode
    });
  }

  render() {
    const {
      firstName,
      lastName,
      addr,
      distric,
      province,
      mobileNumber,
      postcode,
      errorMessage
    } = this.state;
    const id = this.props.a.id;
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
        {this.state.success ? (
          <Segment placeholder textAlign="center">
            <Header as="h2">เพื่มที่อยู่สำเร็จ</Header>
          </Segment>
        ) : (
          <Form size="large">
            <Segment>
              <Header>แก้ไขที่อยู่</Header>
              <Form.Input
                label="ชื่อ"
                fluid
                icon="user"
                iconPosition="left"
                value={firstName}
                placeholder="First Name"
                onChange={e => this.setState({ firstName: e.target.value })}
              />
              <Form.Input
                label="นามสกุล"
                fluid
                icon="user"
                iconPosition="left"
                value={lastName}
                placeholder="Last Name"
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <Form.Input
                label="ที่อยู่"
                fluid
                icon="user"
                iconPosition="left"
                value={addr}
                placeholder="Address"
                onChange={e => this.setState({ addr: e.target.value })}
              />
              <Form.Input
                label="อำเภอ"
                fluid
                icon="user"
                iconPosition="left"
                value={distric}
                placeholder="Distric"
                onChange={e => this.setState({ distric: e.target.value })}
              />
              <Form.Input
                label="จังหวัด"
                fluid
                icon="user"
                iconPosition="left"
                value={province}
                placeholder="Province"
                onChange={e => this.setState({ province: e.target.value })}
              />
              <Form.Input
                label="หมายเลขโทรศัพท์"
                fluid
                icon="user"
                iconPosition="left"
                value={mobileNumber}
                placeholder="Mobile number"
                onChange={e => this.setState({ mobileNumber: e.target.value })}
              />
              <Form.Input
                label="รหัสไปรษณีย์"
                fluid
                icon="user"
                iconPosition="left"
                value={postcode}
                placeholder="Postcode"
                onChange={e => this.setState({ postcode: e.target.value })}
              />
              <CartContext.Consumer>
                {cart => (
                  <>
                    <Mutation
                      mutation={UPDATE_ADDRESS_MUTATION}
                      variables={{
                        id,
                        firstName,
                        lastName,
                        addr,
                        distric,
                        province,
                        mobileNumber,
                        postcode
                      }}
                      onCompleted={data => this._confirm(data, cart)}
                      onError={error => this._error(error)}
                    >
                      {mutation => (
                        <Button
                          color="blue"
                          fluid
                          size="large"
                          onClick={mutation}
                        >
                          บันทึก
                        </Button>
                      )}
                    </Mutation>
                  </>
                )}
              </CartContext.Consumer>
            </Segment>
          </Form>
        )}
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
    this.setState({ success: true });
    cart.onLogin();
  };
  _error = async error => {
    //alert(error);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default Checkout;
