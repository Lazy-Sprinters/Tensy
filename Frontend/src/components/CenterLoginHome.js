import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import CardComponent2 from "./CardComponent2";
import CenterLoginNavbar from "./CenterLoginNavbar";
import TnCModal from './TnCModal'
import TnCModal2 from './TnCModal2'
import Pre1 from "./Pre1";
import Footer from "./Footer";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Axios from "axios";
import { TextField, LinearProgress, Select, MenuItem } from "@material-ui/core";
import "./CenterLoginHome.css";
import {Button} from 'react-bootstrap';

export class CenterLoginHome extends Component {
  state= {
    auth:true,
    auth1:false,
    auth2:false,
     success:false,
    info:false,
    danger:false,
    services:"",
    Nores:false,
    Product:"",
    rfpList:"",
    x:"",
    // Price_Per_Unit:"",
    Mode_Of_Delivery:"",
    y:"",
    ModalShow1:false,
    ModalShow2:false
  };
  handleButtonClick = (x) =>{
    switch(x){
      case "success": this.props.onChangeloading(true); this.setState({success:true});break;
      case "info":this.props.onChangeloading(true);  this.setState({info:true});break;
      case "danger": this.props.onChangeloading(true); this.setState({danger:true});break;

    }
  };
   handleChange = (x) => e => {
    this.setState({[x]:e.target.value})
  } 
  dropdownShow = (data) => {
    return(
      <div>
      <Select displayEmpty required defaultValue = "" onChange={this.handleChange('Product')} style={{minWidth:'230px'}} variant="outlined">
        {data!=undefined && data.length>0 && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
        </Select>
        </div>
      )
  };
  onAcc = (data) =>{
    this.setState({x:data});
    this.handleModal1(true);
  };
  fn1 = (Vendor_id,Rfp_id,Manufacturer_id) =>{
    const data={Vendor_id,Rfp_id,Manufacturer_id};
    console.log(data)
    Axios.post("http://localhost:5000/vendor/firstacceptforconsideration",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        window.location.reload();
      })
      .catch((err) => {
          console.log("Axios", err.message);
      });
  };
  onNego = (data) =>{
    this.setState({y:data});
    this.handleModal2(true);
  };
  fn2 = (Vendor_id,Rfp_id,Manufacturer_id,Price_Per_Unit,Mode_Of_Delivery) =>{
    const x={Vendor_id,Rfp_id,Manufacturer_id,Price_Per_Unit,Mode_Of_Delivery}
    console.log(x)
    Axios.post("http://localhost:5000/vendor/firstsubmitnego",x)
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
  handleModal2 = (x) =>{
    this.setState({ModalShow2:x})
  };
 
  handleSearch = (x,y) =>{
    console.log(x)
    Axios.post("http://localhost:5000/vendor/allvalidrfps",x)      
    .then((res) => {
      console.log(res)
        setTimeout(() => this.props.onChangeloading(false),500);
        this.show2(res.data,y);
      })
      .catch((err) => {
        console.log("Axios", err);
      }); 
  };
  show2(RfpList,centerInfo){
    window.scrollTo({
        top: 420,
        behavior: 'smooth',
    });
    this.props.onChangeloading(true);
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
          <CardComponent2
            flag={true}
            DeadlineDate={value.DeadlineDate}
            Vendor={value.Manufacturer}
            Vendor_Address={value.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
          <CardComponent2
            flag={true}
            DeadlineDate={value1.DeadlineDate}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
          <CardComponent2
            flag={true}
            DeadlineDate={value2.DeadlineDate}
            Vendor={value2.Manufacturer}
            Vendor_Address={value2.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
          <CardComponent2
            flag={true}
            DeadlineDate={value.DeadlineDate}
            Vendor={value.Manufacturer}
            Vendor_Address={value.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
          <CardComponent2
            flag={true}
            DeadlineDate={value.DeadlineDate}
            Vendor={value.Manufacturer}
            Vendor_Address={value.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
          <CardComponent2
            flag={true}
            DeadlineDate={value1.DeadlineDate}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
            onAcc={this.onAcc}
            onNego={this.onNego}
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
    this.setState({ rfpList: code });
      setTimeout(() => this.props.onChangeloading(false),2000);
  }
  authenticate = (x) =>{
    this.setState({auth:false});
    const data={Services:x.data.Services,id:x.data._id}
    // const centerInfo={centerInfo:data}
    // Axios.post("http://localhost:5000/helper/check1",centerInfo)      
    // .then((res) => {
    //   ;
    //   })
    //   .catch((err) => {
    //     console.log("Invalid Route");
    //     setTimeout(() => this.props.onChangeloading(false),500);
    //     this.setState({auth1:true});
    //   }); 
    Axios.post("http://localhost:5000/vendor/list",data)      
    .then((res) => {
        this.setState({services:res.data});
        this.setState({auth1:true})
        if(res.data==undefined || res.data.length==0){
          this.setState({Nores:true})
        }
        setTimeout(() => this.props.onChangeloading(false),500);
      })
      .catch((err) => {
        console.log("Axios", err);
      }); 
  };
  render() {
    const{ 
      auth,
      auth1,
      auth2,
      success,
      info,
      danger,
      services,
      rfpList,
      Nores,
      Product,
      x,y,
      // Price_Per_Unit,
      Mode_Of_Delivery,
      ModalShow1,
      ModalShow2
    } = this.state;
    return(
    <div>
      {auth && this.authenticate(this.props.centerInfo)}
            {/*{auth1 && <Redirect to={{
              pathname: "/centerLogin" 
            }} />}
            {auth2 && */}
        <div className="cbody">
         {ModalShow1 && <TnCModal
        size="lg"
        name="Are you sure you want to finalize the bid and move forward ? Note: This action in irreversible."
        show={ModalShow1}
        onHide={() => this.handleModal1(false)}
        onAgree={() => this.fn1(this.props.centerInfo.data._id,x.Rfp_id,x.Manufacturer_id)}
      />}
      {ModalShow2 && <TnCModal2
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
        onAgree={(Price_Per_Unit) => this.fn2(this.props.centerInfo.data._id,y.Rfp_id,y.Manufacturer_id,Price_Per_Unit,Mode_Of_Delivery)}
      />}
        <Pre1 />
        <CenterLoginNavbar
          centerInfo={this.props.centerInfo}
        />
        {Nores 
          ?
          <h3 style={{margin:"20vw 0vw",textAlign:"center"}}>No RFPs available at the moment</h3>
          :
          <>
          {auth1 && <div style={{margin:"11vw 27vw"}}>
                  <h3 style={{margin:"12vw 0vw",textAlign:"center"}}>Search and Find The RFPs of your products</h3>
                    <div className="row">
                      <label style={{marginTop:"1vh",marginLeft:"3vw",marginRight:"2vw",fontSize:"2vw"}}>Products</label>
                          {this.dropdownShow(services)}
                      <Button style={{marginLeft:"10vw",border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="danger" onClick={() => this.handleSearch({Product,Vendor_id:this.props.centerInfo.data._id},this.props.centerInfo)}>
                        Search
                      </Button>
                      </div>
                    </div>}</>
        }
      {rfpList}
        <Footer />
      
      </div>
    {/*}*/}
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

export default connect(mapStateToProps,mapDispatchToProps)(CenterLoginHome);
