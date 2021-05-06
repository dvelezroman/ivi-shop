import React, { useState } from "react";
import { Icon, Image, Container } from "semantic-ui-react";
import {  Link } from "react-router-dom";
import { CartContext } from "../CartContext";
import { 
  Button,
  Grid,
  Header,
  Segment,
  Input,
  Breadcrumb,
  Divider
} from "semantic-ui-react";
var Carousel = require("react-responsive-carousel").Carousel;
var HtmlToReactParser = require("html-to-react").Parser;
var htmlToReactParser = new HtmlToReactParser();
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0
});
const Product = props => {
  const [quantity, setQuantity] = useState(1);
  const handlePlus =(max)=>{
    if (quantity < max) setQuantity(quantity+1)
  }
  const handleMinus =()=>{
    if (quantity > 1) setQuantity(quantity-1)
  }
  const handleChange =(n,max)=>{
    if ( n > 0) {
      if(n < max ) setQuantity(n)
      else setQuantity(max)
    }
  }
  return (
    <>
      <CartContext.Consumer>
        {cart => (
          <Segment secondary style={{ padding: "3em 0em" }} vertical>
            <Container>
              <Breadcrumb>
                <Breadcrumb.Section 
                  link
                  as={Link} 
                  to={"/c/"+props.product.category}>{props.product.category}</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section 
                  link
                  as={Link} 
                  to={"/c/"+props.product.category+"/"+props.product.subCategory}
                >{props.product.subCategory}</Breadcrumb.Section>
                <Breadcrumb.Divider />

                <Breadcrumb.Section active>
                  {props.product.title}
                </Breadcrumb.Section>
              </Breadcrumb>
              <Segment padded>
                <Grid container stackable>
                  <Grid.Row>
                    <Grid.Column floated="left" width={6}>
                      {!props.product.image.length && (
                        <Image
                          bordered
                          rounded
                          size="large"
                          src="/image/test.jpg"
                        />
                      )}
                      <Carousel
                        showArrows={true}
                        showThumbs={true}
                        infiniteLoop={true}
                        autoPlay={true}
                        emulateTouch={true}
                      >
                        {props.product.image.map((keyName, i) => (
                          <div key={i}>
                            <img
                              alt="slider"
                              src={
                                "http://sushingg-api.herokuapp.com/images/" +
                                props.product.image[i].name
                              }
                            />
                          </div>
                        ))}
                      </Carousel>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Header as="h2">{props.product.title}</Header>
                      {"คงเหลือ "+props.product.quantity+" ชิ้น"}
                      <div style={{ padding: "3em 0em" }} />
                      <Header as="h2">฿{formatter.format(props.product.price)}</Header>
                      <div>
                        <span>จำนวน: </span>
                        <Button basic attached="left" onClick={() => (handleMinus())}>
                          <Icon name="minus" />
                        </Button>
                        <Input
                          id="quantity_input"
                          value={quantity}
                          onChange={e => (handleChange(parseInt(e.target.value),props.product.quantity) )}
                        />
                        <Button basic attached="right" onClick={() => (handlePlus(props.product.quantity))}>
                          &nbsp;
                          <Icon name="plus" />
                        </Button>
                      </div>
                      <br />
                      <Segment basic textAlign="center">

                        <Button
                          animated="fade"
                          fluid
                          primary
                          size="huge"
                          onClick={() => cart.onAddToCart(props.product,quantity)}
                          disabled = {props.product.quantity === 0 && true }
                        >
                          
                          <Button.Content visible>{props.product.quantity === 0 ?("สินค้าหมด"):("Add to Cart")}</Button.Content>
                          <Button.Content hidden>
                            เพื่มไปยังรถเข็น
                          </Button.Content>
                        </Button>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <br />
              <Segment padded style={{ overflowX:"hidden"}}>
                <Header as="h2">รายละเอียดสินค้า</Header>
                <Divider />
                {htmlToReactParser.parse(props.product.descriptionHtml)}
              </Segment>
            </Container>
          </Segment>
        )}
      </CartContext.Consumer>
    </>
  );
};

export default Product;
