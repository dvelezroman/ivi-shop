import React from "react";
import { Table, Icon, Label, Modal, Segment } from "semantic-ui-react";
import moment from "moment";
import OrderDetail from "../../User/Menu/Order/Order";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "thb",
  minimumFractionDigits: 0
});
const Order = props => {
  moment.locale("th");
  return (
    <Table.Row>
      <Table.Cell>
        <Modal
          trigger={
            <Label basic>
              <Icon name="file outline" />
              {props.order.id}
            </Label>
          }
        >
          {" "}
          <Segment>
            <OrderDetail refetch={props.refetch} order={props.order} />
          </Segment>
        </Modal>
      </Table.Cell>
      <Table.Cell>
        <Label basic>
          {moment.unix(props.order.createdAt / 1000).format("llll")}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label basic>
          {moment.unix(props.order.updatedAt / 1000).format("llll")}
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label basic>
          User
          <Label.Detail>{props.user.name}</Label.Detail>
        </Label>
      </Table.Cell>
      <Table.Cell>
        <Label tag>{formatter.format(props.order.total)}</Label>
      </Table.Cell>
      <Table.Cell>
        {(() => {
          switch (props.order.status) {
            case "successful":
              return <Label color="yellow">รอการจัดส่ง</Label>;
            case "sended":
              return <Label color="green">สำเร็จ</Label>;
            case "cancel":
              return <Label color="red">ยกเลิก</Label>;
            default:
              return <Label>รอการชำระเงิน</Label>;
          }
        })()}
      </Table.Cell>
    </Table.Row>
  );
};

export default Order;
