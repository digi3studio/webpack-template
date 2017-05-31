import React from "react";
import {accounting} from "accounting";
import AnimaText from "./AnimaText";
import {connect} from "react-redux";

class Infographic extends React.Component{
  render(){
    return (
      <div className={"item " + (this.props.inViewport ? "on" : "off")}>
        <h3>
          <AnimaText value={this.props.inViewport ? this.props.value : 0} format={n => accounting.formatNumber(n)}/>
          <sup>{this.props.source}</sup>
        </h3>
        <div>{this.props.description}</div>
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
      source: state.source,
      description: state.description,
    };
  },
  dispatch => {return {
  }}
)(Infographic);