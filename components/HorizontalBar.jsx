import React from "react";
import {connect} from "react-redux";
import marked from 'marked';
import AnimaText from "./AnimaText";

class HorizontalBar extends React.Component{
  render(){
    return(
      <div className={"item "+ (this.props.inViewport ? "on":"off")}>
        <div className="title">{this.props.title}</div>
        <div className="icon" />
        <div className="description" dangerouslySetInnerHTML={{__html: marked(this.props.description || "")}} />
        <div className="value">
          <AnimaText value={this.props.inViewport ? this.props.value : 0} unit={this.props.unit}/>
          <sup>{this.props.source}</sup></div>
        <div className="bar">
          <div style={{width: String(parseFloat(this.props.inViewport ? this.props.value : 0)) + "%"}}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
      inViewport: state.inViewport,
      title: state.title,
      description: state.description,
      value: state.value,
      unit: state.unit,
      source: state.source
    };
  },
  dispatch => {return {
  }}
)(HorizontalBar);