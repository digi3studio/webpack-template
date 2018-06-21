import React from "react" ;
import {connect} from "react-redux";

class ChartBar extends React.Component{
  render(){
    const width = 460;
    const barHeight = 125;
    const barWidth = Math.round(width / this.props.data.length);
    const values = this.props.data.map( x => parseFloat(x.value));
    const mx = Math.max(...values);

    const barSetting = values.map(x => {
      const h = barHeight * x / mx;
      let labelY = -h +20;
      if(labelY > -5)labelY = -5;

      let valueY = -h -5;
      if(valueY > -20) valueY = -20;

      return {h : h, labelY: labelY, valueY: valueY};
    });

    let colors = ['#616c9e', '#505b8a', '#253b70', '#132b61'];
    this.props.data.forEach((x, i) => {
      console.log(x.color);
      if(x.color !== undefined){
        colors[i] = x.color;
      }
    });
    console.log(colors);

    const bars = barSetting.map((x, i) => (
      <g className="bar" key={'bar'+i}>
        <rect x={barWidth * i} y={-x.h} width={barWidth} height={x.h} fill={colors[i] || colors[i % colors.length]}/>
      </g>
    ));

    const labels = barSetting.map((x, i) => (
      <g className="label" key={"label"+i} transform={"translate(0, " + x.labelY + ")"}>
        <text textAnchor="middle" x={barWidth / 2 + (barWidth * i)}>{this.props.data[i].name}</text>
      </g>
    ));

    const txtValues = barSetting.map((x,i) =>(
      <g className="value" key={"value"+i} transform={"translate(0, " + x.valueY + ")"}>
        <text textAnchor="middle" x={barWidth / 2 + (barWidth * i)}>{this.props.data[i].value + this.props.unit}<tspan className="superscript" dy="-10">{this.props.source}</tspan></text>
      </g>
    ));


    return (
      <div>
        <svg className={this.props.inViewport ? "on": "off"} width={width} height={180} viewBox={`0 0 ${width} 180`}>
          <g className="bg" strokeWidth={1} stroke="#b2bfcb">
            <path d="M 0 0.5 l 275 0"/>
            <path d="M 0 44.5 l 275 0"/>
            <path d="M 0 88.5 l 275 0"/>
            <path d="M 0 132.5 l 275 0"/>
          </g>
          <rect className="base-bar" y="175" width={width} height="5" fill="#f17628"/>
          <g className="baseline" transform={"translate(0, 169)"}>
            <g className="bars">
              {bars}
            </g>

            <g className="labels" fill="#FFFFFF">
              {labels}
            </g>

            <g className="values" fill="#002a53">
              {txtValues}
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