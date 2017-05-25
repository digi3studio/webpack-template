import React from "react";
import {connect} from "react-redux";
import ChartRingLabel from "./ChartRingLabel";

class ChartRing extends React.Component{
  render(){
    const cx = this.props.width * 0.5;
    const cy = this.props.height * 0.624;

    let segments = [];
    let dots = [];
    let labels = [];

    let sum = 0;
    this.props.data.map((obj) => {
      sum += obj.value;
    });

    let initDeg = 0;
    const length = this.props.data.length;
    for(let i=0; i < length; i++){
      const opacity = 1 - (i / (length + 1));
      const item  = this.props.data[i];
      const ratio = item.value / sum * 360;

      const isClockwise = false;
      const targetDeg = (isClockwise)? (ratio + initDeg) : (initDeg - ratio);
      segments.push(
        <path
          className={"arc sec"+(i+1)}
          d={
            this.getArc(
              0, 0, 103,
              (isClockwise) ? initDeg: targetDeg,
              (isClockwise)? targetDeg: initDeg
            )
          }
          strokeOpacity={opacity}
        />
      );
      initDeg = targetDeg;

      //make the dots
      const p = this.polarToCartesian(0,0, 102, (i*90)+45);
      dots.push(
        <circle cx={p.x} cy={p.y} r="1.5"/>
      );

      //make labels
      labels.push(
        <ChartRingLabel dx="180" dy="90" name={item.name} value={item.value+this.props.dataUnit} position={i}/>
      );
    }

    return (
      <g className="chart-ring" strokeLinecap="butt" strokeLinejoin="miter">
        <text className="label" x={cx} y="38" fill="#44c5ef" textAnchor="middle">{this.props.headline}</text>
        <text className="label" x={cx} y="68" fill="#FFFFFF" textAnchor="middle">{this.props.subject}</text>

        <g transform={"translate(" + cx + "," + cy + ")"} fill="#FFFFFF">
          <circle className="core" cx="0" cy="0" r="84" stroke="#f27427" fill="none" />
          <g stroke="#44c5ef">
            {segments}
          </g>

          <text className="total" x="0" y="12" textAnchor="middle">{this.props.total}</text>
          <text className="unit" x="0" y="25" textAnchor="middle">{this.props.totalUnit}</text>

          {labels}
          <g stroke="#FFFFFF" strokeWidth="1">
            {dots}
            <path d={this.getNormal(102, 160, 45, 30+4)}/>
            <path d={this.getNormal(102, 160, 135, 150-4)}/>
            <path d={this.getNormal(102, 160, 225, 210+4)}/>
            <path d={this.getNormal(102, 160, 315, 330-4)}/>
          </g>
        </g>
      </g>
    );
  }

  //https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  getArc(x, y, radius, startAngle, endAngle){
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  getNormal(startRadius, endRadius, startAngle, endAngle){
    const start = this.polarToCartesian(0, 0, startRadius, startAngle);
    const end = this.polarToCartesian(0, 0, endRadius, endAngle);

    return [
      "M", start.x, start.y,
      "L", end.x, end.y
    ].join(" ");
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
      width: state.width,
      height: state.height,
      headline: state.headline,
      subject: state.subject,
      data: state.data,
      dataUnit: state.dataUnit,
      total: state.total,
      totalUnit: state.totalUnit,
    };
  },
  dispatch => {return {
  }}
)(ChartRing);