import React from "react";

export default class Debug extends React.Component{
  render(){
    return (<div className="debugger">
      {JSON.stringify(this.props.state)}
    </div>)
  }
}