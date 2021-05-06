import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Segment, Message, Header, Card } from "semantic-ui-react";
const REMOVE_PRODUCT_MUTATION = gql`
  mutation deleteUserAddress($id: ID!) {
    deleteUserAddress(id: $id) {
      message
    }
  }
`;

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
class RemoveProduct extends Component {
  state = {
    showError: false,
    isLogged: false,
    isRemoved: false
  };
  render() {
    const id = this.props.a.id;
    const a = this.props.a;
    const { errorMessage } = this.state;
    if (this.state.isRemoved)
      return (
        <Segment placeholder textAlign="center">
          <Header as="h2">Removed</Header>
        </Segment>
      );
    return (
      <Segment>
        <Header>ลบที่อยู่</Header>
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

        <Card fluid>
          <Card.Content>
            <Card.Header>{a.firstName + " " + a.lastName}</Card.Header>
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
            <Mutation
              mutation={REMOVE_PRODUCT_MUTATION}
              variables={{ id }}
              onCompleted={data => this._confirm(data, this.props.cart)}
              onError={error => this._error(error)}
            >
              {mutation => (
                <Button color="red" fluid size="large" onClick={mutation}>
                  ลบที่อยู่นี้
                </Button>
              )}
            </Mutation>
          </Card.Content>
        </Card>
      </Segment>
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
  _confirm = async (data,cart) => {
    cart.onLogin()
    console.log(data)
    this.setState({ isRemoved: true });
  };
  _error = async error => {
    //alert(error);
    console.log(this.state.productTags);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default RemoveProduct;
