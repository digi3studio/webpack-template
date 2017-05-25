import React from "react";

export default class ChartRingLabel extends React.Component {
  render(){
    const positions = [
      {x:this.props.dx,  y:-this.props.dy},
      {x:-this.props.dx, y:-this.props.dy},
      {x:-this.props.dx, y:this.props.dy},
      {x:this.props.dx,  y:this.props.dy},
    ];

    const lines = this.props.name.split('\n');
    const lineHeight = 20;
    const nameY = -10 - (lines.length - 1) * lineHeight;

    let spans = [];
    for(let i=0; i < lines.length; i++){
      spans.push(<tspan x={0} y={ i * lineHeight}>{lines[i]}</tspan>);
    }

    return (
      <g transform={"translate(" + positions[this.props.position].x + "," + positions[this.props.position].y + ")"}>
        <g transform={"translate(0," + nameY + ")"}>
          <text className="unit" x="0" textAnchor="middle" width="50">{spans}</text>
        </g>

        <text className="total" x="0" y="30" textAnchor="middle">{this.props.value}</text>
      </g>
    );
  }
}
