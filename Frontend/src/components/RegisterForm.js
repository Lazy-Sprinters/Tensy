import React, { Component } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import validateInfo from "./error.js";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import TnCModal from "./TnCModal";
import {
  TextField,
  Button,
  Container,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";
import "./RegisterForm.css";
import * as actionTypes from "./store/actions";
import { connect } from "react-redux";

export class RegisterForm extends Component {
  state = {
    CompanyName: "0",
    PhoneNumber: "0",
    ManufacturerId: "0",
    Email: "0",
    Password: "0",
    Address: "0",
    isLoading: false,
    isLoaded: false,
    isRegistered: false,
    isFaulty: false,
    indicate: false,
    radioControl: "0",
    ModalShow: false,
    userInfo1: "",
  };

  handleLoad = () => {
    this.setState({ isLoading: true });
    this.setState({ isFaulty: false });
  };

  handleRegister = (data) => {
    this.setState({ isRegistered: true });
    this.setState({ isLoading: false });
    this.setState({ isLoaded: true });
    // this.setState({userInfo1 : data});
    this.props.onChangeUserInfo(data);
    this.props.onChangeCheck(0);
    setTimeout(() => this.setState({ indicate: true }), 3000);
  };

  handleModal = (x) => {
    this.setState({ ModalShow: x });
  };
  handleFaulty = () => {
    this.setState({ isFaulty: true });
    this.setState({ isLoading: false });
  };

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  register = (data) => {
    this.handleModal(false);
    this.handleLoad();
    // this.handleRegister();
    console.log(data);
    Axios.post("http://localhost:8080/manufacturer/signup1", data)
      .then((res) => {
        // console.log("Hey this is your result", res);
        res.status == 201 ? this.handleRegister(res) : this.handleFaulty();
      })
      .catch((err) => {
        console.log("Axios", err);
        this.handleFaulty();
      });
  };
  render() {
    const {
      CompanyName,
      PhoneNumber,
      ManufacturerId,
      Email,
      Password,
      Address,
      isLoading,
      isLoaded,
      isRegistered,
      isFaulty,
      indicate,
      radioControl,
      ModalShow,
      userInfo1,
    } = this.state;
    const values = {
      CompanyName,
      PhoneNumber,
      ManufacturerId,
      Email,
      Password,
      Address,
    };
    const data = {
      userInfo1,
    };

    const errors = validateInfo(values);

    return (
      <>
        <TnCModal
          size="lg"
          name="Terms & Conditions"
          head="Read The Terms And Conditions Carefully"
          text="
        The portal is not responsible for any mishaps in the test centre. 
        If you cancel an appointment after booking, you'll be given a penalty 
        that you'll have to pay on your next appointment. "
          show={ModalShow}
          onHide={() => this.handleModal(false)}
          onAgree={() => this.register(values)}
        />
        <div className="form_input">
          <div className="terms">
            <br />
            <h1 style={{ textAlign: "center" }}>
              Manufacturer Registration Form
            </h1>
            <br />
            <br />
            <div className="reg-row">
              <div className="reg-col">
                <div className="reg-img">
                  <img src="DEVSPACE-GOCOMET-PROBLEM-2/images/register.gif" />
                </div>
              </div>
              <div className="reg-col">
                <div className="txtfld">
                  <TextField
                    placeholder="Enter Your Company Name"
                    label="Company Name"
                    variant="outlined"
                    onChange={this.handleChange("CompanyName")}
                    type="text"
                    fullWidth
                  />
                  <br />
                  <br />
                </div>
                <div className="txtfld">
                  <TextField
                    placeholder="Enter your Phone Number"
                    label="Phone Number"
                    variant="outlined"
                    onChange={this.handleChange("PhoneNumber")}
                    type="number"
                    inputProps={{ min: 1000000000, max: 9999999999, step: 1 }}
                    helperText={
                      !errors.PhoneNumber &&
                      Boolean(parseInt(values.PhoneNumber))
                        ? "Not a valid Phone Number"
                        : ""
                    }
                    error={
                      !errors.PhoneNumber &&
                      Boolean(parseInt(values.PhoneNumber))
                    }
                    margin="normal"
                    fullWidth
                  />
                  <br />
                  <br />
                </div>
                <div className="txtfld">
                  <TextField
                    placeholder="Enter you Manufacturer ID"
                    label="Manufacturer ID"
                    variant="outlined"
                    onChange={this.handleChange("ManufacturerId")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                </div>
                <div className="txtfld">
                  <TextField
                    placeholder="Enter you Email Address"
                    label="Email Address"
                    variant="outlined"
                    onChange={this.handleChange("Email")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                </div>
                <div className="txtfld">
                  <TextField
                    placeholder="Enter your Password"
                    label="Password"
                    variant="outlined"
                    onChange={this.handleChange("Password")}
                    helperText={
                      !errors.Password && Boolean(parseInt(values.Password))
                        ? "The Password should be at least 8 characters long"
                        : ""
                    }
                    error={
                      !errors.Password && Boolean(parseInt(values.Password))
                    }
                    type="password"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                </div>
                <div className="txtfld">
                  <TextField
                    placeholder="Enter you Address"
                    label="Address"
                    variant="outlined"
                    onChange={this.handleChange("Address")}
                    type="text"
                    margin="normal"
                    fullWidth
                  />
                  <br />
                </div>
                <div className="btn1">
                  {!isLoading && !isLoaded && (
                    <Button
                      // color="primary"
                      variant="contained"
                      style={{
                        border: "5px solid bisque",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={() => this.handleModal(true)}
                    >
                      Register
                    </Button>
                  )}
                </div>

                <br />
                <br />

                <br />
                <div className="no-chng">
                  {isLoading && <LinearProgress />}
                  {isFaulty && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "40vw",
                      }}
                    >
                      * Please fill in your details properly.
                    </div>
                  )}
                  {isRegistered && isLoaded && (
                    <div
                      style={{
                        fontSize: "20px",
                        marginLeft: "30vw",
                        marginRight: "30vw",
                        textAlign: "center",
                      }}
                    >
                      You have Registered Successfully.Redirecting to
                      Verification page.
                    </div>
                  )}
                  {!isRegistered && isLoaded && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginLeft: "30vw",
                        marginRight: "30vw",
                        textAlign: "center",
                      }}
                    >
                      The information provided is invalid. Please try again.
                    </div>
                  )}
                  <br />
                  {indicate && (
                    <Redirect
                      to={{
                        pathname: "/verify",
                        // data: data
                      }}
                    />
                  )}
                </div>
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </>
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
    onChangeCheck: (check) =>
      dispatch({ type: actionTypes.CHANGE_CHECK, check: check }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
