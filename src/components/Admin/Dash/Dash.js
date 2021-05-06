import React from "react";
//import { Link } from "react-router-dom";
import {
  Header,
  Icon,
  Card,
  Statistic
} from "semantic-ui-react";
import Order from '../Order/Orders'

const Dash = props => {
  return (
    <>
      <Card.Group centered itemsPerRow="4" style={{display:"none"}}>
        <Card color="violet" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="violet">
                <Icon name="balance scale" />
                Monthly sale!
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ยอดขายเดือนนี้</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="violet">
              <Statistic.Value>9974</Statistic.Value>
              <Statistic.Label>ชิ้น</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="teal" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="teal">
                <Icon name="money" />
                Profit!
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">รายได้เดือนนี้</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="teal">
              <Statistic.Value>945151</Statistic.Value>
              <Statistic.Label>บาท</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="blue" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="blue">
                <Icon name="truck" />
                Shipped
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ส่งแล้ว</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="blue">
              <Statistic.Value>9974</Statistic.Value>
              <Statistic.Label>ชิ้น</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
        <Card color="yellow" link>
          <Card.Content>
            <Card.Header>
              <Header as="h1" color="yellow">
                <Icon name="truck" />
                Visited
              </Header>
            </Card.Header>
            <Card.Meta textAlign="right">ผู้เยี่ยมชม</Card.Meta>
            <Card.Description />
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Statistic color="yellow">
              <Statistic.Value>19295</Statistic.Value>
              <Statistic.Label>คน</Statistic.Label>
            </Statistic>
          </Card.Content>
        </Card>
      </Card.Group>

      <Order/>
    </>
  );
};

export default Dash;
