import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { CartContext } from "../../CartContext";
import isLogin from '../../../common'

/*const ADD_PRODUCT_MUTATION = gql`
  mutation AddProductMutation($productSlug: String!, $productTitle: String!, $productPrice:Int!, $productDescription:String!, $productPublished:String!,$productTags:String!,$productOptions:String!,$productImage:String!) {
 	addProduct(productSlug: $productSlug, productTitle: $productTitle, productPrice: $productPrice, productDescription: $productDescription,productPublished: $productPublished,productTags: $productTags,productOptions: $productOptions,productImage: $productImage ) {
		id
    }
  }
`*/

const ADD_ORDER_MUTATION = gql`
  mutation AddCategoryMutation($categorySlug: String!, $categorySlug: String!, $tags:[tagsInput]!) {
  addCategory(categorySlug: $categorySlug, categorySlug: $categorySlug, tags: $tags) {
    id
    }
  }
`

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

class Checkout extends Component {
    state = {
        orderEmail: '',
        orderAddr1: '',
        orderFirstname: '',
      orderLastname: '',
      showError: false,
      isLogged: false
    }
    render() {
    const login = isLogin()
    if(login !== null){
      if(!this.state.isLogged)
      this.setState({  orderEmail: login.email ,
                  orderFirstname: login.fname ,
                  orderLastname: login.lname,
                  isLogged: true })
    }
    console.log(login)
    if(login == null){this.props.history.push(`/`)}
    const {  orderEmail, orderAddr1, orderFirstname, orderLastname, errorMessage} = this.state
    var items = JSON.parse(localStorage.getItem('items')|| "[]")
    if(items !== null){
      var orderTotal = items.reduce((acc, { productPrice }) => acc + productPrice, 0)||''
      var orderProducts = items.filter(onlyUnique).map((p) => {
        delete p.__typename
        delete p.productDescription
        delete p.productTags
        delete p.productAddedDate
        delete p.productImage
        delete p.__typename
        return p
      })
      console.log(orderProducts)
    }else{
      this.props.history.push(`/`)
    }
    //((p, i) => (delete p.__typename return p    )))
    return (
        <CartContext.Consumer>
          {cart => (
          <div>

          {this.state.showError&&(<Segment basic textAlign="center"><Message warning onDismiss={(e) => this.setState({showError: false})} compact>{errorMessage}</Message></Segment>)}
        
        <h3 class="ui header">dashboard</h3>

            
                <Form size='large' >
                  <Segment >
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderFirstname}
                      placeholder='First Name' 
                      onChange={e => this.setState({ orderFirstname: e.target.value })}
                    />
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderLastname}
                      placeholder='Last Name' 
                      onChange={e => this.setState({ orderLastname: e.target.value })}
                    />
                    <Form.Input 
                      fluid 
                      icon='user' 
                      iconPosition='left' 
                      value={orderAddr1}
                      placeholder='Address' 
                      onChange={e => this.setState({ orderAddr1: e.target.value })}
                    />
        
                    <Mutation
                      mutation={ADD_ORDER_MUTATION}
                      variables={{ orderEmail, orderFirstname, orderLastname, orderAddr1, orderTotal, orderProducts}}
                      onCompleted={data => this._confirm(data)}
                      onError={error => this._error(error) }
                    >
                      {mutation => (
                        <Button color='blue' fluid size='large' onClick={mutation}>
                          Checkout
                        </Button>
                      )}
                    </Mutation>
                  </Segment>
                </Form>

      
            </div>
              )}
        </CartContext.Consumer>
    )}
    
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true }
    })
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false }
    })
  };
  _confirm = async data => {
    const order  = data.addOrder
    console.log(order)
    //window.location = order.orderPaymentLink
  }
  _error = async error => {
    //alert(error);
    this.setState({errorMessage: error.message})
    this.toggleError()
  }
  _saveUserData = token => {
  //localStorage.setItem(AUTH_TOKEN, token)
  }
}


export default Checkout;