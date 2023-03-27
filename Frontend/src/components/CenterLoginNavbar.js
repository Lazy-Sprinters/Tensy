import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { Button } from "@material-ui/core";
import * as actionTypes from "./store/actions";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {
  ExitToApp,
  ExitToAppOutlined,
  AccountBox,
  AccountCircle,
  Home,
  HomeOutlined,
} from "@material-ui/icons";

class CenterLoginNavbar extends Component {
  state = {
    loggedOut: false,
    succeed: false,
    userClicked: false,
    homeClicked: true,
    logOutClicked: false,
  };

  LogOut = (e, data) => {
    e.preventDefault();
    this.setState({ logOutClicked: true });
    this.setState({ userClicked: false });
    this.setState({ homeClicked: false });
    // const centerInfo = {centerInfo:data}
    // Axios.post("http://localhost:8080/center/logout",centerInfo)
    // .then((res) => {
    this.setState({ loggedOut: true });
    window.localStorage.clear();
    // })
    // .catch((err) => {
    //   console.log("Axios", err);
    // });
  };

  handleIconClick = (x) => {
    if (x === "Home") {
      this.setState({ userClicked: false });
      this.setState({ homeClicked: true });
    }
    if (x === "Profile") {
      this.setState({ userClicked: true });
      this.setState({ homeClicked: false });
    }
  };

  render() {
    // const {centerInfo} = this.props;
    const { loggedOut, succeed, userClicked, homeClicked, logOutClicked } =
      this.state;
    const values = {
      // centerInfo,
    };
    return (
      <>
        <Navbar
          style={{
            backgroundColor: "#fd6a02",
            fontColor: "bisque",
            opacity: "0.9",
          }}
          sticky="top"
          collapseOnSelect
          expand="lg"
          variant="dark"
        >
          <Navbar.Brand as={Link} to="/">
            <b style={{ fontSize: "30px" }}>TENSY</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" style={{ marginRight: "30px" }}>
              <Nav.Link
                style={{ marginRight: "50px", textDecoration: "none" }}
                as={Link}
                to="/centerloginHome"
                active
              >
                HOME
              </Nav.Link>
              <Nav.Link
                style={{ marginRight: "50px", textDecoration: "none" }}
                as={Link}
                to="/centerAgr"
                active
              >
                Ongoing Agreements
              </Nav.Link>
              <Nav.Link
                style={{ marginRight: "50px", textDecoration: "none" }}
                as={Link}
                to="/centerRfp"
                active
              >
                Open RFPs
              </Nav.Link>
              <Nav.Link
                style={{ marginRight: "50px", textDecoration: "none" }}
                as={Link}
                onClick={(e) => this.LogOut(e, this.props.userInfo)}
                to="/centerlogin"
                active
              >
                LOGOUT
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {loggedOut && (
          <Redirect
            push
            to={{
              pathname: "/centerLogin",
              // data: loggedOut
            }}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    centerInfo: state.centerInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCenterInfo: (centerInfo) =>
      dispatch({ type: actionTypes.CHANGE_CENTERINFO, centerInfo: centerInfo }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterLoginNavbar);
