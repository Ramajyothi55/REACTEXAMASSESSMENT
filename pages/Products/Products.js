import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

class Products extends Component {

  state = {
    products: [
      {
        expiryDate: "14-Aug-2012",
        id: "56104-020",
        medicineBrand: "Premier Brands of America Inc.",
        medicineName: "Miconazole Nitrate",
        prescriptionRequired: false,
        stock: 725,
        unitPrice: 993.01,
      },
      {
        expiryDate: "24-Jul-2029",
        id: "0268-1239",
        medicineBrand: "ALK-Abello, Inc.",
        medicineName: "CHENOPODIUM ALBUM POLLEN",
        prescriptionRequired: false,
        stock: 917,
        unitPrice: 632.22,
      },
      {
        expiryDate: "31-Aug-2027",
        id: "50419-252",
        medicineBrand: "Bayer HealthCare Pharmaceuticals Inc.",
        medicineName: "Adempas",
        prescriptionRequired: false,
        stock: 5,
        unitPrice: 911.3,
      },
      {
        expiryDate: "10-Sep-2012",
        id: "53499-5273",
        medicineBrand: "Nature's Way Products, Inc.",
        medicineName: "Umcka ColdCare Alcohol Free Cherry",
        prescriptionRequired: true,
        stock: 772,
        unitPrice: 125.99,
      },
      {
        expiryDate: "02-Feb-2022",
        id: "65517-0029",
        medicineBrand: "Dukal Corporation",
        medicineName: "PVP Prep Pad",
        prescriptionRequired: true,
        stock: 925,
        unitPrice: 986.81,
      }
    ],
    displayProducts: [],
    activeFilters: {
      expired: true,
      low_stock: true
    },
    count: 0
  }

  _getProducts = () => {
    const data = this.state.products;
    localStorage.setItem("ProductsList", JSON.stringify(data));
    localStorage.setItem("DisplayProductsList", JSON.stringify(data));
    this.setState({
      products: data,
      displayProducts: data,
      count: data.length
    })
  };

  handleFilterCheck = (e) => {
    const filters = this.state.activeFilters;
    filters[e.target.name] = e.target.checked;
    this._updateDisplayOrders();
    this.setState({ activeFilters: filters });
  };

  _updateDisplayOrders = () => {
    let products = this.state.products;
    if (this.state.activeFilters["expired"] && this.state.activeFilters["low_stock"]) {
      this.setState({
        displayProducts: products,
        count: products.length
      });
      return;
    }
    const dispProds = [];
    for (const product of products) {
      let { expiryDate, stock } = product;
      if (this.state.activeFilters["low_stock"] === true && !this.state.activeFilters["expired"]) {
        const now = new Date();
        expiryDate = new Date(product.expiryDate);
        if (expiryDate > now) dispProds.push(product);
      }
      if (this.state.activeFilters["expired"] === true && !this.state.activeFilters["low_stock"]) {
        if (!isNaN(Number(stock)) && Number(stock) > 100)
          dispProds.push(product);
      }
      if (!this.state.activeFilters["expired"] && !this.state.activeFilters["low_stock"]) {
        const now = new Date();
        expiryDate = new Date(product.expiryDate);
        if (expiryDate > now && !isNaN(Number(stock)) && Number(stock) > 100)
          dispProds.push(product);
      }
    }
    this.setState({
      displayProducts: dispProds,
      count: dispProds.length
    });
  };

  componentDidMount() {
    this._getProducts();
  }

  render() {
    return (
      <main>
        <div className="PageWrapper">
          <h1 className="MainHeading">Products</h1>
          <div className="OrdersWrapper">
            <div className="FilterWrapper">
              <h3>Filters</h3>
              <div className="FilterOptions">
                <p>
                  Count:
                  <span id="count-elt">{this.state.count}</span>
                </p>
                <label className="FilterCheckbox">
                  <input
                    type="checkbox"
                    name="expired"
                    checked={this.state.activeFilters["expired"]}
                    onChange={this.handleFilterCheck}
                  />
                  Expired
                </label>
                <label className="FilterCheckbox">
                  <input
                    type="checkbox"
                    name="low_stock"
                    checked={this.state.activeFilters["low_stock"]}
                    onChange={this.handleFilterCheck}
                  />
                  Low Stock
                </label>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <table className="OrderTable">
                <thead>
                  <tr className="TableRow">
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Brand</th>
                    <th style={{ minWidth: "100px" }}>Expiry Date</th>
                    <th>Unit Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody id="products-table">
                  {this.state.displayProducts.map(
                    (
                      {
                        id,
                        medicineName,
                        medicineBrand,
                        stock,
                        unitPrice,
                        expiryDate
                      },
                      index
                    ) => (
                      <tr className="TableRow" key={id + "" + index}>
                        <td className="SecondaryText">
                          <Link
                            to={`/product/${id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {id}
                          </Link>
                        </td>
                        <td className="PrimaryText">{medicineName}</td>
                        <td className="SecondaryText">{medicineBrand}</td>
                        <td className="PrimaryText">{expiryDate}</td>
                        <td className="SecondaryText">{unitPrice}</td>
                        <td className="SecondaryText">{stock}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main >
    );
  }
}

export default Products;