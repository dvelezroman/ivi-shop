import React, { Component } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import moment from "moment";
import OrderItem from "./OrderItem"
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
export default class MyMenu extends Component {
  state = {};

  render() {
    return (
      <Segment basic>
        <Grid columns={3}>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={3}>
              {" "}
              <Image src="/logo.png" size="small" />
            </Grid.Column>
            <Grid.Column width={9}>
              <h3>Teche.Co., Ltd.</h3>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <h3>ใบเสร็จรับเงิน</h3>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <p>
                15/46 หมู่ที่ 7 ตำบลลำโพ อำเภอบางบัวทอง จังหวัดนนทบุรี 11110
              </p>
              <p>โทร 02-592-6015</p>
              <p>เลขประจำตัวผู้เสียภาษีอากร 0 0000 00000 00 0</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Grid columns={2} celled padded>
                <Grid.Column width={10}>
                  <p>
                    ชื่อลูกค้า / Customers: {this.props.order.address.firstName+" " +this.props.order.address.lastName}
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
                  <p>เลขประจำตัวผู้เสียภาษี : 0000000000</p>
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
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Grid columns={5} celled padded>
                <Grid.Row>
        
                  <Grid.Column width={2}>ลำดับที่ Item</Grid.Column>
                  <Grid.Column width={8}>รายการ Description</Grid.Column>
                  <Grid.Column width={2}>จำนวน Quantity</Grid.Column>
                  <Grid.Column width={2}>ราคา/หน่วย Unit Price</Grid.Column>
                  <Grid.Column width={2}>จำนวนเงิน Amount</Grid.Column>
                </Grid.Row>
                <OrderItem order={this.props.order} />
                
              </Grid>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="right" width={6}>
              <Grid columns={2} celled padded>
                <Grid.Row>
                  <Grid.Column>รวมเงิน TOTAL</Grid.Column>
                  <Grid.Column>{formatter.format(this.props.order.total)} บาท</Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>ยอดเงินสุทธิ NET AMOUNT</Grid.Column>
                  <Grid.Column>{formatter.format(this.props.order.total)} บาท</Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
