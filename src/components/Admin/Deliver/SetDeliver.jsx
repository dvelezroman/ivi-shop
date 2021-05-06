import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import toast from "toasted-notes";
import { Button, Segment, Message } from "semantic-ui-react";
import { CartContext } from "../../CartContext";

const UPDATE_MUTATION = gql`
  mutation updateOrderStatusMutation($id: [ID]!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      message
    }
  }
`;

/*const ADD_ORDER_MUTATION = gql`
  mutation AddCategoryMutation($categorySlug: String!, $categorySlug: String!, $tags:[tagsInput]!) {
  addCategory(categorySlug: $categorySlug, categorySlug: $categorySlug, tags: $tags) {
    id
    }
  }
`*/

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
class Checkout extends Component {
  state = {
    id: this.props.data,
    status: 'sended',
    showError: false,
    isLogged: false,
    imageOptions: []
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });
  componentWillMount() {}
  render() {
    const {
      id,
      status,
      errorMessage
    } = this.state;
    return (
      <CartContext.Consumer>
        {cart => (
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

            <h3 className="ui header">รายการสั่งซื้อที่เลือก</h3>
              <Segment basic>
                <Mutation
                  mutation={UPDATE_MUTATION}
                  variables={{
                    id,
                    status
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      อัพเดทสถานะการส่ง
                    </Button>
                  )}
                </Mutation>
              </Segment>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
  editorText = htmltext => {
    this.setState({
      descriptionHtml: htmltext
    });
  };
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
    console.log(this.state.productPublished);
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async data => {
    const order = data.updateProduct;
    console.log(order);
    this.props.refetch();
    toast.notify("บันทึกการแก้ไขสินค้าสำเร็จ", {
      position: "bottom-right"
    });
    //window.location = "/admin/listproduct";
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
