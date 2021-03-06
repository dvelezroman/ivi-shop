import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from "./Order";

import ReactToPrint from "react-to-print";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Receipt from "./Receipt/Receipt";
import SumReport from "./SumReport";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";

import {
  Table,
  Message,
  Menu,
  Icon,
  Button,
  Modal,
  Image,
  Header
} from "semantic-ui-react";

const OrderQuery = gql`
  query usersOrder($status: String, $dateForm: String, $dateTo: String) {
    usersOrder(status: $status, dateForm: $dateForm, dateTo: $dateTo) {
      name
      id
      total
      status
      address {
        firstName
        lastName
        addr
        distric
        province
        mobileNumber
        postcode
      }
      orderProduct {
        slug
        title
        price
        option
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      status: "wait",
      from: undefined,
      to: undefined,
      checked: false,
      dateForm: undefined,
      dateTo: undefined
    };
  }

  handleItemClick = (e, { name }) => this.setState({ status: name });
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    if (this.state.checked) {
      this.setState({
        dateForm: String(
          moment(from)
            .subtract(1, "days")
            .unix() * 1000
        )
      });
    }
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    if (this.state.checked) {
      this.setState({
        dateTo: String(moment(to).unix() * 1000)
      });
    }
  }

  toggle = () => {
    const { from, to } = this.state;
    if (from && to) {
      if (moment(from).unix() === moment(to).unix()) {
        this.setState(prevState => ({
          checked: !prevState.checked,
          dateForm: String(
            moment(from)
              .subtract(1, "days")
              .unix() * 1000
          ),
          dateTo: String(
            moment(to)
              .add(1, "days")
              .unix() * 1000
          )
        }));
      } else {
        this.setState(prevState => ({
          checked: !prevState.checked,
          dateForm: String(moment(from).unix() * 1000),
          dateTo: String(moment(to).unix() * 1000)
        }));
      }
    }
  };
  toggleReset = () => {
    this.setState({
      from: undefined,
      to: undefined,
      dateForm: undefined,
      dateTo: undefined
    });
  };
  render() {
    const { status, from, to, dateForm, dateTo } = this.state;
    const modifiers = { start: from, end: to };

    console.log(this.state.dateForm + "|||" + this.state.dateTo);
    console.log(moment(from).unix() * 1000 + ":" + moment(to).unix() * 1000);
    return (
      <>
        <Menu tabular>
          <Menu.Item
            name="wait"
            active={status === "wait"}
            onClick={this.handleItemClick}
          >
            ?????????????????????????????????
          </Menu.Item>
          <Menu.Item
            name="successful"
            active={status === "successful"}
            onClick={this.handleItemClick}
          >
            ???????????????????????????????????????
          </Menu.Item>
          <Menu.Item
            name="sended"
            active={status === "sended"}
            onClick={this.handleItemClick}
          >
            ??????????????????
          </Menu.Item>
          <Menu.Item
            name="cancel"
            active={status === "cancel"}
            onClick={this.handleItemClick}
          >
            ??????????????????????????????
          </Menu.Item>
          <Menu.Item>
            <Modal trigger={<Button fluid>???????????????????????????????????????????????????</Button>}>
              <Modal.Header>????????????????????????????????????</Modal.Header>
              <Modal.Content>
                <PreComponentToPrint />
              </Modal.Content>
            </Modal>
          </Menu.Item>
          <Menu.Item>
            <Modal trigger={<Button fluid>???????????????????????????????????????????????????????????????</Button>}>
              <Modal.Header>????????????????????????????????????????????????</Modal.Header>
              <Modal.Content>
                <SumReport />
              </Modal.Content>
            </Modal>
          </Menu.Item>
        </Menu>
        <Menu tabular>
          <Menu.Item>???????????????????????????????????????/???????????????</Menu.Item>
          <Menu.Item>
            <div className="InputFromTo">
              <DayPickerInput
                value={from}
                placeholder="?????????????????????????????????"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 2,
                  onDayClick: () => this.to.getInput().focus()
                }}
                onDayChange={this.handleFromChange}
              />{" "}
              ???{" "}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="???????????????????????????"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 2
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.toggle}>???????????????</Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={this.toggleReset}>??????????????????</Button>
          </Menu.Item>
        </Menu>
        <Table stackable padded celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">??????????????????????????????????????????</Table.HeaderCell>
              <Table.HeaderCell colSpan="2"></Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="1">
                ??????????????????????????????????????????????????????
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="1">?????????????????????????????????</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">?????????????????????????????????</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">?????????????????????</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">?????????????????????</Table.HeaderCell>
              <Table.HeaderCell colSpan="1">???????????????</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Query
            fetchPolicy="network-only"
            query={OrderQuery}
            variables={{ status, dateForm, dateTo }}
          >
            {({ loading, error, data, refetch }) => {
              if (loading)
                return (
                  <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Content>
                      <Message.Header>???????????????????????????</Message.Header>
                      ??????????????????????????????????????????????????????????????????????????????
                    </Message.Content>
                  </Message>
                );
              if (error)
                return (
                  <Message warning>
                    <Message.Header>???????????????????????????????????????????????????!</Message.Header>
                    <p>{error.message}</p>
                  </Message>
                );
              return (
                <Table.Body>
                  {data.usersOrder.map((currentOrder, i) => (
                    <Order
                      key={i}
                      order={currentOrder}
                      refetch={refetch}
                      user={{
                        name: currentOrder.name
                      }}
                    />
                  ))}
                </Table.Body>
              );
            }}
          </Query>
        </Table>
      </>
    );
  }
}

class PreComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      status: "",
      from: undefined,
      to: undefined,
      checked: false,
      dateForm: undefined,
      dateTo: undefined
    };
  }

  handleItemClick = (e, { name }) => this.setState({ status: name });
  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    if (this.state.checked) {
      this.setState({
        dateForm: String(moment(from).unix() * 1000)
      });
    }
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    if (this.state.checked) {
      this.setState({
        dateTo: String(moment(to).unix() * 1000)
      });
    }
  }

  toggle = () => {
    const { from, to } = this.state;
    if (from && to) {
      if (moment(from).unix() === moment(to).unix()) {
        this.setState(prevState => ({
          checked: !prevState.checked,
          dateForm: String(
            moment(from)
              .subtract(1, "days")
              .unix() * 1000
          ),
          dateTo: String(
            moment(to)
              .add(1, "days")
              .unix() * 1000
          )
        }));

        console.log(
          moment(from)
            .unix()
            .format("llll") +
            "||" +
            moment(to)
              .unix()
              .format("llll")
        );
      } else {
        this.setState(prevState => ({
          checked: !prevState.checked,
          dateForm: String(
            moment(from)
              .subtract(1, "days")
              .unix() * 1000
          ),
          dateTo: String(moment(to).unix() * 1000)
        }));
      }
    }
  };

  toggleReset = () => {
    this.setState({
      from: undefined,
      to: undefined,
      dateForm: undefined,
      dateTo: undefined
    });
  };
  render() {
    const { status, from, to, dateForm, dateTo } = this.state;
    const modifiers = { start: from, end: to };

    console.log(this.state.dateForm + "|||" + this.state.dateTo);
    console.log(moment(from).unix() * 1000 + ":" + moment(to).unix() * 1000);
    return (
      <>
        <Menu tabular>
          <Menu.Item
            name=""
            active={status === ""}
            onClick={this.handleItemClick}
          >
            ?????????????????????
          </Menu.Item>
          <Menu.Item
            name="wait"
            active={status === "wait"}
            onClick={this.handleItemClick}
          >
            ?????????????????????????????????
          </Menu.Item>
          <Menu.Item
            name="successful"
            active={status === "successful"}
            onClick={this.handleItemClick}
          >
            ???????????????????????????????????????
          </Menu.Item>
          <Menu.Item
            name="sended"
            active={status === "sended"}
            onClick={this.handleItemClick}
          >
            ??????????????????
          </Menu.Item>
          <Menu.Item
            name="cancel"
            active={status === "cancel"}
            onClick={this.handleItemClick}
          >
            ??????????????????????????????
          </Menu.Item>
        </Menu>
        <Menu tabular>
          <Menu.Item>???????????????????????????????????????/???????????????</Menu.Item>

          <Menu.Item>
            <div className="InputFromTo">
              <DayPickerInput
                value={from}
                placeholder="?????????????????????????????????"
                format="LL"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 2,
                  onDayClick: () => this.to.getInput().focus()
                }}
                onDayChange={this.handleFromChange}
              />{" "}
              ???{" "}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="???????????????????????????"
                  format="LL"
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    fromMonth: from,
                    numberOfMonths: 2
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.toggle}>???????????????</Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={this.toggleReset}>??????????????????</Button>
          </Menu.Item>
        </Menu>
        <Query
          fetchPolicy="network-only"
          query={OrderQuery}
          variables={{ status, dateForm, dateTo }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading)
              return (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>???????????????????????????</Message.Header>
                    ??????????????????????????????????????????????????????????????????????????????
                  </Message.Content>
                </Message>
              );
            if (error)
              return (
                <Message warning>
                  <Message.Header>???????????????????????????????????????????????????!</Message.Header>
                  <p>{error.message}</p>
                </Message>
              );
            return (
              <>
                <ReactToPrint
                  trigger={() => <Button fluid>???????????????????????????????????????????????????</Button>}
                  content={() => this.componentRef}
                />
                <ComponentToPrint
                  paState={this.state}
                  data={data}
                  ref={el => (this.componentRef = el)}
                />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}

class ComponentToPrint extends React.Component {
  render() {
    const paState = this.props.paState;
    return (
      <Table basic stackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              <Image src="/logo.png" size="small" />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="4">
              <h3>Teche.Co., Ltd.</h3>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              <Header as="h3">
                ????????????????????????????????????
                <Header.Subheader>??????????????????????????? (???????????????????????????)</Header.Subheader>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <p>
                {paState.dateForm && paState.dateTo ? (
                  <span>
                    {"???????????????????????????: "}
                    {String(moment(paState.from).format("llll"))}
                    {" ????????? "}
                    {String(moment(paState.to).format("llll"))}
                  </span>
                ) : (
                  <span>{"???????????????????????????: ?????????????????????"}</span>
                )}
                {" ???????????????????????? "}
                {paState.status === "" ? (
                  <span>{"?????????????????????"}</span>
                ) : (
                  <span>
                    {(() => {
                      switch (paState.status) {
                        case "successful":
                          return <span>?????????????????????????????????</span>;
                        case "sended":
                          return <span>??????????????????</span>;
                        case "cancel":
                          return <span>??????????????????</span>;
                        default:
                          return <span>???????????????????????????????????????</span>;
                      }
                    })()}
                  </span>
                )}
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.data.usersOrder.map((currentOrder, i) => (
            <Receipt order={currentOrder} />
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row verticalAlign="middle">
            <Table.Cell textAlign="right" colSpan="8">
              <p>
                {"?????????????????????????????????: "}
                {String(moment().format("llll"))}
              </p>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default Orders;
