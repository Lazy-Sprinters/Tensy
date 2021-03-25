import React, { Component } from 'react';
import { ThemeProvider as MuiThemeProvider  } from '@material-ui/core/styles';
import validateInfo from './error.js';
import { Link,Redirect } from 'react-router-dom';
import Axios from "axios";
import TnCModal from "./TnCModal";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
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
  Checkbox,
  FormGroup,
  FormHelperText,
  Select
} from "@material-ui/core";
import './RegisterForm.css'
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { format } from "date-fns";

export class CenterRegisterForm extends Component {

  state = {
    step:0,
    CompanyName:"0",
    PhoneNumber:"0",
    ManufacturerId:"0",
    Email:"0",
    Password:"0",
    Address:"0",
    isLoading:false,
    isLoaded:false,
    isRegistered:false,
    isFaulty:false,
    indicate:false,
    ModalShow:false,
    Services:[],
    FacilityName:"",
    facilityShow:"",
    dropdown:["Plywood","Oil Barrels","AC compressors","Car Engines","Aeroplane Engines","Aluminium Sheets","Soldering guns","Motherboards"],

  };

  handleLoad = () =>  {

    this.setState({ ['isLoading']: true });
    this.setState({ ['isFaulty']: false });

  };

  handleRegister = (data) =>  {
    this.setState({ ['isRegistered']: true });
    this.setState({ ['isLoading']: false });
    this.setState({ ['isLoaded']: true });
    // this.setState({centerInfo : data});
    this.props.onChangeCenterInfo(data);
    this.props.onChangeCheck(1);
    setTimeout(
      () => this.setState({['indicate']:true}), 3000
    );
    
  };
  
  handleModal = (x) => {
    this.setState({ModalShow:x})
  };

