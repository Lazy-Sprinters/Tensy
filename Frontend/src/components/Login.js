import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import LoginHome from "./LoginHome";
import Axios from "axios";
import "./Login.css";
import { TextField, LinearProgress } from "@material-ui/core";
import * as actionTypes from "./store/actions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
class Login extends Component {
  state = {
    success: false,
    Email: "0",
    password: 0,
    isLoadingL: false,
    isLoadedL: false,
    isFaultyL: false,
    isLoggedIn: false,
    userInfo: 0,
    err_msg: "",
  };

  handleLoginChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleLoginLoad = () => {
    this.setState({ isLoadingL: true });
    this.setState({ isFaultyL: false });
  };
  handleLogin = () => {
    this.setState({ isLoadingL: false });
    this.setState({ isLoggedIn: true });
  };

  handleLoginFaulty = () => {
    this.setState({ isFaultyL: true });
    this.setState({ isLoadingL: false });
  };

  login = (data) => {
    this.handleLoginLoad();
    Axios.post("http://localhost:8080/manufacturer/login", data)
      .then((res) => {
        this.props.onChangeUserInfo(res);
        // this.props.onChangeloading(true);
        res.status == 200 ? this.handleLogin() : this.handleLoginFaulty();
      })
      .catch((err) => {
        // if(err.response.status==403){
        //     this.setState({err_msg:err.response.data});
        //     this.handleLoginFaulty();
        //   }
        // else{
        console.log("Axios", err);
        this.handleLoginFaulty();
        // }
      });
  };
  handleEnter = (data) => (e) => {
    if (e.key === "Enter") {
      !(data.password !== 0 && data.Email !== "0")
        ? this.handleLoginFaulty()
        : this.login(data);
    }
  };
  render() {
    const {
      Email,
      password,
      isLoadingL,
      isLoggedIn,
      isLoadedL,
      isFaultyL,
      userInfo,
      err_msg,
    } = this.state;
    const values = {
      Email,
      password,
    };

    return (
      <div className="lbody">
        <Navbar />
        <div
          className="Login-bg"
          style={{
            backgroundImage:
              "url(" + "DEVSPACE-GOCOMET-PROBLEM-2/images/hometry.jpeg" + ")",
          }}
        >
          <div className="base-container" style={{ marginTop: "3vh" }}>
            <div className="header"> Manufacturer Login</div>
            <div className="content">
              <div className="image">
                <img src="DEVSPACE-GOCOMET-PROBLEM-2/images/login.svg" />
              </div>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="username">Email</label>
                  <TextField
                    onChange={this.handleLoginChange("Email")}
                    type="text"
                    placeholder="username"
                    onKeyPress={this.handleEnter(values)}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <TextField
                    onChange={this.handleLoginChange("password")}
                    type="password"
                    placeholder="password"
                    onKeyPress={this.handleEnter(values)}
                  />
                </div>
              </div>
            </div>
            <br />
            {!isFaultyL && <br />}
            {!isFaultyL && <br />}
            <div className="footer">
              {isLoadingL && (
                <LinearProgress style={{ backgroundColor: "#a5a89f" }} />
              )}
              <Button
                type="submit"
                className="btn"
                style={{
                  border: "5px solid bisque",
                  boxShadow: "-1px 2px 5px #a5a89f",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={
                  !(values.password !== 0 && values.Email !== "0")
                    ? () => this.handleLoginFaulty()
                    : () => this.login(values)
                }
              >
                Login
              </Button>
              {isLoadingL && (
                <LinearProgress style={{ backgroundColor: "#a5a89f" }} />
              )}
            </div>
            {isFaultyL && (
              <div style={{ color: "red" }} className="err-msg">
                <h5>*{err_msg}</h5>
              </div>
            )}
            {!isFaultyL && <br />}
            {!isFaultyL && <br />}
            {!isFaultyL && <br />}
            {!isFaultyL && <br />}
          </div>
        </div>
        {isLoggedIn && (
          <Redirect
            push
            to={{
              pathname: "/loginHome",
              // data: {userInfo}
            }}
          />
        )}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeUserInfo: (userInfo) =>
      dispatch({ type: actionTypes.CHANGE_STATE, userInfo: userInfo }),
    onChangeloading: (loading) =>
      dispatch({ type: actionTypes.CHANGE_LOADING, loading: loading }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
