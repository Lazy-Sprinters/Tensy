import React from "react";
import Bounce from "react-reveal/Bounce";
import CenterLoginNavbar from "./CenterLoginNavbar";
import { Link, Redirect } from "react-router-dom";
import CardComponent1 from "./CardComponent1";
import TnCModal from "./TnCModal";
import TnCModal3 from "./TnCModal3";
import { style1 } from "./CardData";
import "./CentreCards.css";
import { TextField, LinearProgress, Select, MenuItem } from "@material-ui/core";
import Axios from "axios";
import * as actionTypes from "./store/actions";
import Footer from "./Footer";
import { connect } from "react-redux";

export class Agr extends React.Component {
  state = {
    centre: "0",
    selected: false,
    initial: true,
    RfpList: "",
    f1:false,
    slots: "",
    CentreValue: "",
    centreList:"",
    ModalShow:false,
    ModalShow1:false,
    ModalShow2:false,
    ModalShow3:false,
    finalProceed:false,
    currProceed:false,
    Mode_Of_Delivery:"",
    rfpid:""
  };
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  handleClick = (x) => {
    // this.setState({slots:x.data});
    this.setState({ selected: true });
  };
  handleModal = (x) =>{
    this.setState({ModalShow:x});
    // !x && this.setState({selected:true})

  };
  handleModal1 = (x) =>{
    this.setState({ModalShow1:x});
    // !x && this.setState({selected:true})

  };
  handleModal2 = (x) =>{
    this.setState({ModalShow2:x});
    // !x && this.setState({selected:true})

  };
  handleModal3 = (x) =>{
    this.setState({ModalShow3:x});
    // !x && this.setState({selected:true})

  };
  proceedToHome = (x) =>{
    this.setState({selected:x})
  };
  show( centerInfo) {
    /* tochange */
    this.setState({ initial: false });
    this.props.onChangeloading(true);
    const data={Vendor_id:centerInfo.data._id};
    // let centreList;
    Axios.post("http://localhost:5000/vendor/allbids",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        this.show2(res.data);
      })
      .catch((err) => {
          console.log("Axios", err.message);
      }); 
  };
 onFinal = (x) =>{
    this.setState({rfpid:x});
    this.handleModal2(true);
  } ;
  accept = (x) =>{
    console.log(x)
    const data={Bid_id:x.Bid_id};
    // this.props.onChangeRfp(x.Rfp_id);
     Axios.post("http://localhost:5000/vendor/accept",data)
      .then((res) => {
        console.log(res);
        window.location.reload();
        // this.handleSearch(res);
        // this.show2(res.data);
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  }; 
   onCurrent = (x) =>{
    this.setState({rfpid:x});
    this.handleModal3(true);
  } ;
  negotiate = (x,Vendor_id,Price_Per_Unit,Mode_Of_Delivery) =>{
   const data={Bid_id:x.Bid_id,Vendor_id,Price_Per_Unit,Mode_Of_Delivery};
    // this.props.onChangeRfp(x.Rfp_id);
     Axios.post("http://localhost:5000/vendor/negotiate2",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        window.location.reload();
        // this.show2(res.data);
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  } ;
  onDelete = (x) =>{
    this.setState({rfpid:x});
    this.handleModal1(true);
  } ;
  delete = (x) => {
    const data={Bid_id:x.Bid_id};
     Axios.post("http://localhost:5000/vendor/deletebid",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        window.location.reload();
        // this.show2(res.data);
      })
      .catch((err) => {
          console.log("Axios", err.message);
      }); 
  }
    show2(RfpList,centerInfo){
    let len = RfpList.length;
    let f1=(len>0);
    this.setState({f1:f1});
    let i;
    const code: JSX.Element[] = [];
    for (i = 0; i < len - 2; i += 3) {
      let value = RfpList[i];
      let value1 = RfpList[i + 1];
      let value2 = RfpList[i + 2];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
          />
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value1.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
          />
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value2.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value2}
            data1={centerInfo}
            Product={value2.Product}
            Unit={value2.Unit}
            Price_Per_Unit={value2.Price_Per_Unit}
            StartDate={value2.StartDate}
            EndDate={value2.EndDate}
            Total_Quantity={value2.Total_Quantity}
            Mode_Of_Delivery={value2.Mode_Of_Delivery}
          />
        </div>
      );
    }
    if (len % 3 == 1) {
      let value = RfpList[3 * parseInt(len / 3)];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
          />
        </div>
      );
    }
    if (len % 3 == 2) {
      let value = RfpList[3 * parseInt(len / 3)];
      let value1 = RfpList[3 * parseInt(len / 3) + 1];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
          />
          <CardComponent1
            flag={false}
            flag1={true}
            DeadlineDate={value1.DeadlineDate}
            onFinal={this.onFinal}
            onDelete={this.onDelete}
            onCurrent={this.onCurrent}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
          />
        </div>
      );
    }
    this.setState({ RfpList: code });
    this.handleModal(!f1);
    setTimeout(() => this.props.onChangeloading(false),2000);
  }
  render() {
    // const { RfpList,centerInfo} = this.props;        /* tochange */

    const {
      centre,
      selected,
      initial,
      RfpList,
      slots,
      CentreValue,
      f1,ModalShow,ModalShow1,ModalShow2,ModalShow3,
      finalProceed,
      Mode_Of_Delivery,
      currProceed,rfpid
    } = this.state;

    const values = {
      slots,
      // centerInfo,
      CentreValue,
    };
    return (
      <div className="helper">
        {initial && this.show(this.props.centerInfo)}
      <TnCModal
        btnshow={true}
        btntext={true}
        size="lg"
        name="No RFPs Done Yet"
        head="Please post RFPs to view them "
        show={ModalShow}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.proceedToHome(true)}
      />
      <TnCModal
        // btnshow={true}
        // btntext={true}
        size="lg"
        name="Are you sure you want to delete the RFP ? Note: This action in irreversible."
        // head="Please Try Again Later"
        show={ModalShow1}
        onHide={() => this.handleModal1(false)}
        onAgree={() => this.delete(rfpid)}
      />
      <TnCModal
        // btnshow={true}
        // btntext={true}
        size="lg"
        name="Are you sure you want to accept the bid for the RFP? Note: This action in irreversible."
        // head="Please Try Again Later"
        show={ModalShow2}
        onHide={() => this.handleModal2(false)}
        onAgree={() => this.accept(rfpid)}
      />
       {ModalShow3 && <TnCModal3
        // btnshow={true}
        // btntext={true}
        // Price_Per_Unit={Price_Per_Unit}
        rfpid={rfpid}
        Mode_Of_Delivery={Mode_Of_Delivery}
        handleChange={this.handleChange}
        size="lg"
        name="Fill In the negotiation details"
        head="Please enter the required details for negotiation proposal. Note: This action in irreversible."
        show={ModalShow3}
        onHide={() => this.handleModal3(false)}
        onAgree={(Price_Per_Unit) => this.negotiate(rfpid,this.props.centerInfo._id,Price_Per_Unit,Mode_Of_Delivery)}
      />}
       <CenterLoginNavbar
        centerInfo={this.props.centerInfo}
      />
        {f1 && <> 
          {RfpList}
          </>
        }
        {selected && (
          <Redirect
            push
            to={{
              pathname: "/centerLoginHome",
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
    centerInfo: state.centerInfo,
    loading:state.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCenterInfo: (centerInfo) =>
      dispatch({ type: actionTypes.CHANGE_CENTERINFO, centerInfo: centerInfo }),
    onChangeloading: (loading) => 
      dispatch({type:actionTypes.CHANGE_LOADING , loading:loading}),
    onChangeRfp: (rfp) => 
      dispatch({type:actionTypes.CHANGE_RFP , rfp:rfp})

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Agr);
