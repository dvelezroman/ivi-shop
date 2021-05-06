import React from "react";
import { Table, Label, Modal } from "semantic-ui-react";
import UserDetail from "./UserDetail";
const ListProduct = props => {
  return (
    <Table.Row>
      <Table.Cell>
        <Label basic>{props.user.name}</Label>
      </Table.Cell>
      <Table.Cell>
        {props.user.email}
      </Table.Cell>
      <Table.Cell>
        {props.user.mobileNumber}
      </Table.Cell>
      <Table.Cell textAlign="right">
        <Label tag>{props.user.type}</Label>
        <Modal trigger={<Label basic>เพิ่มเติม</Label>} basic size="small">
          <UserDetail user={props.user} refetch={props.refetch} />
        </Modal>
      </Table.Cell>
    </Table.Row>
  );
};

export default ListProduct;
