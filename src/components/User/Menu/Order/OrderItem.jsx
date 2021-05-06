import React from "react";
import {
  Segment,
  Header,
  Icon,
  Table
} from "semantic-ui-react";
import { Link } from "react-router-dom";    
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0
});
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const OrderItem = (order) => {
    const items = order.order.orderProduct;
    return (
      <>
        <div>
          {items.length ? (
            <Segment basic>
              <Table
                basic="very"
                celled
                striped
                unstackable
                style={{ minWidth: 500 }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width="ten">รายการ</Table.HeaderCell>
                    <Table.HeaderCell>ราคา</Table.HeaderCell>
                    <Table.HeaderCell>จำนวน</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.filter(onlyUnique).map((p, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Header as="h4">
                          <Header.Content as={Link} to={"/p/"+p.slug}>{p.title} </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h4">
                          <Header.Content>{formatter.format(p.price)} ฿</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h4">
                          <Header.Content>
                            {p.quantity + " " || "none"}ชิ้น
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

            </Segment>
          ) : (
            <Segment placeholder>
              <Header icon>
                <Icon name="cart" />
                ไม่มีสินค้าในรถเข็นของคุณ
                <Header.Content>
                  <Link to="/">เลือกซื้อสินค้า</Link>
                </Header.Content>
              </Header>
            </Segment>
          )}
        </div>
      </>
    );
  };
  export default OrderItem