import React from "react" ;
import {connect} from "react-redux";

class ChartBar extends React.Component{
  render(){
    const v1 = parseFloat(this.props.data[0].value);
    const v2 = parseFloat(this.props.data[1].value);
    const v3 = parseFloat(this.props.data[2].value);

    const barHeight = 125;
    const max = Math.max(v1, Math.max(v2, v3));

    const h1 = barHeight * v1 / max;
    const h2 = barHeight * v2 / max;
    const h3 = barHeight * v3 / max;

    let labelY1 = (-h1 + 20);
    let labelY2 = (-h2 + 20);
    let labelY3 = (-h3 + 20);

    //limit label under baseline
    if(labelY1 > -5 )labelY1 = -5;
    if(labelY2 > -5 )labelY2 = -5;
    if(labelY3 > -5 )labelY3 = -5;

    let valueY1 = - h1 - 5;
    let valueY2 = - h2 - 5;
    let valueY3 = - h3 - 5;

    if(valueY1 > -20) valueY1 = -20;
    if(valueY2 > -20) valueY2 = -20;
    if(valueY3 > -20) valueY3 = -20;

    return (
      <div>
        <svg className={this.props.inViewport ? "on": "off"} width={275} height={180} viewBox="0 0 275 180">
          <g className="bg" strokeWidth={1} stroke="#b2bfcb">
            <path d="M 0 0.5 l 275 0"/>
            <path d="M 0 44.5 l 275 0"/>
            <path d="M 0 88.5 l 275 0"/>
            <path d="M 0 132.5 l 275 0"/>
          </g>
          <rect className="base-bar" y="175" width="275" height="5" fill="#f17628"/>
          <g className="baseline" transform={"translate(0, 169)"}>
            <g className="bars">
              <g className="bar" key="bar1">
                <rect x={0}   y={-h1} width="91" height={h1} fill="#002a53" opacity={0.7}/>
              </g>
              <g className="bar" key="bar2">
                <rect x={91}  y={-h2} width="92" height={h2} fill="#002a53" opacity={0.85}/>
              </g>
              <g className="bar" key="bar3">
                <rect x={183} y={-h3} width="92" height={h3} fill="#002a53" opacity={1}/>
              </g>
            </g>

            <g className="labels" fill="#FFFFFF">
              <g className="label" key="label1" transform={"translate(0, " + labelY1 + ")"}>
                <text textAnchor="middle" x={91 / 2 + 0}>{this.props.data[0].name}</text>
              </g>
              <g className="label" key="label2" transform={"translate(0, " + labelY2 + ")"}>
                <text textAnchor="middle" x={91 / 2 + 91}>{this.props.data[1].name}</text>
              </g>
              <g className="label" key="label3" transform={"translate(0, " + labelY3 + ")"}>
                <text textAnchor="middle" x={91 / 2+ 183}>{this.props.data[2].name}</text>
              </g>
            </g>

            <g className="values" fill="#002a53">
              <g className="value" key="value1" transform={"translate(0, " + valueY1+ ")"}>
                <text textAnchor="middle" x={91 / 2 + 0}>{this.props.data[0].value + this.props.unit}<tspan className="superscript" dy="-10">{this.props.source}</tspan></text>
              </g>
              <g className="value" key="value2" transform={"translate(0, " + valueY2 + ")"}>
                <text textAnchor="middle" x={91 / 2 + 91}>{this.props.data[1].value + this.props.unit}<tspan className="superscript" dy="-10">{this.props.source}</tspan></text>
              </g>
              <g className="value" key="value3" transform={"translate(0, " + valueY3 + ")"}>
                <text textAnchor="middle" x={91 / 2+ 183}>{this.props.data[2].value + this.props.unit}<tspan className="superscript" dy="-10">{this.props.source}</tspan></text>
              </g>
            </g>
          </g>
        </svg>
        <div className="title">{this.props.title}</div>
      </div>
    );
  }
}

export default connect(
  state => Object.assign({}, state),
  dispatch => {return {}}
)(ChartBar);