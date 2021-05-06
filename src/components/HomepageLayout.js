import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Popup,
  Label,
  Dropdown,
  Modal
} from "semantic-ui-react";
import Loader from "./Loader";
import { CartContext } from "./CartContext";
import Category from "./Category/Categories";
import Search from "./Search/Search";
const CartSummary = React.lazy(() => import("./Cart/CartSummary"));
const Login = React.lazy(() => import("./Login/Login"));

/* eslint-disable react/no-multi-comp */
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  /*toggle = () => this.setState({ open: !this.state.open,redirect: true })
  handleOpen = () => {
    this.setState({ isOpen: true })
  }
  handleClose = () => {
    this.setState({ isOpen: false })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      this.setState({redirect: false })
      return <Redirect to='/cart' />
    }
  }*/
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <CartContext.Consumer>
        {cart => (
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Visibility
              once={false}
              onBottomPassed={this.showFixedMenu}
              onBottomPassedReverse={this.hideFixedMenu}
            >
              <Segment
                inverted
                textAlign="center"
                style={{ minHeight: 30, padding: "1em 0em" }}
                vertical
              >
                <Menu
                  fixed={fixed ? "top" : null}
                  inverted={!fixed}
                  secondary={!fixed}
                  size="large"
                >
                  <Container>
                    <Menu.Item as={Link} to="/#">
                      <h2>TechE</h2>
                    </Menu.Item>

                    <Menu.Item position="right">
                      <Search />
                    </Menu.Item>

                    <Popup
                      wide="very"
                      hideOnScroll
                      trigger={
                        <Menu.Item as="div">
                          <Button as={Link} to="/cart" labelPosition="right">
                            <Button inverted={!fixed} primary={fixed}>
                              <Icon name="shopping cart" />
                              Cart
                            </Button>
                            <Label basic pointing="left">
                              {cart.itemSum || "0"}
                            </Label>
                          </Button>
                        </Menu.Item>
                      }
                      content={
                        <React.Suspense fallback={<Loader />}>
                          <CartSummary />
                        </React.Suspense>
                      }
                      on="hover"
                      position="bottom right"
                    />

                    <Menu.Item>
                      <>
                        {cart.user && (
                          <Dropdown
                            direction="left"
                            trigger={<span>{cart.user.email + " "}</span>}
                            icon="user"
                            labeled
                            floating
                          >
                            <Dropdown.Menu>
                              <Dropdown.Item as={Link} to="/cart">
                                <Icon name="shopping cart" /> Cart
                              </Dropdown.Item>
                              <Dropdown.Item as={Link} to="/checkout">
                                <Icon name="check square outline" /> Check out
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as={Link} to={"/my"}>
                                <Icon name="settings" /> Setting
                              </Dropdown.Item>
                              <Dropdown.Item as={Link} to="/logout">
                                <Icon name="power off" /> Logout
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                        {!cart.user && (
                          <Modal
                            trigger={
                              <Button
                                animated="fade"
                                as="a"
                                inverted={!fixed}
                                primary={fixed}
                                style={{ marginLeft: "0.5em" }}
                              >
                                <Button.Content visible>Login</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="sign-in" />
                                </Button.Content>
                              </Button>
                            }
                            size="mini"
                          >
                            <React.Suspense fallback={<Loader />}>
                              <Login />
                            </React.Suspense>
                          </Modal>
                        )}
                      </>
                    </Menu.Item>
                  </Container>
                </Menu>
              </Segment>
            </Visibility>

            {children}
          </Responsive>
        )}
      </CartContext.Consumer>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  render() {
    const { children } = this.props;

    return (
      <CartContext.Consumer>
        {cart => (
          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 10, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Dropdown item icon="sidebar">
                    <Dropdown.Menu>
                      <Dropdown.Header>All Categories</Dropdown.Header>
                      <Category />
                      <Dropdown.Divider />
                      <Dropdown.Header>User</Dropdown.Header>
                      <Dropdown.Item>Login</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item as={Link} to="/">
                    <Header as="h3" inverted>
                      TechE
                    </Header>
                  </Menu.Item>
                  <Menu.Item position="right">
                  <>
                        {cart.user && (
                          <Dropdown
                            direction="left"
                            trigger={<span>{cart.user.email + " "}</span>}
                            icon="user"
                            labeled
                            floating
                          >
                            <Dropdown.Menu>
                              <Dropdown.Item as={Link} to="/cart">
                                <Icon name="shopping cart" /> Cart
                              </Dropdown.Item>
                              <Dropdown.Item as={Link} to="/checkout">
                                <Icon name="check square outline" /> Check out
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as={Link} to={"/my"}>
                                <Icon name="settings" /> Setting
                              </Dropdown.Item>
                              <Dropdown.Item as={Link} to="/logout">
                                <Icon name="power off" /> Logout
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                        {!cart.user && (
                          <Modal
                            trigger={
                              <Button
                                animated="fade"
                                as="a"
                                inverted
                                style={{ marginLeft: "0.5em" }}
                              >
                                <Button.Content visible>Login</Button.Content>
                                <Button.Content hidden>
                                  <Icon name="sign-in" />
                                </Button.Content>
                              </Button>
                            }
                            size="mini"
                          >
                            <React.Suspense fallback={<Loader />}>
                              <Login />
                            </React.Suspense>
                          </Modal>
                        )}
                      </>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {children}
          </Responsive>
        )}
      </CartContext.Consumer>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = ({ children }) => (
  <ResponsiveContainer>{children}</ResponsiveContainer>
);
HomepageLayout.propTypes = {
  children: PropTypes.node
};
export default HomepageLayout;
