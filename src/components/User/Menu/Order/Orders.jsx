import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label } from "semantic-ui-react";
import moment from "moment";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});

class Orders extends React.Component {
  state = {};
  componentDidMount() {}
  onConfirmClick = () => {
    this.props.setId(this.props.order.id);
  };
  render() {
    moment.locale("th");
    
    return (
      <Table.Row>
        <Table.Cell>
          <Label basic as={Link} to={"/my/orders/" + this.props.order.id} onClick={this.onConfirmClick}>
            <Icon name="file outline" />
            ดูรายละเอียด
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Label basic>
            {moment.unix(this.props.order.createdAt / 1000).format("llll")}
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Label tag>{formatter.format(this.props.order.total)}</Label>
        </Table.Cell>
        <Table.Cell>
          {(() => {
            switch (this.props.order.status) {
              case null:
                return <Label color="yellow">รอชำระเงิน</Label>;
              case "sended":
                return <Label color="blue">สำเร็จ</Label>;
              case "successful":
                return <Label color="green">ชำระเงินแล้ว</Label>;
              case "failed":
                return <Label color="red">ล้มเหลว</Label>;
              case "cancel":
                return <Label color="red">ยกเลิก</Label>;
              default:
                return <Label color="yellow">รอชำระเงิน</Label>;
            }
          })()}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Orders;
