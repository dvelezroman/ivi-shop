import React from "react";
import { Header, Table, Segment } from "semantic-ui-react";
const UserDetail = props => {
  return (
    <Segment>

      <Table basic="very" celled >
        <Table.Body>
          <Table.Row>
            <Table.Cell>ชื่อผู้ใช้งาน:</Table.Cell>
            <Table.Cell>{props.user.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ที่อยู่อีเมล์:</Table.Cell>
            <Table.Cell>{props.user.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>เบอร์โทรศัพท์:</Table.Cell>
            <Table.Cell>{props.user.mobileNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ประเภท:</Table.Cell>
            <Table.Cell>{props.user.type}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ที่อยู่จัดส่ง:</Table.Cell>
            <Table.Cell>{props.user.address.map((addr, i) => (
                <Header as='h4'>
                <Header.Content>
                  {addr.firstName+" "+addr.lastName}
                  <Header.Subheader>
                  {addr.addr}
                  </Header.Subheader>
                  <Header.Subheader>
                  {"อำเภอ"+addr.distric}
                  </Header.Subheader>
                  <Header.Subheader>
                  {"จังหวัด"+addr.province+" "+addr.postcode}
                  </Header.Subheader>
                  <Header.Subheader>
                  {addr.mobileNumber}
                  </Header.Subheader>
                </Header.Content>
              </Header>
              ))}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default UserDetail;
