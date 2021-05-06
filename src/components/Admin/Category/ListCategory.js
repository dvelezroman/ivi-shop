import React from "react";
import { Link } from "react-router-dom";
import { Table, Icon, Label, Modal } from "semantic-ui-react";
import RemoveCategory from "./RemoveCategory";
const ListProduct = props => {
  return (
    <>
      <Table.Row>
        <Table.Cell>{props.category.title + "  "}</Table.Cell>
        <Table.Cell>
          <Label
            basic
            as={Link}
            to={
              "/admin/category/addsub/" +
              props.category.slug +
              "/" +
              props.category.id
            }
          >
            Add Subcategory
          </Label>
        </Table.Cell>
        <Table.Cell>
          <Modal
            trigger={
              <Label basic color="red">
                <Icon name="delete" />
                {" "}delete Category{" "+props.category.title}
              </Label>
            }
            basic
            size="small"
          >
            <RemoveCategory
              id={props.category.id}
              slug={props.category.slug}
              cate={true}
              refetch={props.refetch}
            />
          </Modal>
        </Table.Cell>
      </Table.Row>

      {props.category.subCategory.map((sub, i) => (
        <Table.Row>
          <Table.Cell />
          <Table.Cell>{sub.title + "  "}</Table.Cell>
          <Table.Cell>
            <Modal
              trigger={
                <Label basic color="red">
                  <Icon name="delete" />
                  {" "}delete SubCategory {" "+sub.title}
                </Label>
              }
              basic
              size="small"
            >
              <RemoveCategory
                id={sub.id}
                slug={sub.slug}
                cate={false}
                refetch={props.refetch}
              />
            </Modal>
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
};

export default ListProduct;
