import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { setAuth, isAuth } from "../Routes/utils/auth";
import "./Navbar.css";

class Navbar extends Component {

  state = {
    loggedIn: false
  }

  handleLogout = () => {
    setAuth(false);
    this.setState({ loggedIn: false },()=>{
     this.props.history.push("/");
    });
   };

  componentDidMount() {
    this.setState({ loggedIn: isAuth() })
  }

  render() {
    const isActive = {
      orders: false,
      products: false,
      users: false
    };
    const pageName = this.props.location.pathname.slice(1);
    isActive[pageName] = true;
    return (
      <div className="Topbar">
        <div className="LeftMenu">
          <div className="LogoWrapper">
            <Link to="/">
              <img
                src="https://raw.githubusercontent.com/pawankumargali/kafene/main/images/logo.png"
                alt="Logo"
              />
            </Link>
            <p className="BrandName">Kafene</p>
          </div>
          {!isAuth() && (
            <nav>
              <Link className={"MenuItem"} to="#">
                Orders
              </Link>
              <Link className={"MenuItem"} to="#">
                Products
              </Link>
              <Link className={"MenuItem"} to="#">
                Users
              </Link>
            </nav>
          )}

          {isAuth() && (
            <nav>
              <Link
                className={
                  isActive["orders"] ? "MenuItem MenuItemActive" : "MenuItem"
                }
                to="/orders"
              >
                Orders
              </Link>
              <Link
                className={
                  isActive["products"] ? "MenuItem MenuItemActive" : "MenuItem"
                }
                to="/products"
              >
                Products
              </Link>
              <Link
                className={
                  isActive["users"] ? "MenuItem MenuItemActive" : "MenuItem"
                }
                to="/users"
              >
                Users
              </Link>
              <button
                id="logout-btn"
                className="LogoutBtn"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);