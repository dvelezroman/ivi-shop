import React from "react";
import _ from "lodash";
import {
  Button,
  Form,
  Segment,
  Dropdown,
  Table,
  Label,
  Icon,
  Modal
} from "semantic-ui-react";
import SetDeliver from "./SetDeliver";
class Deliver extends React.Component {
  state = {
    deliver: this.props.deliver,
    value: "",
    selected: [],
    modalOpen: false
  };
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })
  handleChange = (e, { value, text }) => {
    this.setState({ value });
  };
  handleRefetch = () =>{
    this.setState({ selected: [] });
    this.handleClose()
    this.props.refetch()
  }
  handleItemClick = () => {
    if (this.state.value !== "") {
      let a = this.state.deliver;
      let b = _.find(a, { key: this.state.value });
      _.remove(a, {
        key: this.state.value
      });
      console.log(b);
      this.setState({
        selected: [...this.state.selected, b],
        deliver: a,
        value: ""
      });
    }
  };
  handleRemoveItemClick =(e, { name }) => {
    let value = name
    if (value !== "") {
      let a = this.state.selected;
      let b = _.find(a, { key: value });
      _.remove(a, {
        key: value
      });
      this.setState({
        selected: a,
        deliver: [...this.state.deliver, b],
        value: ""
      });
    }
  };
  render() {
    console.log(this.state);
    const { deliver, value, selected, modalOpen } = this.state;
    return (
      <>
                <Segment>
                  <Form>
                    <Form.Field>
                      <label>Order Id</label>
                      <Dropdown
                        placeholder="ระบุหมายเลขรายการที่จัดส่งแล้ว"
                        fluid
                        search
                        selection
                        onChange={this.handleChange}
                        value={value}
                        options={deliver}
                      />
                    </Form.Field>
                    <Button fluid onClick={this.handleItemClick}>
                      เพิ่ม
                    </Button>
                  </Form>
                </Segment>
                <Segment>
                  <Table stackable padded>
                    <Table.Body>
                      {selected &&
                        selected.map((thisOrder, y) => (
                          <Table.Row key={y}>
                            <Table.Cell>
                              <Label basic>
                                <Icon name="file outline" />
                                {thisOrder.value}
                              </Label>
                            </Table.Cell>
                            <Table.Cell>
                              <Label basic>{thisOrder.description}</Label>
                            </Table.Cell>
                            <Table.Cell>
                              <Label basic color="red" name={thisOrder.value} onClick={this.handleRemoveItemClick}>
                                <Icon name="remove" />
                                ลบ
                              </Label>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                  <Modal 
                    trigger={<Button fluid onClick={this.handleOpen}>Submit</Button>}
                    open={modalOpen}
                    onClose={this.handleClose}
                  >
                    <SetDeliver
                      data={selected.map(thisOrder => (
                        thisOrder.value
                      ))}
                      refetch={this.handleRefetch}
                    />
                  </Modal>
                </Segment>
              
      </>
    );
  }
}

export default Deliver;
