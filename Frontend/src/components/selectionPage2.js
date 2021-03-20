import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import CentreCards from './CentreCards';
import StickyHeadTable2 from './StickyHeadTable2'
import TnCModal from './TnCModal'
import TnCModal2 from './TnCModal2'
import Pre1 from './Pre1';
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";

export class selectionPage1 extends Component {
  state= {
    auth:true,
    auth1:false,
    auth2:false,
    currbids:"",
    proceedToHome:false,
    x:"",
    y:"",
    ModalShow:false,
    ModalShow1:false,
    ModalShow2:false,
    // Price_Per_Unit:"",
    Mode_Of_Delivery:"",
    proceed:false
  };
  curr = (x) =>{
    this.setState({auth:false});
    const data={Rfp_id:x};
     Axios.post("http://localhost:5000/manufacturer/openbids",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        this.setState({currbids:res.data});
        this.setState({auth1:true})
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
      /*
    const userInfo={userInfo:data}
    Axios.post("http://localhost:5000/helper/check",userInfo)      .then((res) => {
        this.setState({auth2:true});
      })
      .catch((err) => {
        console.log("Invalid Route");
        this.setState({auth1:true});
      }); */
  };
  proceedToRfp = (x) => {
    this.setState({proceed:true})
  };
  finalize = (data) =>{
    this.setState({x:data});
    this.handleModal1(true);
  };
  fn1 = (x) =>{
    Axios.post("http://localhost:5000/manufacturer/acceptforconsideration",x)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        window.location.reload();
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  };
  negotiate = (data) =>{
    this.setState({y:data});
    this.handleModal2(true);
  };
  fn2 = (Man_id,Bid_id,Price_Per_Unit,Mode_Of_Delivery) =>{
    const x={Man_id,Bid_id,Price_Per_Unit,Mode_Of_Delivery}
    Axios.post("http://localhost:5000/manufacturer/submitnego",x)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        window.location.reload();
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  };
   handleModal1 = (x) =>{
    this.setState({ModalShow1:x})
  };
  handleModal = (x) =>{
    this.setState({ModalShow:x})
  };
  handleModal2 = (x) =>{
    this.setState({ModalShow2:x})
  }
  handleChange = (x) => e => {
    this.setState({[x]:e.target.value});
  }
  render() {
    const{ 
      auth,
      auth1,
      auth2,
      currbids,
      proceedToHome,
      x,
      y,
      ModalShow,
      ModalShow1,
      ModalShow2,
      // Price_Per_Unit,
      Mode_Of_Delivery,
      proceed
    } = this.state;
  return (
    <>
      {auth && this.curr(this.props.rfp)}
           {/* {auth1 && <Redirect to={{
              pathname: "/login", 
            }} />}
            {auth2 && 
              <>*/}
        <TnCModal
        // btnshow={true}
        // btntext={true}
        size="lg"
        name="Are you sure you want to finalize the bid and move forward ? Note: This action in irreversible."
        // head="Please Try Again Later"
        show={ModalShow1}
        onHide={() => this.handleModal1(false)}
        onAgree={() => this.fn1(x)}
      />
      <TnCModal2
        // btnshow={true}
        // btntext={true}
        // Price_Per_Unit={Price_Per_Unit}
        Mode_Of_Delivery={Mode_Of_Delivery}
        handleChange={this.handleChange}
        size="lg"
        name="Fill In the negotiation details"
        head="Please enter the required details for negotiation proposal. Note: This action in irreversible."
        show={ModalShow2}
        onHide={() => this.handleModal2(false)}
        onAgree={(Price_Per_Unit) => this.fn2(y.Man_id,y.Bid_id,Price_Per_Unit,Mode_Of_Delivery)}
      />
      <TnCModal
        btnshow={true}
        btntext={true}
        size="lg"
        name="There are no open bids yet. Please wait for the vendors to post their bids."
        head="Please Try Again Later"
        show={ModalShow}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.proceedToRfp(true)}
      />
        <Pre1 />
      <LoginNavbar            
      userInfo={this.props.userInfo}                  /* tochange */
      />
      {auth1 &&
      <StickyHeadTable2 arr={currbids} finalize={this.finalize} negotiate={this.negotiate} handleModal={this.handleModal}/>}
      {proceed && (
        <Redirect
            push
            to={{
              pathname: "/Rfp",
            }}
          />
      )}  
      <Footer />
      {/*</>}*/}
    </>
  );
}
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo,
    centreList:state.centreList,
    rfp:state.rfp
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo})
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(selectionPage1);
