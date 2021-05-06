import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListProduct from "./ListProduct";
import Categories from "./Categories";
import ReactToPrint from "react-to-print";
import SumReport from "./SumReport"
import {
  Table,
  Message,
  Button,
  Radio,
  Pagination,
  Header,
  Input,
  Icon,
  Menu,
  Dropdown,
  Modal
} from "semantic-ui-react";
class ListProducts extends React.Component {
  state = {
    page: 1,
    activePage: 1,
    incDraft: true,
    Valuelimit: 25,
    limit: 25,
    options: [
      {
        key: "date",
        text: "date",
        value: "date"
      },
      {
        key: "title",
        text: "title",
        value: "title"
      },
      {
        key: "price",
        text: "price",
        value: "price"
      },
      {
        key: "quantity",
        text: "quantity",
        value: "quantity"
      }
    ],
    sortT: true,
    sortType: "asc",
    sortBy: "date"
  };
  handleItemClick = (e, { name }) => this.setState({ params: name });
  setActivePage = e => this.setState({ activePage: e, page: e });
  handleLimitChange = (e, { value }) =>
    this.setState({ Valuelimit: parseInt(value) });
  handleLimitClick = () => this.setState({ limit: this.state.Valuelimit });
  toggleDraft = () =>
    this.setState(prevState => ({ incDraft: !prevState.incDraft }));
  toggleSort = label => {
    console.log(label);
    this.setState(prevState => ({ sortT: !prevState.sortT }));
  };
  handleSortChange = (e, { value }) => this.setState({ sortBy: value });
  render() {
    const category = this.props.match.params.category || "";
    const subCategory = this.props.match.params.subCategory || "";
    const { page, incDraft, limit, Valuelimit, sortBy, sortT } = this.state;
    let sortType = "asc";
    if (sortT === true) {
      sortType = "asc";
    } else {
      sortType = "desc";
    }
    return (
      <>
        <Categories />

        <Menu>
          <Menu.Item>
            <label style={{ marginRight: "1em" }}>{"Limit:"}</label>
            <Input
              focus
              icon={
                <Icon
                  name="arrow right"
                  inverted
                  circular
                  link
                  onClick={this.handleLimitClick}
                />
              }
              value={Valuelimit}
              onChange={this.handleLimitChange}
            />
          </Menu.Item>
          <Menu.Item>
            <Radio
              label="รวมดราฟ"
              toggle
              onClick={this.toggleDraft}
              checked={incDraft}
            />
          </Menu.Item>
          <Menu.Item position="right">
            <label style={{ marginRight: "1em" }}>{"Sort by:"}</label>
            <Dropdown
              selection
              onChange={this.handleSortChange}
              options={this.state.options}
              defaultValue={this.state.options[0].value}
            />
          </Menu.Item>

          <Menu.Item>
            <Radio
              label={sortType}
              toggle
              onClick={this.toggleSort}
              checked={sortT}
            />
          </Menu.Item>

          <Menu.Item>
          <Modal trigger={<Button fluid>พิมพ์รายงานสินค้าคงเหลือ</Button>}>
              <Modal.Header>รายงานสินค้าคงเหลือ</Modal.Header>
              <Modal.Content>
                <SumReport />
              </Modal.Content>
            </Modal>
          </Menu.Item>
        </Menu>

        <Query
          fetchPolicy="network-only"
          query={gql`
            query GetProduct(
              $category: String
              $subCategory: String
              $page: Int!
              $limit: Int!
              $incDraft: Boolean
              $sortBy: String
              $sortType: String
            ) {
              products(
                category: $category
                subCategory: $subCategory
                limit: $limit
                page: $page
                incDraft: $incDraft
                sortBy: $sortBy
                sortType: $sortType
              ) {
                product {
                  slug
                  title
                  price
                  description
                  descriptionHtml
                  category
                  subCategory
                  quantity
                  published
                  image {
                    altText
                    name
                  }
                }
                total
                limit
                page
                pages
              }
            }
          `}
          variables={{
            category,
            subCategory,
            limit,
            page,
            incDraft,
            sortBy,
            sortType
          }}
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
                pstate={this.state}
                refetch={refetch}
                setActivePage={this.setActivePage}
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
    const { activePage } = this.props.pstate;
    const data = this.props.data;
    return (
      <Table stackable padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">Product list</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="1">สินค้า</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">ราคา</Table.HeaderCell>
            <Table.HeaderCell colSpan="1">คงเหลือ</Table.HeaderCell>
            <Table.HeaderCell colSpan="1" textAlign="right">
              Published
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.products.product.map((currentProduct, i) => (
            <ListProduct
              key={i}
              product={currentProduct}
              refetch={this.props.refetch}
            />
          ))}
          <Table.Row>
            <Table.Cell colSpan="6" textAlign="center">
              <Pagination
                activePage={activePage}
                totalPages={data.products.pages}
                onPageChange={(e, { activePage }) =>
                  this.props.setActivePage(activePage)
                }
              />
              <Header as="h4" textAlign="center">
                {"Total:" +
                  data.products.total +
                  " | Page: " +
                  data.products.page +
                  " of " +
                  data.products.pages +
                  " | Limit " +
                  data.products.limit +
                  " items/pages"}
              </Header>
              <Button fluid basic onClick={() => this.props.refetch()}>
                reload
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
export default ListProducts;
