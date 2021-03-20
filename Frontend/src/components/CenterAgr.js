import React from "react";
import Bounce from "react-reveal/Bounce";
import CenterLoginNavbar from "./CenterLoginNavbar";
import { Link, Redirect } from "react-router-dom";
import CardComponent1 from "./CardComponent1";
import TnCModal from "./TnCModal";
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
    live: "",
    upcoming: "",
    completed: "",
    f1:false,
    f2:false,
    f3:false,
    slots: "",
    CentreValue: "",
    centreList:"",
    ModalShow:false
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

  }
  proceedToHome = (x) =>{
    this.setState({selected:x})
  }
  show( centerInfo) {
    /* tochange */
    this.setState({ initial: false });
    this.props.onChangeloading(true);
    const data={id:centerInfo.data._id};
    // let centreList;
    Axios.post("http://localhost:5000/vendor/agreements",data)
      .then((res) => {
        console.log(res);
        // this.handleSearch(res);
        this.show2(res.data.Live_Agreements,res.data.Upcoming_Agreements,res.data.Completed_Agreements,centerInfo);
      })
      .catch((err) => {
          console.log("Axios", err.message);
      }); 
  }
    show2(live,upcoming,completed,centerInfo){
    let len = live.length;
    let f1=(len>0);
    this.setState({f1:f1});
    let i;
    const code: JSX.Element[] = [];
    for (i = 0; i < len - 2; i += 3) {
      let value = live[i];
      let value1 = live[i + 1];
      let value2 = live[i + 2];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value2}
            data1={centerInfo}
            Product={value2.Product}
            Unit={value2.Unit}
            Price_Per_Unit={value2.Price_Per_Unit}
            StartDate={value2.StartDate}
            EndDate={value2.EndDate}
            Total_Quantity={value2.Total_Quantity}
            Total_Cost={value2.Total_Cost}
            Mode_Of_Delivery={value2.Mode_Of_Delivery}
            Vendor={value2.Manufacturer}
            Vendor_Address={value2.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 1) {
      let value = live[3 * parseInt(len / 3)];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 2) {
      let value = live[3 * parseInt(len / 3)];
      let value1 = live[3 * parseInt(len / 3) + 1];
      code.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
        </div>
      );
    }
    this.setState({ live: code });

    len = upcoming.length;
    let f2=(len>0);
    this.setState({f2:f2});
    const code1: JSX.Element[] = [];
    for (i = 0; i < len - 2; i += 3) {
      let value = upcoming[i];
      let value1 = upcoming[i + 1];
      let value2 = upcoming[i + 2];
      code1.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value2}
            data1={centerInfo}
            Product={value2.Product}
            Unit={value2.Unit}
            Price_Per_Unit={value2.Price_Per_Unit}
            StartDate={value2.StartDate}
            EndDate={value2.EndDate}
            Total_Quantity={value2.Total_Quantity}
            Total_Cost={value2.Total_Cost}
            Mode_Of_Delivery={value2.Mode_Of_Delivery}
            Vendor={value2.Manufacturer}
            Vendor_Address={value2.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 1) {
      let value = upcoming[3 * parseInt(len / 3)];
      code1.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 2) {
      let value = upcoming[3 * parseInt(len / 3)];
      let value1 = upcoming[3 * parseInt(len / 3) + 1];
      code1.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
        </div>
      );
    }
    this.setState({ upcoming: code1 });

    len = completed.length;
    let f3=(len>0);
    this.setState({f3:f3})
    const code2: JSX.Element[] = [];
    for (i = 0; i < len - 2; i += 3) {
      let value = completed[i];
      let value1 = completed[i + 1];
      let value2 = completed[i + 2];
      code2.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value2}
            data1={centerInfo}
            Product={value2.Product}
            Unit={value2.Unit}
            Price_Per_Unit={value2.Price_Per_Unit}
            StartDate={value2.StartDate}
            EndDate={value2.EndDate}
            Total_Quantity={value2.Total_Quantity}
            Total_Cost={value2.Total_Cost}
            Mode_Of_Delivery={value2.Mode_Of_Delivery}
            Vendor={value2.Manufacturer}
            Vendor_Address={value2.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 1) {
      let value = completed[3 * parseInt(len / 3)];
      code2.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
        </div>
      );
    }
    if (len % 3 == 2) {
      let value = completed[3 * parseInt(len / 3)];
      let value1 = completed[3 * parseInt(len / 3) + 1];
      code2.push(
        <div className="home__hero-row">
          <CardComponent1
            flag={true}
            data={value}
            data1={centerInfo}
            Product={value.Product}
            Unit={value.Unit}
            Price_Per_Unit={value.Price_Per_Unit}
            StartDate={value.StartDate}
            EndDate={value.EndDate}
            Total_Quantity={value.Total_Quantity}
            Total_Cost={value.Total_Cost}
            Mode_Of_Delivery={value.Mode_Of_Delivery}
             Vendor={value.Manufacturer}
             Vendor_Address={value.Manufacturer_Address}
          />
          <CardComponent1
            flag={true}
            data={value1}
            data1={centerInfo}
            Product={value1.Product}
            Unit={value1.Unit}
            Price_Per_Unit={value1.Price_Per_Unit}
            StartDate={value1.StartDate}
            EndDate={value1.EndDate}
            Total_Quantity={value1.Total_Quantity}
            Total_Cost={value1.Total_Cost}
            Mode_Of_Delivery={value1.Mode_Of_Delivery}
            Vendor={value1.Manufacturer}
            Vendor_Address={value1.Manufacturer_Address}
          />
        </div>
      );
    }
    this.setState({ completed: code2 });
    this.handleModal(!f1&&!f2&&!f3);
    setTimeout(() => this.props.onChangeloading(false),2000);
  }
  render() {
    // const { live,centerInfo} = this.props;        /* tochange */

    const {
      centre,
      selected,
      initial,
      live,
      upcoming,
      completed,
      slots,
      CentreValue,
      f1,f2,f3,ModalShow
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
        name="No agreements Done Yet"
        head="Please negotiate on RFPs in marketplace and get the offer accepted to view them "
        show={ModalShow}
        onHide={() => this.handleModal(false)}
        onAgree={() => this.proceedToHome(true)}
      />
       <CenterLoginNavbar
        centerInfo={this.props.centerInfo}
      />
        {f1 && <> 
          <h2 style={{marginLeft:"5vw",marginTop:"3vh",marginBottom:"3vh"}}>LIVE</h2>
          {live}
          </>
        }
        {f2 && <>
          <h2 style={{marginLeft:"5vw",marginTop:"3vh",marginBottom:"3vh"}}>UPCOMING</h2>
          {upcoming}
          </>
        }
        {f3 && <> 
          <h2 style={{marginLeft:"5vw",marginTop:"3vh",marginBottom:"3vh"}}>COMPLETED</h2>
          {completed}
          </>
        }
        {selected && (
          <Redirect
            push
            to={{
              pathname: "/centerLoginHome",
              // data: values           /* tochange */
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
      dispatch({ type: actionTypes.CHANGE_STATE, centerInfo: centerInfo }),
    onChangeloading: (loading) => 
      dispatch({type:actionTypes.CHANGE_LOADING , loading:loading})

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Agr);
