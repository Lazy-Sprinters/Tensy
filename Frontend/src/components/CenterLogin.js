import React, { Component } from "react";
import { Link,Redirect } from 'react-router-dom';
import "../App.css";
import Navbar from "./navbar";
import Footer from "./Footer";
import Axios from "axios";
import "./Login.css";
import { TextField, LinearProgress } from "@material-ui/core";
import {Button} from 'react-bootstrap'
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
class CenterLogin extends Component {
  state = {
    success: false,
    Email: "0",
    password: 0,
    isLoadingL: false,
    isLoadedL: false,
    isFaultyL: false,
    isLoggedIn:false,
    centerInfo: 0,
    err_msg:""
  };

  handleLoginChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleLoginLoad = () => {
    this.setState({ ["isLoadingL"]: true });
    this.setState({ ["isFaultyL"]: false });
  };
  handleLogin = () => {
    this.setState({ ["isLoadingL"]: false });
    this.setState({ ["isLoggedIn"]: true });

  };

  handleLoginFaulty = () => {
    this.setState({ ["isFaultyL"]: true });
    this.setState({ ["isLoadingL"]: false });
  };
  
  login = (data) => {
    this.handleLoginLoad();
    /*this.props.onChangeloading(true);*/
    Axios.post("http://localhost:5000/vendor/login", data)
    .then((res) => {
      this.props.onChangeCenterInfo(res);
      res.status == 200 ? this.handleLogin() : this.handleLoginFaulty();
    })
    .catch((err) => {
      // if(err.response.status==403 || err.response.status==404){
      //     this.setState({err_msg:err.response.data});
      //     this.handleLoginFaulty();
      //   }
      // else{
        console.log("Axios", err);
        this.props.onChangeloading(false);
        this.handleLoginFaulty();
      // }
    });
  };
  handleEnter = (data) => (e) => {
    if(e.key === 'Enter'){
      !(data.password!==0  && data.Email!=="0")
        ?  this.handleLoginFaulty()
        :  this.login(data);
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
      centerInfo,
      err_msg
    } = this.state;
    const values = {
      Email,
      password,
    };

        return (
          <div className="lbody">
            <Navbar />
            <div className="Login-bg" style={{backgroundImage:"url(" + "/images/hometry.jpg"+")"}}>
            <div className="base-container" style={{marginTop:"2vh"}}>
              <div className="header">Vendor Login</div>
              <div className="content">
                <div className="image">
                  <img src="images/login.svg" />
                </div>
                <div className="form">
                  <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <TextField
                      onChange={this.handleLoginChange("Email")}
                      type="text"
                      placeholder="username"
                      onKeyPress={ this.handleEnter(values) }
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <TextField
                      onChange={this.handleLoginChange("password")}
                      type="password"
                      placeholder="password"
                      onKeyPress={ this.handleEnter(values) }
                    />
                  </div>
                </div>
              </div>
              <br />
              {!isFaultyL && <br />}{!isFaultyL && <br />}
              <div className="footer">
                {isLoadingL && <LinearProgress />}
                <Button
                  type="submit"
                  style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}}
                  className="btn"
                  onClick={
                    !(values.password!==0  && values.Email!=="0")
                      ? () => this.handleLoginFaulty()
                      : () => this.login(values)
                  }
                >
                  Login
                </Button>
                {isLoadingL && <LinearProgress />}
              </div>
              {isFaultyL && (
                <div style={{color:"red"}} className="err-msg">
                  <h5>
                    *{err_msg}
                  </h5>
                </div>
              )}
              {!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}{!isFaultyL && <br />}
            </div>
            </div>
            {isLoggedIn && 
            
              <Redirect push to={{
                      pathname: "/centerLoginHome", 
                      // data: {centerInfo}
                     }} />
            }
            <Footer />
          </div>
        );
  }
}
const mapStateToProps = state => {
  return{
    centerInfo:state.centerInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeloading: (loading) => dispatch({type:actionTypes.CHANGE_LOADING , loading:loading}),
    onChangeCenterInfo: (centerInfo) => dispatch({type:actionTypes.CHANGE_CENTERINFO , centerInfo:centerInfo}),
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(CenterLogin);
