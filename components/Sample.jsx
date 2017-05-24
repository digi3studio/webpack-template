import React from "react";
import {connect} from "react-redux";

class Sample extends React.Component{
  render(){
    return (<div onClick={ e =>{this.props.onClick(e);}}>{this.props.hello}!!!</div>);
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
      hello: state.hello,
    };
  },
  dispatch => {return {
    onClick : () => {
      dispatch({type:"CHANGE_HELLO", payload:"click"});
    },
  }}
)(Sample);