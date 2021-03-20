import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Link,Redirect } from 'react-router-dom';
import './RegisterForm.css'
import { TextField, LinearProgress,Select,MenuItem } from "@material-ui/core";
import Axios from "axios";
import StickyHeadTable from './StickyHeadTable'
import TnCModal1 from './TnCModal1'
import {Button} from 'react-bootstrap'
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import { format} from 'date-fns';

export class RfpNew extends React.Component {
  state = {
    initial:true,
    initial1:false,
    product:[],
    drpdwn:"",
    name:"",
    ModalShow:false
  };
  getExpired = (x) =>{
    const data={id:x.data._id}
    this.setState({initial:false});
    Axios.post("http://localhost:5000/agreements/upd",data)      
    .then((res) => {
        console.log(res);
        this.setState({product:res.data.ret});
        this.setState({drpdwn:res.data.services});
        setTimeout(() => this.props.onChangeloading(false),500);
        this.setState({initial1:true});
      })
      .catch((err) => {
        console.log("Axios", err);
      }); 
  };
  handleNewRfp = (x) => {
    this.setState({name:x});
    this.setState({ModalShow:true})
  }
  handleModal = (x) =>{
    this.setState({ModalShow:x})
  }
  render() {
    // const { userInfo} = this.props;

    const{ 
      initial,
      product,
      initial1,
      drpdwn,
      name,
      ModalShow
    } = this.state;
    
    return (
      <div>
      {initial && this.getExpired(this.props.userInfo)}
      <TnCModal1
        size="lg"
        name="Fill The Form"
        name1={name}
        a={this.props.userInfo.data.CompanyName}
        b={this.props.userInfo.data._id}
        c={true}
        drpdwn={drpdwn}
        head="Post A New RFP"
        text=" "
        show={ModalShow}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.handleModal(false)}
      />
      {initial1 &&
        <div className="row">
          <div className="reviews">
            <h1 style={{textAlign:"center"}}>Expiring Contracts</h1>
            <StickyHeadTable arr={product} handleNewRfp={this.handleNewRfp}/>
          </div>
          <div style={{marginTop:"40vh",marginLeft:"18vw"}}>
            <Button 
              variant="success"
              onClick={() => this.handleNewRfp("")}
              style={{boxShadow:'0px 0px 14px 0.3px bisque' , backgroundColor:'white',color:'black',border:"5px solid bisque",marginBottom:"5vh"}}
            >
              POST A NEW RFP
            </Button>
          </div>
        </div>
      }
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    userInfo:state.userInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeUserInfo: (userInfo) => dispatch({type:actionTypes.CHANGE_STATE , userInfo:userInfo}),
    onChangecentreList: (centreList) => dispatch({type:actionTypes.CHANGE_CENTRELIST , centreList:centreList}),
    onChangebookInfo: (bookInfo) => dispatch({type:actionTypes.CHANGE_BOOKINFO , bookInfo:bookInfo}),
    onChangeloading: (loading) => dispatch({type:actionTypes.CHANGE_LOADING , loading:loading})
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RfpNew);
 