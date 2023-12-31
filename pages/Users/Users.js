import React, { Component } from "react";
import "./Users.css";

class Users extends Component {

  state = {
    users: [
      {
        currentCity: "Bayambang",
        currentCountry: "Philippines",
        dob: "20-Feb-1997",
        fullName: "Clementius McGillreich",
        gender: "Male",
        id: 1,
        profilePic: "https://robohash.org/estinvoluptas.jpg?size=50x50&set=set1",
      },
      {
        currentCity: "Rousínov",
        currentCountry: "Czech Republic",
        dob: "26-Jun-1990",
        fullName: "Almira Hawson",
        gender: "Female",
        id: 2,
        profilePic: "https://robohash.org/quosquiatenetur.bmp?size=50x50&set=set1",
      },
      {
        currentCity: "Kendari",
        currentCountry: "Indonesia",
        dob: "30-Nov-1995",
        fullName: "Ed Bonnesen",
        gender: "Male",
        id: 3,
        profilePic: "https://robohash.org/illumcupiditatequia.png?size=50x50&set=set1",
      },
      {
        currentCity: "Nanganga",
        currentCountry: "Tanzania",
        dob: "02-Apr-1997",
        fullName: "Mozelle Fallawe",
        gender: "Female",
        id: 4,
        profilePic: "https://robohash.org/quaequibusdamharum.png?size=50x50&set=set1",
      }
    ],
    displayUsers: [],
    searchText: ""
  }

  _getUsers = () => {
    const data = this.state.users;
    this.setState({ displayUsers: data })
  };

  handleSearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  _updateDisplayUsers = () => {
    const dispUsers = [];
    let users = this.state.users
    for (const user of users) {
      if (user.fullName.toLowerCase().includes(this.state.searchText.toLowerCase()))
        dispUsers.push(user);
    }
    this.setState({ displayUsers: dispUsers })
  };

  handleSearchTextOnClick = (e) => {
    if (this.state.searchText.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    } else {
      this._updateDisplayUsers();
    }
  };

  handleSearchReset = () => {
    let users = this.state.users;
    this.setState({
      searchText: "",
      displayUsers: users
    })
  };

  componentDidMount() {
    this._getUsers();
  }

  render() {
    return (
      <main>
        <div className="PageWrapper">
          <h1 className="MainHeading">Users</h1>
          <div className="SearchBoxDiv" style={{ marginTop: "12px" }}>
            <form>
              <input
                style={{ width: "100%" }}
                type="text"
                className="SearchBox"
                name="search-text"
                id="search-text"
                placeholder="Search By Name"
                value={this.state.searchText}
                onChange={this.handleSearchTextChange}
              />
            </form>
            <button
              style={{ marginLeft: "60px" }}
              className="ResetBtn"
              id="reset-search"
              onClick={this.handleSearchTextOnClick}
            >
              Search
            </button>
            <button
              style={{ marginLeft: "30px" }}
              className="ResetBtn"
              id="reset-search"
              onClick={this.handleSearchReset}
            >
              Reset
            </button>
          </div>
          <div className="OrdersWrapper">
            <div style={{ width: "100%" }}>
              <table className="OrderTable">
                <thead>
                  <tr className="TableRow">
                    <th>ID</th>
                    <th>User Avatar</th>
                    <th>Full Name</th>
                    <th>DoB</th>
                    <th>Gender</th>
                    <th>Current Location</th>
                  </tr>
                </thead>
                <tbody id="users-table">
                  {this.state.displayUsers.map(
                    (
                      {
                        id,
                        profilePic,
                        fullName,
                        gender,
                        dob,
                        currentCity,
                        currentCountry
                      },
                      index
                    ) => (
                      <tr className="TableRow" key={id + "" + index}>
                        <td className="SecondaryText">{id}</td>
                        <td className="PrimaryText">
                          <img src={profilePic} alt="user-profile-pic" />
                        </td>
                        <td className="SecondaryText">{fullName}</td>
                        <td className="PrimaryText">{`${dob.split("-")[0]} ${dob.split("-")[1]
                          }, ${dob.split("-")[2]}`}</td>
                        <td className="SecondaryText">{gender}</td>
                        <td className="SecondaryText">
                          <span>{currentCity}</span>,  <span>{currentCountry}</span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Users;