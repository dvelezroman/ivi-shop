import { withRouter } from "react-router";
import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Input,
  Message
} from "semantic-ui-react";
const ADD_CATEGORY_MUTATION = gql`
mutation AddCategoryMutation(
    $id: ID!
    $slug: String!
  	$title: String!
  ) {
    addSubCategory(
      id:$id
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
    const { cslug , id } = this.props.match.params;
    console.log(id)
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

            <h3 className="ui header">Add Sub Category for {cslug}</h3>
            <Form size="large">
              <Segment basic>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Sub Category Slug"
                    placeholder="Sub Category Slug"
                    value={slug}
                    required
                    onChange={e =>
                      this.setState({ slug: e.target.value })
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Sub Category Title"
                    placeholder="Sub Category Title"
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
                    id,
                    slug,
                    title,
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      Add Sub Category
                    </Button>
                  )}
                </Mutation>
              </Segment>
            </Form>
          </>
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
    const cate = data.addSubCategory;
    console.log(cate);
    this.props.history.push("/admin/category/list/")
  };
  _error = async error => {
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default withRouter(Checkout);
