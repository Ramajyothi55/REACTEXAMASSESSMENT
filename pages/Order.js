import React, { Component } from "react";

class Order extends Component {

  state = {
    orderId: '',
    order: {
      id: "",
      customerName: "",
      orderDate: "",
      orderTime: "",
      amount: "",
      orderStatus: ""
    }
  }

  _getOrderDetails = () => {
    let OrdersList = JSON.parse(localStorage.getItem("OrdersList"));
    let orderId = this.props.match.params.orderId
    let finalOrder = OrdersList.filter(item => {
      if (item.id === orderId) {
        return true;
      }
    })
    const data = finalOrder[0];
    this.setState({ order: data, orderId: orderId })
  };

  componentDidMount() {
    this._getOrderDetails()
  }

  render() {
    const order = this.state.order;
    return (
      <div>
        <h1 style={{ textAlign: "left", marginLeft: "70px", marginButton: "0px" }}   >
          Order Details
        </h1>
        <div style={{ display: "grid", marginLeft: "100px" }}>
          <table
            className="OrderTable"
            style={{
              width: "40%",
              backgroundColor: "#666",
              color: "white",
              marginButton: "250px",
              boxShadow: "5px 5px 20px  #666"
            }}
          >
            <thead>
              <tr className="TableRow">
                <th>Detail</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody id="orders-table">
              <tr className="TableRow">
                <td className="SecondaryText">Order ID</td>
                <td className="PrimaryText">{order.id}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Customer Name</td>
                <td className="PrimaryText">{order.customerName}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Order Date & Time</td>
                <td className="PrimaryText">
                  <span>{order.orderDate}</span>
                  <br />
                  <span className="SecondaryText">{order.orderTime}</span>
                </td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Amount</td>
                <td className="PrimaryText">{order.amount}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Status</td>
                <td className="PrimaryText">{order.orderStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Order;