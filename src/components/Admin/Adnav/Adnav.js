import React, { useState } from "react";
import {
  Button, 
  //Container,
  Header,
  Icon,
  Menu,
  //Responsive,
  Segment,
  //Sidebar,
  //Visibility,
  //Input,
  //Popup,
  //Label,
  //Grid
  //Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
//onClick={(e, { name }) => setActiveItem(name)}

const Adnav = props => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <>
      <div className="admin_menu"> 
        <Menu borderless compact inverted vertical fluid>
          <Menu.Item
          >
            <Header inverted as="h4">Menu</Header>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin"
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Header inverted as="h4">Dashboard</Header>
          </Menu.Item>
          <Menu.Item>
            Products
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/product/add"
                name="padd"
                active={activeItem === "padd"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                Add
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/admin/product/list"
                name="plist"
                active={activeItem === "plist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Orders
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/order"
                name="olist"
                active={activeItem === "olist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Cetegories
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/category/add"
                name="cadd"
                active={activeItem === "cadd"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                Add
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/admin/category/list"
                name="clist"
                active={activeItem === "clist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Users
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/user/list"
                name="ulist"
                active={activeItem === "ulist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>

            </Menu.Menu>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/deliver"
            name="deliver"
            active={activeItem === "deliver"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Icon name="truck" />
            การจัดส่ง
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/logout"
            name="logout"
            active={activeItem === "logout"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        </Menu>
      </div>
      <div className="admin_seg">
      <Menu>
          <Menu.Item as={Link} to="/admin">
            <Header as="h3">TechE Administrator Dashboard ✔</Header>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/">
              Back to shop
            </Menu.Item>
            <Menu.Item as={Link} to="/logout">
              <Button animated basic color='red'>
                <Button.Content visible>Logout</Button.Content>
                <Button.Content hidden>
                  <Icon name='sign out' />
                </Button.Content>
              </Button>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
        <Segment padded basic>
          <Segment clearing>

            {props.children}
          </Segment >
        </Segment>
        
      </div>
      
    </>
  );
};
export default Adnav;
