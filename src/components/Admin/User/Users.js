import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";
import { Table, Message, Button, Icon, Menu } from "semantic-ui-react";
import ReactToPrint from "react-to-print";

class Users extends React.Component {
  render() {
    return (
      <>
        <Menu>
          <Menu.Item position="right">
            <ReactToPrint
              trigger={() => (
                <Button fluid basic>
                  พิมพ์รายงานสมาชิก
                </Button>
              )}
              content={() => this.componentRef}
            />
          </Menu.Item>
        </Menu>
        <Query
          query={gql`
            {
              users {
                id
                name
                email
                mobileNumber
                type
                address {
                  id
                  firstName
                  lastName
                  addr
                  distric
                  province
                  mobileNumber
                  postcode
                }
              }
            }
          `}
        >
          {({ loading, error, data, refetch }) => {
            if (loading)
              return (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>รอสักครู่</Message.Header>
                    กำลังดึงข้อมูลจากเซิฟเวอร์
                  </Message.Content>
                </Message>
              );
            if (error)
              return (
                <Message warning compact>
                  {error.message}
                </Message>
              );
            return (
              <ComponentToPrint
                data={data}
                refetch={refetch}
                ref={el => (this.componentRef = el)}
              />
            );
          }}
        </Query>
      </>
    );
  }
}

class ComponentToPrint extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <>
        <Table stackable padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">User list</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="1">ชื่อผู้ใช้งาน</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">อีเมล์</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">เบอร์โทรศัพท์</Table.HeaderCell>
              <Table.HeaderCell colSpan="1" textAlign="right">
                ประเภท
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.users.map((currentUser, i) => (
              <User key={i} user={currentUser} refetch={this.props.refetch} />
            ))}
            <Table.Row>
              <Table.Cell colSpan="6" textAlign="center">
                <Button basic fluid onClick={() => this.props.refetch()}>
                  reload
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </>
    );
  }
}
export default Users;
