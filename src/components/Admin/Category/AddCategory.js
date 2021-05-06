import { withRouter } from "react-router";
import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Input,
  Message,
  
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
const ADD_CATEGORY_MUTATION = gql`
mutation AddCategoryMutation(
    $slug: String!
  	$title: String!
  ) {
    addCategory(
      slug:$slug
      title:$title
    ) {
      id
      slug
    }
  }
`;

class Checkout extends Component {
  state = {
    slug: "",
    title: "",
    category:0,
    subCategory:null,
    showError: false,
    isLogged: false,
  };
  componentWillMount() {

  }
  render() {
    const {
      slug,
      title,
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

            <h3 className="ui header">Add Category</h3>
            <Form size="large">
              <Segment basic>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Category Slug"
                    placeholder="CategorySlug"
                    value={slug}
                    required
                    onChange={e =>
                      this.setState({ slug: e.target.value })
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Category Title"
                    placeholder="CategoryTitle"
                    required
                    value={title}
                    onChange={e =>
                      this.setState({ title: e.target.value })
                    }
                  />
                </Form.Group>
                

                <Mutation
                  mutation={ADD_CATEGORY_MUTATION}
                  variables={{
                    slug,
                    title,
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      Add Category
                    </Button>
                  )}
                </Mutation>
              </Segment>
            </Form>
          </div>
        )}
      </CartContext.Consumer>
    );
  }
  editorText = htmltext => {
    this.setState({
      productDescriptionHtml: htmltext
    });
    console.log(htmltext);
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
    const cate = data.addCategory;
    console.log(cate);
    this.props.history.push("/admin/category/list/");
  };
  _error = async error => {
    //alert(error);
    console.log(this.state.productImage);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default withRouter(Checkout);
