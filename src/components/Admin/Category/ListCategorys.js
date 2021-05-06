import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListCategory from "./ListCategory";
import Loader from "../../Loader";

import ReactToPrint from "react-to-print";
import {
  Table,
  Header,
  Message,
  Segment,
  Label,
  Button,
  Menu
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class GetListCategory extends React.Component {
  render() {
    return (
      <>
        <Menu>
          <Menu.Item>
            <Header as="h3">
              Category List
              <Label basic as={Link} to={"/admin/category/add/"}>
                Add Category
              </Label>
            </Header>
          </Menu.Item>

          <Menu.Item position='right'>
            <ReactToPrint
              trigger={() => (
                <Button fluid basic>
                  พิมพ์รายงานสินค้า
                </Button>
              )}
              content={() => this.componentRef}
            />
          </Menu.Item>
        </Menu>

        <Query
          query={gql`
            {
              categories {
                id
                slug
                title
                subCategory {
                  id
                  slug
                  title
                }
              }
            }
          `}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return <Loader key="" />;
            if (error)
              return (
                <Segment basic textAlign="center">
                  <Message warning compact>
                    {error.message}
                  </Message>
                </Segment>
              );
            console.log(data.products);
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
        <Table celled columns={3}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Sub Category</Table.HeaderCell>
              <Table.HeaderCell>#</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {data.categories.map((currentCategory, i) => (
            <ListCategory
              key={i}
              category={currentCategory}
              refetch={this.props.refetch}
            />
          ))}
        </Table>
      </>
    );
  }
}

export default GetListCategory;
