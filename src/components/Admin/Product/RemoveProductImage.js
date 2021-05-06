import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Segment, Message, Header, Image } from "semantic-ui-react";
const REMOVE_MUTATION = gql`
  mutation deleteProductImage($id: ID!) {
    deleteProductImage(id: $id) {
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
    // const { slug , id } = this.props.match.params
    const image = this.props.image;
    const id = this.props.image.id;
    const { errorMessage } = this.state;
    if (this.state.isRemoved)
      return (
        <Segment placeholder textAlign="center">
          <Header as="h2">Removed</Header>
        </Segment>
      );
    return (
      <Segment>
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
          mutation={REMOVE_MUTATION}
          variables={{ id }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error(error)}
        >
          {mutation => (
            <Button color="red" fluid size="large" onClick={mutation}>
              Remove this Image
            </Button>
          )}
        </Mutation>
        <Image fluid src={"http://sushingg-api.herokuapp.com/images/" + image.name} />
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
  _confirm = async data => {
    //window.location = '/admin/product/list'
    //this.props.history.push(`/admin/product/list`)
    this.setState({ isRemoved: true });
    this.props.refetch();
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