  handleFaulty = () =>  {
    this.setState({ ['isFaulty']: true });
    this.setState({ ['isLoading']: false });

  };
  handleTime = (x,date,x1,date1) => {
    console.log(x)
    console.log(date)
    this.setState({ [x1] : date1})
    this.setState({ [x] : date });
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  handleDelete = (i1,Services) =>{
    const PseudoFacilities=[];
    if(Services.length>0){
      Services.map((value,i)=> (
        i!=i1 ? PseudoFacilities.push(value) : null
      ));
    }
    this.setState({Services:PseudoFacilities});
    this.handleShow(PseudoFacilities);
  };

  handleAddAnother = (FacilityName,Services) =>{
    const Facility = FacilityName;
    const PseudoFacilities=[];
    if(Services.length>0){
      Services.map(value => PseudoFacilities.push(value));
    }
    if(FacilityName!=="" && Services!=="")
    {
      PseudoFacilities.push(Facility);
      this.setState({FacilityName:""})
      this.setState({Services:PseudoFacilities});
    }
    this.handleShow(PseudoFacilities);
  };

  handleShow = (PseudoFacilities) =>{
    var code=[];
    if(PseudoFacilities.length>0)
    {
      code.push(<Table striped bordered hover >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Service Name</th>
                    <th>Delete Option</th>
                  </tr>
                </thead>
                <tbody>
                  {PseudoFacilities.map((value,i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td>{value}</td>
                    <td><DeleteOutlinedIcon onClick={()=>this.handleDelete(i,PseudoFacilities)}/></td>
                  </tr>
                  ))}
                </tbody>
              </Table>
      )
    }
        this.setState({facilityShow:code})
    };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  register = (data) =>{
    this.handleModal(false);
    this.handleLoad();
    // this.handleRegister();
    console.log(data);
    Axios.post("http://localhost:5000/vendor/signup1", data)
    .then((res) => {
      console.log( res);
      res.status==201 ? this.handleRegister(res) : this.handleFaulty();

    })
    .catch((err) => {
      console.log("Axios", err);
      this.handleFaulty();
    });
  };
  dropdownShow = (data,FacilityName) => {
    return(
      <div style={{marginBottom:"-2vh"}}>
      <Select required displayEmpty value={FacilityName} onChange={this.handleChange('FacilityName')} style={{margin:'20px',minWidth:'120px'}} variant="outlined">
        <MenuItem value="" disabled><em>None</em></MenuItem>
        {data.length>0 && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
      </Select>
      </div>
      )
  }
  render() {

     const{ 
      step,
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
      ModalShow,
      Services,
      FacilityName,
      facilityShow,
      dropdown
    } = this.state;
    const values = { 
      CompanyName,
      PhoneNumber,
      ManufacturerId,
      Email,
      Password,
      Address,
      Services
    };

    // const  errors = validateInfo(values);
    switch (step) {
      case 0:
        return(
        <> 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div  className="form_input">
            <div className="terms"> 
              <br/> 
              <h1 style={{textAlign:"center"}}>Vendor Registration Form</h1>
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
                  onChange={this.handleChange('CompanyName')}
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
                  onChange={this.handleChange('PhoneNumber')}
                  type="number" inputProps={{ min:1000000000, max: 9999999999, step: 1}}
                  margin="normal"
                  fullWidth
                />
                <br />
                <br />
                </div>
                <div className="txtfld">
                <TextField
                  placeholder="Enter you Vendor ID"
                  label="Vendor ID"
                  variant="outlined"
                  onChange={this.handleChange('ManufacturerId')}
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
                  onChange={this.handleChange('Email')}
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
                  onChange={this.handleChange('Password')}
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
                  onChange={this.handleChange('Address')}
                  type="text"
                  margin="normal"
                  fullWidth
                />
                <br />
                </div>
                  <br/>
                  <div className="btn1">
                    {!isLoading && !isLoaded && <Button
                         style={{
                            border: "5px solid bisque",
                            backgroundColor: "white",
                            color: "black",
                          }}
                        variant="contained"
                      
                        onClick={() => this.nextStep()}
                      >
                        Proceed
                      </Button>}
                  </div>
                  
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  
                </div>

              </div>

            </div>
          </div>
        </MuiPickersUtilsProvider>
        </>
        );
      case 1:
        return(
        <>
          <TnCModal
            size="lg"
            name="Terms & Conditions"
            head="Read The Terms And Conditions Carefully"
            text="The protal is not responsible for any mishaps in the test centre.If you cancel an appointment of the user
            that can in further run decrease your positive credibility decreasing the capacity per slot of the test centre slot."
            show={ModalShow}
            onHide={() => this.handleModal(false)}
            onAgree={() => this.register(values)}
          />
          <div  className="form_input">
            <div className="terms"> 
              <br/> 
              <h1>Add Product</h1>
              
              <div className="reg-row">
                <div className="reg-col">
                  <div className="reg-img">
                    <img src="DEVSPACE-GOCOMET-PROBLEM-2/images/register.gif" />  
                  </div>
                </div>

                <div className="reg-col">
                  <div className="txtfld">
                    <label style={{marginTop:"5vh",marginBottom:"-2vh",marginLeft:"2vw"}}>Service Name</label>
                    {this.dropdownShow(dropdown,FacilityName)}
                  </div>
                  <br />
                  <div className="btn2">
                  {!isLoading && !isLoaded && <Button
                       style={{
                            border: "5px solid bisque",
                            backgroundColor: "white",
                            color: "black",
                            marginLeft:"10vw"
                          }}

                        variant="contained"
                        onClick={() => this.handleAddAnother(FacilityName,Services)}
                      >
                        Add
                      </Button>}
                  </div>
                  <br /><br />
                  <br /><br />
                <div className="txtfld">{facilityShow}</div>
                <br /><br />
                  <div className="btn1">
                    {!isLoading && !isLoaded && <Button
                       style={{
                            border: "5px solid bisque",
                            backgroundColor: "white",
                            color: "black",
                          }}

                        variant="contained"
                      
                        onClick={() => this.handleModal(true)}
                      >
                        Proceed
                      </Button>}
                  </div>
                  <div className="btn2">
                    {!isLoading && !isLoaded && <Button
                       style={{
                            border: "5px solid bisque",
                            backgroundColor: "white",
                            color: "black",
                          }}

                        variant="contained"
                      
                        onClick={ () => this.prevStep()}
                      >
                        Back
                      </Button>}
                  </div>
                  <br/>
                  <br/>
                  <br/>
                  <div className="no-chng">
                    {isLoading && <LinearProgress />}                
                  {isFaulty && <div style={{color:"red",fontSize:'20px',marginLeft:'40vw'}}>* Please fill in your details properly.</div>}
                {isRegistered && isLoaded && <div  style={{fontSize:'20px',marginLeft:'30vw',marginRight:"30vw",textAlign:"center"}}>You have Registered Successfully.Redirecting to Verification page.</div>}
                {!isRegistered && isLoaded && <div style={{color:"red",fontSize:'20px',marginLeft:'30vw',marginRight:"30vw",textAlign:"center"}}>The information provided is invalid. Please try again.</div>}
                <br />
                  {indicate && <Redirect to={{
                        pathname: "/centerVerify", 
                       }} />}
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
}

const mapStateToProps = state => {
  return{
    centerInfo:state.centerInfo
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onChangeCheck: (check) => dispatch({type:actionTypes.CHANGE_CHECK , check:check}),
    onChangeCenterInfo: (centerInfo) => dispatch({type:actionTypes.CHANGE_CENTERINFO , centerInfo:centerInfo}),
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CenterRegisterForm);