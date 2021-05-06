import React from "react";
//import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch,BrowserRouter } from "react-router-dom";
import PRoute from "./components/Route/PRoute"
import ARoute from "./components/Route/ARoute"
import jwtDecode from "jwt-decode";

//import Navbar from './components/Navbar/Navbar';
import LoginLanded from "./components/Login/LoginLanded";
//
import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Footer from "./components/Footer/Footer";
//
import Products from "./components/Products/ShowAllProduct";
import Product from "./components/Product/Products";
import AllCategory from "./components/AllCategory/AllCategory";
//
import Cart from "./components/Cart/Cart";

import Checkout from "./components/User/Checkout/Checkout";
import UserMenu from "./components/User/Menu/Menu"
import Receipt from "./components/User/Receipt/Receipt"

import Home from "./components/HomepageLayout";
import Inventory from "./components/Inventory";
import Wip from "./components/Wip";
import P404 from "./components/P404";
import Editor from "./components/Editor/Editor";
//admin comp
import Admin from "./components/Admin/Adnav/Adnav";
import Test from "./components/Admin/Mutations/Mutations";
import AdOrder from "./components/Admin/Order/Orders";
import Deliver from "./components/Admin/Deliver/GetDeliver"
//product
import AddProducts from "./components/Admin/Product/AddProducts";
import RemoveProduct from "./components/Admin/Product/RemoveProduct";
import ListProduct from "./components/Admin/ListProduct/ListProducts";
import EditProduct from "./components/Admin/Product/EditProductGetData";
//category
import ListCategory from "./components/Admin/Category/ListCategorys";
import AddCategory from "./components/Admin/Category/AddCategory"
import AddSubCategory from "./components/Admin/Category/AddSubCategory"

import Search from "./components/Search/Search"
import Dash from "./components/Admin/Dash/Dash";
import Users from "./components/Admin/User/Users";
const AUTH_TOKEN = "auth-token";

let token 

function checklogin(){
  let res = null
  token = localStorage.getItem(AUTH_TOKEN)||null
  if (token !== null) {
    var decoded = jwtDecode(token);
    res = decoded;
    if (Date.now() / 1000 > res.exp) {
      localStorage.removeItem(AUTH_TOKEN)
      localStorage.clear();
      console.log("Oh, you have a key, but it's expired! ")
    }
  }else{
    console.log("You don't have a key? Why don't you ask that gentleman there? Go on then")
  }
  return res
}
//uri:    https://sushingg-api.herokuapp.com/graphql
//        http://localhost:4000/graphql
const client = new ApolloClient({
  uri: "https://sushingg-api.herokuapp.com/graphql",
  request: async operation => {
    if (checklogin()) {
      operation.setContext({
        headers: {
          Authorization: "Bearer " + localStorage.getItem(AUTH_TOKEN)
        }
      });
    }
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
    <Inventory>
      <Switch>
        <Route path="/admin">
          <Admin>
            <Switch>
              <ARoute path="/admin/login" component={LoginLanded} />
              <ARoute path="/admin/Order" component={AdOrder} />
              <ARoute path="/admin/product/add" component={AddProducts} />
              <ARoute path="/admin/product/list/:category?/:subCategory?" component={ListProduct} />              
              <ARoute path="/admin/product/edit/:slug?" component={EditProduct} />
              <ARoute path="/admin/deliver" component={Deliver} />
              <ARoute path="/admin/category/list" component={ListCategory} />      
              <ARoute path="/admin/category/add/" component={AddCategory} />    
              <ARoute path="/admin/category/addsub/:cslug/:id" component={AddSubCategory} />    

              <ARoute path="/admin/user/list" component={Users} />      
              <ARoute
                path="/admin/removeproduct/:slug/:id"
                component={RemoveProduct}
              />
              
              <ARoute path="/admin/wip" component={Wip} />
              <ARoute path="/admin/test" component={Test} />
              <ARoute component={Dash} />
            </Switch>
          </Admin>
        </Route>
        <Route path="/logout" component={Logout} />
        
        <PRoute exact path="/receipt/:active?/:id?" component={Receipt} />
        <Home>
          <Switch>
            <PRoute exact path="/my/:active?/:id?" component={UserMenu} />
            <Route exact path="/login" component={LoginLanded} />
            <Route exact path="/" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <PRoute exact path="/checkout" component={Checkout} />
            <Route path="/c/:category?/:subCategory?" component={AllCategory} />     
            <Route path="/dologin" component={Login} />
            <Route path="/p/:slug" component={Product} />
            <Route exact path="/editor" component={Editor} />
            <Route path="/search" component={Search} />
            <Route component={P404} />
          </Switch>
        </Home>
      </Switch>
      <Footer />
    </Inventory>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
