import { withRouter } from "react-router";
import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Input,
  Dropdown,
  Message,
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
const ADD_PRODUCT_MUTATION = gql`
mutation AddProductMutation(
    $slug: String!
  	$title: String!
    $category: String!
  	$subCategory: String!
  ) {
    addProduct(
      slug:$slug
      title:$title
      category:$category
      subCategory:$subCategory
    ) {
      id
      slug
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
    slug: "",
    title: "",
    category:null,
    categoryvalue:0,
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
      category,
      categoryvalue,
      subCategory,
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

            <h3 className="ui header">Add Product</h3>
            <Form size="large">
              <Segment basic>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Product Slug"
                    placeholder="productSlug"
                    value={slug}
                    required
                    onChange={e =>
                      this.setState({ slug: e.target.value })
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Product Title"
                    placeholder="productTitle"
                    required
                    value={title}
                    onChange={e =>
                      this.setState({ title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Dropdown}
                    label="Category"
                    placeholder="Category"
                    selection
                    value={categoryvalue}
                    noResultsMessage={null}
                    options={this.props.category.map((data,i) => ({key: data.slug, value: i, text: data.slug}))}
                    onChange={(e, { value }) =>{
                        console.log(this.props.category[value].slug)
                        this.setState({
                          category: this.props.category[value].slug,
                          categoryvalue:value

                        })
                      }
                    }
                  />
                  <Form.Field
                    control={Dropdown}
                    label="Sub Category"
                    placeholder="Sub Category"
                    selection
                    required
                    value={subCategory}
                    noResultsMessage={null}
                    options={this.props.category[categoryvalue].subCategory.map((data,i) => ({key: data.slug, value: data.slug, text: data.slug}))}
                    onChange={(e, { value }) =>{
                      console.log(value)
                      this.setState({
                        subCategory:value
                      })
                    }
                    }
                    
                  />
                </Form.Group>

                <Mutation
                  mutation={ADD_PRODUCT_MUTATION}
                  variables={{
                    slug,
                    title,
                    category,
                    subCategory
                    
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      Add Product
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
    const product = data.addProduct;
    console.log(product);
    this.props.history.push("/admin/product/edit/"+product.slug);
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
