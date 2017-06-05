import React from "react";
import {connect} from "react-redux";

class ChartBubble extends React.Component{
  render(){
    const value = Math.max(this.props.valueOne, this.props.valueTwo);
    const s1 = this.props.valueOne / value;
    const s2 = this.props.valueTwo / value;
    return (
      <div>
        <div className="labels">
          <svg width="350" height="245" viewBox="0 0 350 245">
            <g transform={"translate("+ (350/2) + " " + (245/2) +")"}>
              <Bubble cx="-17" cy="-13" scale={s1}/>
              <Bubble cx="55" cy="-13" scale={s2}/>
            </g>
          </svg>
        </div>
        <div className="icons">
          <div className="icon"><div style={{width : (s1*100)+"%"}}/></div>
          <div className="icon"><div style={{width : (s2*100)+"%"}}/></div>
        </div>
      </div>
    );
  }
}

class Bubble extends React.Component{
  render(){
    return(
      <circle cx={this.props.cx} cy={this.props.cy} r={70 * this.props.scale} fill="#333333" opacity={0.5}/>
    )
  }
}

export default connect(
  state => Object.assign({}, state),
  dispatch => {return {}}
)(ChartBubble);