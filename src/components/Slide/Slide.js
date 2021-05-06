// https://www.npmjs.com/package/react-responsive-carousel
import React, { Component } from "react";
var Carousel = require("react-responsive-carousel").Carousel;

export default class Carous extends Component {
  render() {
    return (
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        emulateTouch={true}
      >
        <div>
          <img alt="slider" src="assets/1.jpeg" />
        </div>
        <div>
          <img alt="slider" src="assets/2.jpeg" />
        </div>
        <div>
          <img alt="slider" src="assets/3.jpeg" />
        </div>
      </Carousel>
    );
  }
}

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
