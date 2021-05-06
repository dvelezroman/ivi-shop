import React from "react";
import { Table } from "semantic-ui-react";
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
        <Table.Row style={{ height: "100%" }} key={"item_"+i+1} stretched>
          <Table.Cell colSpan={1}>{i+1}</Table.Cell>
          <Table.Cell colSpan={11}>{p.title}</Table.Cell>
          <Table.Cell colSpan={1}>{p.quantity}</Table.Cell>
          <Table.Cell colSpan={1}>{formatter.format(p.price)}</Table.Cell>
          <Table.Cell colSpan={2}>{formatter.format(p.quantity*p.price)}</Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};
export default OrderItem;
