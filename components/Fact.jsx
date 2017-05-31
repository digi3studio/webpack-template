import React from "react";
import {accounting} from "accounting";
import AnimaText from "./AnimaText";
import {connect} from "react-redux";

class Fact extends React.Component{
  render(){
    let text = (this.props.value > 1000) ?
      <AnimaText value={this.props.inViewport ? this.props.value : 0} unit={this.props.unit} format={n => accounting.formatNumber(n) }/> :
      <AnimaText value={this.props.inViewport ? this.props.value : 0} unit={this.props.unit}/>;

      if(this.props.unit === ":"){
        text = <AnimaText value={this.props.inViewport ? this.props.value : 0} unit={this.props.unit} format={n => Math.round(n)}/>;
      }


    return (
      <div className={"fact "+(this.props.inViewport ? "on":"off")}>
        <div className="label">
          <div className="headline">{this.props.headline}</div>
          <div className="subject">{this.props.subject}</div>
        </div>
        <div className="value">{text}</div>
      </div>
    );
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
      inViewport: state.inViewport,
      value: state.value,
      headline: state.headline,
      subject: state.subject,
      unit: state.unit,
    };
  },
  dispatch => {return {
  }}
)(Fact);