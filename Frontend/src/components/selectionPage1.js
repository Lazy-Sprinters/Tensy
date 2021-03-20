import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css';
import LoginNavbar from "./LoginNavbar";
import Footer from './Footer';
import CentreCards from './CentreCards';
import TnCModal from './TnCModal';
import StickyHeadTable1 from './StickyHeadTable1'
import Pre1 from './Pre1';
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";

export class selectionPage1 extends Component {
  state= {
    auth:true,
    auth1:false,
    auth2:false,
    list:"",
    proceedToHome:false,
    x:"",
    ModalShow1:false,
    ModalShow2:false,
    proceed:false
    };
  accept = (data) =>{
    this.setState({x:data});
    this.handleModal1(true);
  };
  proceedToRfp = (x) => {
    this.setState({proceed:true})
  };
  finalize = (x) =>{
    this.setState({auth:false});
    const data={Rfp_id:x.Rfp_id};
     Axios.post("http://localhost:5000/manufacturer/finalizedbids",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        this.setState({list:res.data});
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
  finalize2 = (x) =>{
    const data={Bid_id:x.Bid_id};
    Axios.post("http://localhost:5000/manufacturer/acceptbid",x)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        // this.setState({list:res.data});
        this.setState({proceedToHome:true})
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  };
  handleModal1 = (x) =>{
    this.setState({ModalShow1:x})
  };
  handleModal = (x) =>{
    this.setState({ModalShow2:x})
  }
  render() {
    const{ 
      auth,
      auth1,
      auth2,
      list,
      proceedToHome,
      ModalShow1,
      ModalShow2,
      proceed,
      x
    } = this.state;
  return (
    <>
      {auth && this.finalize(this.props.rfp)}
           {/* {auth1 && <Redirect to={{
              pathname: "/login", 
            }} />}
            {auth2 && 
              <>*/}
        <TnCModal
        // btnshow={true}
        // btntext={true}
        size="lg"
        name="Are you sure you want to accept the agreement and move forward ? Note: This action in irreversible. Clicking Agree will send an automated Email to the concerned bidder and agreement will be finalised."
        // head="Please Try Again Later"
        show={ModalShow1}
        onHide={() => this.handleModal1(false)}
        onAgree={() => this.finalize2(x)}
      />
      <TnCModal
        btnshow={true}
        btntext={true}
        size="lg"
        name="There are no finalised bids yet. Please accept the bids in current bids to view them."
        head="Please Try Again Later"
        show={ModalShow2}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.proceedToRfp(true)}
      />
        <Pre1 />
      <LoginNavbar            
      userInfo={this.props.userInfo}                  /* tochange */
      />
      {auth1 &&
      <StickyHeadTable1 arr={list} accept={this.accept} handleModal={this.handleModal}/>
      }
      {proceedToHome && (
        <Redirect
            push
            to={{
              pathname: "/LoginHome",
            }}
          />
        )}
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
