import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Segment, Message, Header, Modal } from "semantic-ui-react";
const CANCEL_ORDER_MUTATION = gql`
  mutation cancelOrder($id: ID!) {
    cancelOrder(id: $id) {
      message
    }
  }
`;

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
class CancelOrder extends Component {
  state = {
    showError: false,
    isLogged: false,
    isRemoved: false
  };
  render() {
    const id = this.props.id;
    const { errorMessage } = this.state;
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
        <Mutation
          mutation={CANCEL_ORDER_MUTATION}
          variables={{ id }}
          onCompleted={data => this._confirm(data, this.props.cart)}
          onError={error => this._error(error)}
        >
          {mutation => (
            <>
              <Header icon="browser" content="ยกเลิกการซื้อ" />
              <Modal.Content>
                <Segment basic textAlign="center">
                  <h3>{"ต้องการที่จะยกเลิกการซื้อหมายเลข " + id}</h3>
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" basic size="large" onClick={mutation}>
                  ยืนยัน
                </Button>
              </Modal.Actions>
            </>
          )}
        </Mutation>
      </>
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
    this.props.refetch();
    console.log(data);
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

export default CancelOrder;
