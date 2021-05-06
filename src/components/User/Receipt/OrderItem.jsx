import React from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const OrderItem = order => {
  const items = order.order.orderProduct;
  console.log(items);
  return (
    <>
      {items.filter(onlyUnique).map((p, i) => (
        <Grid.Row style={{ height: "100%" }} key={"item_"+i+1} stretched>
          <Grid.Column width={2}>{i+1}</Grid.Column>
          <Grid.Column width={8}>{p.title}</Grid.Column>
          <Grid.Column width={2}>{p.quantity}</Grid.Column>
          <Grid.Column width={2}>{formatter.format(p.price)}</Grid.Column>
          <Grid.Column width={2}>{formatter.format(p.quantity*p.price)}</Grid.Column>
        </Grid.Row>
      ))}
    </>
  );
};
export default OrderItem;
