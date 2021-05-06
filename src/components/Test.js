// https://www.npmjs.com/package/react-responsive-carousel
import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Dropdown 
} from "semantic-ui-react";
var Carousel = require('react-responsive-carousel').Carousel;
var friendOptions = [
 {
     text: 'Jenny Hesssssssssssssssssssssssss',
     value: 'Jenny Hess',
     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
   }
]
export default class Carous extends Component {
    state = { activeItem: 'account' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state

        return (

                <Menu  vertical attached='top' >
                  <Menu.Item
                    name='All Cetegories'
                    as='h5'
                  />
                  <Dropdown item text='Notebook,2in1,Notebook Gaming'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Notebook,2in1,Notebook Gaming</Dropdown.Header>
                      <Dropdown.Item>Notebook</Dropdown.Item>
                      <Dropdown.Item>Notebook Gaming</Dropdown.Item>
                      <Dropdown.Item>Ram For Notebook</Dropdown.Item>
                      <Dropdown.Item>Notebook Accessories</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Hardware (DIY)'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Hardware</Dropdown.Header>
                      <Dropdown.Item>CPU</Dropdown.Item>
                      <Dropdown.Item>Mainboard</Dropdown.Item>
                      <Dropdown.Item>RAM For PC</Dropdown.Item>
                      <Dropdown.Item>Graphic Card</Dropdown.Item>
                      <Dropdown.Item>Case & Power Supply</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown item text='Monitor'>
                    <Dropdown.Menu>
                      <Dropdown.Header>Monitor</Dropdown.Header>
                      <Dropdown.Item>Acer</Dropdown.Item>
                      <Dropdown.Item>Alienware</Dropdown.Item>
                      <Dropdown.Item>AOC</Dropdown.Item>
                      <Dropdown.Item>Asus</Dropdown.Item>
                      <Dropdown.Item>Benq</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu>

        );
    }
}

// Don't forget to include the css in your page 
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls