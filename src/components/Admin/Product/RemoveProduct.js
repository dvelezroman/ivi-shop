import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Segment, Message, Header } from "semantic-ui-react";
import Product from "./GetProduct";
const REMOVE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
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
    const slug = this.props.slug;
    const id = this.props.id;
    const { errorMessage } = this.state;
    if (this.state.isRemoved)
      return (
        <Segment placeholder textAlign='center'>
          <Header as="h2">Removed</Header>
        </Segment>
      );
    return (
      <div>
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
          mutation={REMOVE_PRODUCT_MUTATION}
          variables={{ id }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error(error)}
        >
          {mutation => (
            <Button color="red" fluid size="large" onClick={mutation}>
              Remove this product
            </Button>
          )}
        </Mutation>
        <Product slug={slug} />
      </div>
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
    this.props.refetch()
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
