import React from "react";
import "./Pre1.css";
import * as actionTypes from './store/actions'
import {connect} from 'react-redux'

export class Pre1 extends React.Component {
  state={ }
  render() {
    if(!this.props.loading)  return null;
    return (
      <div className="prebody">
      {console.log("hey")}
        <div className="wrap">
          <div className="loading">
            <div className="bounceball"></div>
            <div className="text">NOW LOADING</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    loading:state.loading,
  };
};

const mapDispatchToProps = dispatch =>{
  return{
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Pre1);

