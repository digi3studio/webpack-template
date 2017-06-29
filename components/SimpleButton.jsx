import React from "react";

export default class SimpleButton extends React.Component{
  render(){
    return (
      <div className={"ui button" + (this.props.loading ? " loading" : "")} onClick={this.props.onClick}><i className={this.props.className}/>{this.props.label}</div>
    );
  }
}