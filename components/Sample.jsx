import React from "react";

export default class Sample extends React.Component{
  render(){
    return (<div onClick={ e =>{this.props.onClick(e);}}>{this.props.hello}</div>);
  }
}