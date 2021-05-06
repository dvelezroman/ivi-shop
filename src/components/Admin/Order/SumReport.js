import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "lodash";
import ReactToPrint from "react-to-print";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";

import {
  Table,
  Message,
  Menu,
  Icon,
  Button,
  Image,
  Header
} from "semantic-ui-react";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2
});
function uniqByKeepLast(a, key) {
  return [...new Map(a.map(x => [key(x), x])).values()];
}
const SumOrderQuery = gql`
  query sumOrderQuery($dateForm: String, $dateTo: String) {
    sumOrder(dateForm: $dateForm, dateTo: $dateTo) {
      id
      slug
      title
      price
      quantity
      createdAt
      updatedAt
    }
  }
`;
class SumReportPre extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
      checked: false,
      dateForm: undefined,
      dateTo: undefined
    };
  }

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
    const { from, to, dateForm, dateTo } = this.state;
    const modifiers = { start: from, end: to };

    console.log(this.state.dateForm + "|||" + this.state.dateTo);
    console.log(moment(from).unix() * 1000 + ":" + moment(to).unix() * 1000);
    return (
      <>
        <Menu tabular>
          <Menu.Item>กรองโดยวันที่/เดือน</Menu.Item>

          <Menu.Item>
            <div className="InputFromTo">
              <DayPickerInput
                value={from}
                placeholder="เลือกวันที่"
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
              —{" "}
              <span className="InputFromTo-to">
                <DayPickerInput
                  ref={el => (this.to = el)}
                  value={to}
                  placeholder="ถึงวันที่"
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
            <Button onClick={this.toggle}>ค้นหา</Button>
          </Menu.Item>

          <Menu.Item>
            <Button onClick={this.toggleReset}>รีเซ็ท</Button>
          </Menu.Item>
        </Menu>
        <Query
          fetchPolicy="network-only"
          query={SumOrderQuery}
          variables={{ dateForm, dateTo }}
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
                <Message warning>
                  <Message.Header>มีบางอย่างผิดปกติ!</Message.Header>
                  <p>{error.message}</p>
                </Message>
              );
            return (
              <>
                <ReactToPrint
                  trigger={() => <Button fluid>พิมพ์รายงาน</Button>}
                  content={() => this.componentRef}
                />
                <SumReport
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

class SumReport extends React.Component {
  render() {
    const data = this.props.data;
    const paState = this.props.paState;
    var total = 0;
    uniqByKeepLast(data.sumOrder, it => it.slug).map((currentOrder, i) => {
      total +=
        _.sumBy(
          _.filter(data.sumOrder, { slug: currentOrder.slug }),
          "quantity"
        ) * currentOrder.price;
    });
    return (
      <Table basic stackable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="16">
              {paState.dateForm && paState.dateTo ? (
                <span>
                  {"จากวันที่: "}
                  {String(moment(paState.from).format("llll"))}
                  {" ถึง "}
                  {String(moment(paState.to).format("llll"))}
                </span>
              ) : (
                <span>{"จากวันที่: ทั้งหมด"}</span>
              )}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Image src="/logo.png" size="small" />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="8">
              <h3>Teche.Co., Ltd.</h3>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="4" textAlign="center">
              <Header as="h3">
                รายงานสรุปยอกการขาย
                <Header.Subheader></Header.Subheader>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>ID#</Table.Cell>
            <Table.Cell colSpan="10">ชื่อสินค้า</Table.Cell>
            <Table.Cell colSpan="1">จำนวน</Table.Cell>
            <Table.Cell colSpan="2">ราคาต่อชิ้น</Table.Cell>
            <Table.Cell colSpan="2">รวม</Table.Cell>
          </Table.Row>
          {uniqByKeepLast(data.sumOrder, it => it.slug).map(
            (currentOrder, i) => (
              <Table.Row key={i}>
                <Table.Cell>{currentOrder.id}</Table.Cell>
                <Table.Cell colSpan="10">{currentOrder.title}</Table.Cell>
                <Table.Cell colSpan="1">
                  {_.sumBy(
                    _.filter(data.sumOrder, { slug: currentOrder.slug }),
                    "quantity"
                  )}
                </Table.Cell>
                <Table.Cell colSpan="2">{formatter.format(currentOrder.price)}</Table.Cell>
                <Table.Cell colSpan="2">
                  {formatter.format(
                    _.sumBy(
                      _.filter(data.sumOrder, { slug: currentOrder.slug }),
                      "quantity"
                    ) * currentOrder.price
                  )}
                </Table.Cell>
              </Table.Row>
            )
          )}
          <Table.Row>
            <Table.Cell colSpan="8">
              {"รวมทั้งสิ้น " + _.sumBy(data.sumOrder, "quantity") + " รายการ"}
            </Table.Cell>

            <Table.Cell textAlign="right" colSpan="8">
              {"ยอดรวม " + formatter.format(total) + " บาท"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row verticalAlign="middle">
            <Table.Cell textAlign="right" colSpan="16">
              <p>
                {"พิมพ์วันที่: "}
                {String(moment().format("llll"))}
              </p>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}
export default SumReportPre;
