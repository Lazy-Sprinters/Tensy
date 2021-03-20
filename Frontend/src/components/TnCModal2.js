import React from 'react';
import Axios from "axios";
import {Button,Modal} from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import {Typography,Box,TextField,LinearProgress,Select,MenuItem} from '@material-ui/core';
import './Test.css';
import './Modal.css';

function TnCModal(props) {
  const [Price_Per_Unit, setPrice_Per_Unit] = React.useState("");

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
        <p>
          {props.text}
          <div className="row">
                <label style={{marginTop:"3vh",marginLeft:"5vw",marginRight:"2vw"}}>Cost per Unit</label>
              <div >

                <TextField
                        placeholder="Enter your Cost/Unit"
                        label="Cost/Unit"
                        variant="outlined"
                        value={Price_Per_Unit}
                        onChange={(e) => setPrice_Per_Unit(e.target.value)}
                        type="number"
                        fullWidth
                />
              <br />
              <br />
              </div>
              <div>
                <label style={{marginTop:"1vh",marginLeft:"3vw",marginRight:"2vw"}}>Mode Of Delivery</label>

               <Select displayEmpty required defaultValue = "" onChange={props.handleChange("Mode_Of_Delivery")} style={{minWidth:'230px'}} variant="outlined">
                <MenuItem value="Self Pickup" ><em>Self Pickup</em></MenuItem>
                <MenuItem value="Vendor's Delivery" ><em>Vendor's Delivery</em></MenuItem>
                </Select>
              </div>
              <br />
              <br />
          </div>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button style={{border:'5px solid bisque',backgroundColor:'white',color:'black'}} variant="success" onClick={() => props.onAgree(Price_Per_Unit)}>
            Submit
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default TnCModal;