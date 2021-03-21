import React from 'react';
import Axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import {Typography,Box,TextField,LinearProgress,Select,MenuItem} from '@material-ui/core';
import './Test.css';
import './Modal.css';

function TnCModal(props) {
  const [value, setValue] = React.useState(2);
  const [Product_Name, setProduct_Name] = React.useState(props.name1);
  const [Unit,setUnit] =React.useState("");
  const [Cost_per_Unit,setCost_per_Unit] =React.useState("");
  const [StartDate,setStartDate] =React.useState("");
  const [Total_Quantity_required,setTotal_Quantity_required] =React.useState("");
  const [EndDate,setEndDate] =React.useState("");
  const [DeadlineDate,setDeadlineDate] =React.useState("");
  const [ModeofDelivery,setModeofDelivery] =React.useState("");
  const handleRfp = (x) =>{
    console.log(x)
    Axios.post("http://localhost:5000/rfp/new", x)
    .then((res) => {
      // console.log("Hey this is your result", res);
      props.onAgree();
    })
    .catch((err) => {
      console.log("Axios", err);
    });
  };
  const dropdownShow = (data) => {
    return(
      <div>
      <Select displayEmpty required defaultValue = "" onChange={(e) => setProduct_Name(e.target.value)} style={{minWidth:'120px'}} variant="outlined">
        {data!=undefined && data.length>0 && data.map((value,i) => {
          return(
              <MenuItem value={value}>{value}</MenuItem >
            )
        })}
        </Select>
        </div>
      )
  };
  return (
    <Modal
    // style={{backgroundColor:"#fcf8f7"}}
      show={props.show} 
      onHide={props.onHide}
      backdrop="static"
      dialogClassName="modal-60w"
      // className="special_modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.head}</h4>
        <br />
        <p>
          {props.text}
          <div className="row">
            <div className="col">
                { props.name1.length>0 ? 
                  <TextField
                      placeholder="Enter your Product Name"
                      label="Product Name"
                      variant="outlined"
                      value={props.Product_Name}
                      type="text"
                      fullWidth
                      // readonly
                      onChange={(e) => setProduct_Name(e.target.value)}
              />
              :
              <div >
                <label style={{marginTop:"1vh",marginLeft:"3vw"}}>Product</label>
                    {dropdownShow(props.drpdwn)}
              </div>
              }
              <br/>
              <br/>
              <TextField
                      placeholder="Enter your Product Unit"
                      label="Unit"
                      variant="outlined"
                      value={Unit}
                      onChange={(e) => setUnit(e.target.value)}
                      type="text"
                      fullWidth
              />
              <br />
              <br />
              <TextField
                      placeholder="Enter your Cost / Unit"
                      label="Cost / Unit"
                      variant="outlined"
                      value={Cost_per_Unit}
                      onChange={(e) => setCost_per_Unit(e.target.value)}
                      type="number"
                      fullWidth
              />
              <br />
              <br />
                <label style={{marginTop:"1vh",marginLeft:"3vw"}}>Mode Of Delivery</label>

               <Select displayEmpty required defaultValue = "" onChange={(e) => setModeofDelivery(e.target.value)} style={{minWidth:'230px'}} variant="outlined">
                <MenuItem value="Self Pickup" ><em>Self Pickup</em></MenuItem>
                <MenuItem value="Vendor's Delivery" ><em>Vendor's Delivery</em></MenuItem>
                </Select>
              {/*<TextField
                                    placeholder="Enter your Mode Of Delivery"
                                    label="Mode Of Delivery"
                                    variant="outlined"
                                    value={ModeofDelivery}
                                    onChange={(e) => setModeofDelivery(e.target.value)}
                                    type="number"
                                    fullWidth
                            />*/}
              <br />
              <br />
              </div>

            <div className="col">
              <TextField
                    placeholder="Enter your Start Date"
                    label="Start Date"
                    variant="outlined"
                    value={StartDate}
                    onBlur={(e) => e.target.value=="" ? e.target.type="text" : null}
                    onFocus={(e) => e.target.type="date"}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="text"
                    fullWidth
            />
            <br />
            <br />
              <TextField
                      placeholder="Enter your Total Quantity Required"
                      label="Total Quantity Required"
                      variant="outlined"
                      value={Total_Quantity_required}
                      onChange={(e) => setTotal_Quantity_required(e.target.value)}
                      type="number"
                      fullWidth
              />
              <br />
              <br />
              <TextField
                      placeholder="Enter your End Date"
                      label="End Date"
                      variant="outlined"
                      value={EndDate}
                      onFocus={(e) => e.target.type="date"}
                      onBlur={(e) => e.target.value=="" ? e.target.type="text" : null}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="text"
                      fullWidth
              />
              <br />
              <br />
              <TextField
                      placeholder="Enter your Deadline Date"
                      label="Deadline Date"
                      variant="outlined"
                      value={DeadlineDate}
                      onBlur={(e) => e.target.value=="" ? e.target.type="text" : null}
                      onFocus={(e) => e.target.type="date"}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                      type="text"
                      fullWidth
              />
              <br />
              <br />
            </div>
          </div>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => handleRfp({Manufacturer:props.a,Manufacturer_id:props.b,Status:props.c,Product_Name,Unit,Cost_per_Unit,StartDate,Total_Quantity_required,EndDate,DeadlineDate,ModeofDelivery})}>
            Post
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;