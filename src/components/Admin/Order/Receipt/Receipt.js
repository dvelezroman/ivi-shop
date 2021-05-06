import React, { Component } from "react";
import { Grid, Table } from "semantic-ui-react";
import moment from "moment";
import OrderItem from "./OrderItem";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
export default class MyMenu extends Component {
  state = {};

  render() {
    return (
      <Table.Row>
        <Table.Cell colSpan="8">
          <Table basic stackable>
            <Table.Row>
              <Table.Cell width={16}>
                <Grid columns={2} basic padded>
                  <Grid.Column width={10}>
                    <p>
                      ชื่อลูกค้า / Customers:{" "}
                      {this.props.order.address.firstName +
                        " " +
                        this.props.order.address.lastName}
                    </p>
                    <p>
                      ที่อยู่ / Address:
                      {"ที่อยู่ " +
                        this.props.order.address.addr +
                        " " +
                        this.props.order.address.distric +
                        " " +
                        this.props.order.address.province +
                        " " +
                        this.props.order.address.postcode}
                    </p>
                    <p>
                      {"สถานะ : "}
                      {(() => {
                        switch (this.props.order.status) {
                          case "successful":
                            return <span>รอการจัดส่ง</span>;
                          case "sended":
                            return <span>สำเร็จ</span>;
                          case "cancel":
                            return <span>ยกเลิก</span>;
                          default:
                            return <span>รอการชำระเงิน</span>;
                        }
                      })()}
                    </p>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <p>เลขที่ / No: {this.props.order.id}</p>
                    <p>
                      วันที่ / Date:
                      {moment
                        .unix(this.props.order.createdAt / 1000)
                        .format("lll")}
                    </p>
                  </Grid.Column>
                </Grid>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={16}>
                <Table celled padded>
                  <Table.Row>
                    <Table.Cell colSpan={1}>ลำดับที่ Item</Table.Cell>
                    <Table.Cell colSpan={11}>รายการ Description</Table.Cell>
                    <Table.Cell colSpan={1}>จำนวน Quantity</Table.Cell>
                    <Table.Cell colSpan={1}>ราคา/หน่วย Unit Price</Table.Cell>
                    <Table.Cell colSpan={2}>จำนวนเงิน Amount</Table.Cell>
                  </Table.Row>
                  <OrderItem order={this.props.order} />
                </Table>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell floated="right" colSpan={6}>
                <Table padded>
                  <Table.Row>
                    <Table.Cell>รวมเงิน TOTAL</Table.Cell>
                    <Table.Cell>
                      {formatter.format(this.props.order.total)} บาท
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ยอดเงินสุทธิ NET AMOUNT</Table.Cell>
                    <Table.Cell>
                      {formatter.format(this.props.order.total)} บาท
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </Table.Cell>
            </Table.Row>
          </Table>
        </Table.Cell>
      </Table.Row>
    );
  }
}
