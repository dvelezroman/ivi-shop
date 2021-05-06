import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext";

import { Card, Image, Button, Icon } from "semantic-ui-react";
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0
});
const Product = props => {
  return (
    <CartContext.Consumer>
      {cart => (
        <Card key={props.product.slug} raised link className="shadow">
          {props.product.image.length ? (
            <Image
              className="productImg"
              wrapped
              as={Link}
              to={"/p/" + props.product.slug}
              src={
                "http://sushingg-api.herokuapp.com/images/" +
                props.product.image[0].name
              }
            />
          ) : (
            <Image
              className="productImg"
              wrapped
              as={Link}
              to={"/p/" + props.product.slug}
              src="/image/test.jpg"
            />
          )}
          <Card.Content>
            <Card.Header>
              <Link className="text-secondary" to={"/p/" + props.product.slug}>
                {props.product.title}
              </Link>
            </Card.Header>
            <Card.Meta>
              <span className="date">{formatter.format(props.product.price)} ฿</span>
            </Card.Meta>
            <Card.Description>{props.product.description}</Card.Description>
            <br />
          </Card.Content>
          <Button
            animated="vertical"
            color="blue"
            onClick={() => cart.onAddToCart(props.product, 1)}            
            disabled = {props.product.quantity === 0 && true }
          >
            <Button.Content visible>
              {props.product.quantity === 0 ? "สินค้าหมด" : "Add to Cart"}
            </Button.Content>
            <Button.Content hidden>
              <Icon name="cart arrow down" />
            </Button.Content>
          </Button>
        </Card>
      )}
    </CartContext.Consumer>
  );
};

export default Product;
