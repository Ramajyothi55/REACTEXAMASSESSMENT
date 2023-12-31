import React, { Component } from "react";

class Product extends Component {

  state = {
    productId: '',
    product: {
      id: "",
      medicineName: "",
      medicineBrand: "",
      stock: "",
      unitPrice: "",
      expiryDate: "",
      prescriptionRequired: ""
    }
  }

  _getProductDetails = () => {
    let productsList = JSON.parse(localStorage.getItem("ProductsList"));
    let productId = this.props.match.params.productId;
    let finalProduct = productsList.filter(item => {
      if (item.id === productId) {
        return item;
      }
    })
    const data = finalProduct[0];
    this.setState({
      product: data,
      productId: productId
    })
  };

  componentDidMount() {
    this._getProductDetails()
  }

  render() {
    const product = this.state.product;
    return (
      <div style={{ marginButton: "200px" }}>
        <h1
          style={{ textAlign: "left", marginLeft: "70px", marginButton: "0px" }}
        >
          Product Details
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
                <td className="SecondaryText">Product ID</td>
                <td className="PrimaryText">{product.id}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Medicine Name</td>
                <td className="PrimaryText">{product.medicineName}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Medicine Brand</td>
                <td className="PrimaryText">{product.medicineBrand}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Stock</td>
                <td className="PrimaryText">{product.stock}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Unit Price</td>
                <td className="PrimaryText">{product.unitPrice}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Expiry Date</td>
                <td className="PrimaryText">{product.expiryDate}</td>
              </tr>

              <tr className="TableRow">
                <td className="SecondaryText">Prescription Required</td>
                <td className="PrimaryText">
                  {product.prescriptionRequired === true ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Product;