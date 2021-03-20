import React, { Component} from 'react';
import { Link,Redirect } from 'react-router-dom';
import './LoginNavbar.css';
import TnCModal from "./TnCModal";
import Axios from "axios";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {
  Button
} from "@material-ui/core";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

class LoginNavbar extends Component {
  state = {
    click:false,
    loggedOut:false,
    GotTests:false,
    succeed:false,
    ModalShow:false,
    proceed:false
  };
  handleClick = (value) => {
    value==true ? this.setState({ ['click']: false }) : this.setState({ ['click']: true });
  };

  closeMobileMenu = () => {
    this.setState({ ['click']: false });
  };

  LogOut = (e,data) =>{
      e.preventDefault();
      this.closeMobileMenu();
      // const userInfo = {userInfo:data}
      // Axios.post("http://localhost:5000/user/logout",userInfo)
      // .then((res) => {
        this.setState({['loggedOut']:true});
        window.localStorage.clear();
      // })
      // .catch((err) => {
      //   console.log("Axios", err);
      // });
  };
  
  proceedToHome = (x) =>{
    this.setState({proceed:true})
    this.props.onChangeloading(false)
    this.setState({ModalShow:x})
  };
  handleModal = (x) =>{
    this.setState({ModalShow:x})
  };
  render(){
    // const {userInfo} = this.props;
    const {
      click,
      loggedOut,
      GotTests,
      succeed,ModalShow,
      proceed
    }=this.state;
    const values={
      // userInfo,
    }
    return (
      <>
       <TnCModal
        btnshow={true}
        btntext={true}
        size="lg"
        name="No Appointments Booked Yet"
        head="Please book appointments to view them "
        show={ModalShow}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.proceedToHome(false)}
      />
          <Navbar style={{backgroundColor:'#fd6a02' , fontColor:'bisque' ,opacity:'0.9'}} sticky="top" collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand as={Link} to='/' ><b style={{fontSize:"30px"}}>TENSY</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
            <Navbar.Collapse style={{marginTop:'1vh'}} id="responsive-navbar-nav">
              <Nav className="ml-auto" style={{marginRight:'30px'}} >
                <Nav.Link style={{marginRight:'50px' , textDecoration:"none"}} as={Link} to='/loginHome' active>HOME</Nav.Link>
                <Nav.Link style={{marginRight:'50px' , textDecoration:"none"}} as={Link} to='/Agr' active>Ongoing Agreements</Nav.Link>
                <Nav.Link style={{marginRight:'50px' , textDecoration:"none"}} as={Link} to='/Rfp' active>Open RFPs</Nav.Link>
                <Nav.Link style={{marginRight:'50px' , textDecoration:"none"}} as={Link} onClick={(e) => this.LogOut(e,this.props.userInfo)} to='/login' active>LOGOUT</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {loggedOut && 
            <Redirect push
              to={{
                pathname: "/login", 
                // data: loggedOut
              }} 
            />
          }
          {succeed && 
            <Redirect push
              to={{
                pathname: '/test', 
                // data: values
              }} 
            />
          }
          {proceed &&
            <Redirect 
              to={{
                pathname: '/loginHome', 
                // data: values
              }} 
            />

          }
        </>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    check:state.check,
    // CentreValue:state.CentreValue,
    // centreList:state.centreList,
    // slots:state.slots

  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_CHECK , check:check}),
    onChangeCentreValue: (CentreValue) => dispatch({type:actionTypes.CHANGE_CENTREVALUE , CentreValue:CentreValue}),
    onChangeCenterList: (centreList) => dispatch({type:actionTypes.CHANGE_CENTRELIST , centreList:centreList}),
    onChangeloading: (loading) => dispatch({type:actionTypes.CHANGE_LOADING , loading:loading}),
    onChangeSlots: (slots) => dispatch({type:actionTypes.CHANGE_SLOTS , slots:slots})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginNavbar);
