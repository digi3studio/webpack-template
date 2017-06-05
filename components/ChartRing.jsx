import React from "react";
import {connect} from "react-redux";
import AnimaText from "./AnimaText";

class ChartRing extends React.Component{
  render()
  {
    const isClockwise = false;
    const cx     = this.props.width * 0.5;
    const cy     = this.props.height * 0.624;
    const sum    = this.sumDataValues(this.props.data);
    const length = this.props.data.length;
    const rotate = (isClockwise) ? -this.adjustRotation() : this.adjustRotation();

    let checkpoints = [0.125, 0.375, 0.625, 0.875];
    let segments = [];
    let labels = [];
    let ratios = [];
    let accuRatios = [];
    let initDeg = 0;
    let layoutFail = false;

    for(let i=0; i < length; i++){
      const opacity = 1 - (i / (length + 1));
      const item  = this.props.data[i];
      const ratio = item.value / sum;
      const deg   = ratio * 360;

      ratios[i]       = ratio;
      accuRatios[i]   = ratio + (accuRatios[i-1] || 0);

      const targetDeg = (isClockwise)? (deg + initDeg) : (initDeg - deg);
      segments.push(
        <path
          key={'seg' + i}
          className={"arc sec"+(i+1)}
          transform={"rotate("+ rotate + ")"}
          d={
            SVGHelper.getArc(
              0, 0, 103,
              (isClockwise) ? initDeg: targetDeg,
              (isClockwise)? targetDeg: initDeg
            )
          }
          strokeOpacity={opacity}
        />
      );
      initDeg = targetDeg;

      //make labels
      labels.push(
        <ChartRingLabel key={'label'+i} dx="180" dy="90" name={item.name} value={this.props.inViewport ? item.value : 0} delay={0.5 * i + 2} unit={this.props.dataUnit} position={i} clockwise={isClockwise}/>
      );


      if(ratio > 0.5 || (ratio + (ratios[i-1]||0) > 0.75)){
        layoutFail = true;
      }
    }

    if(layoutFail){
      let offset = rotate / (isClockwise ? 360 : -360);
      for(let i=0; i< length; i++){
        //console.log(checkpoints[i] - (ratios[i-1]||0) - offset);
        const lr = accuRatios[i-1] || 0;
        checkpoints[i] = ((accuRatios[i] - lr) * 0.5) + lr + offset;
      }
    }

    return (
      <g className={"chart-ring "+ (this.props.inViewport ? "on" : "off")} strokeLinecap="butt" strokeLinejoin="miter">
        <ChartTitle headline={this.props.headline} subject={this.props.subject} centerX={cx}/>

        <g transform={"translate(" + cx + "," + cy + ")"} fill="#FFFFFF">
          <circle className="core" cx="0" cy="0" r="84" stroke="#f27427" fill="none" />
          <g className="segments" stroke="#44c5ef">
            {segments}
          </g>
          <ChartTotal total={this.props.inViewport ? this.props.total : 0} unit={this.props.totalUnit} />
          <g>
            {labels}
          </g>
          <CheckPoints points={checkpoints} clockwise={isClockwise}/>
          <PointerLines className={layoutFail ? "": "pointer"} startPoints={checkpoints} clockwise={isClockwise}/>
        </g>
      </g>
    );
  }

  sumDataValues(datas)
  {
    let sum = 0;
    datas.map( obj => { sum += obj.value });
    return sum;
  }

  adjustRotation(){
    const sum = this.sumDataValues(this.props.data);
    const len = this.props.data.length;
    const ratios  = [];
    const dStarts = [];
    const dEnds   = [];
    const checkpoints = [];
    for(let i=0; i<len; i++){
      const item = this.props.data[i];
      ratios[i] = item.value / sum + (ratios[i-1] || 0);
      checkpoints[i] = 0.25 * i + 0.125;
    }

    let a = 1;
    let b = -1;

    for(let i=0; i<len; i++){
      dStarts[i] = checkpoints[i] - (ratios[i-1] || (ratios[3] - 1));
      dEnds[i]   = checkpoints[i] - ratios[i];

      a = Math.min(a, dStarts[i]);
      b = Math.max(b, dEnds[i]);
    }

    const min = -a * 360;
    const max = -b * 360;
    return (min + max) / 2;
  }
}

function PointerLines(props){
  const endPoints = [
    30+4,
    150-4,
    210+4,
    330-4
  ];

  const toDeg = (props.clockwise ? 360 : -360);

  return (
    <g stroke="#FFFFFF" strokeWidth="1">
      <path className={props.className} d={SVGHelper.getNormal(102, 160, props.startPoints[0] * toDeg, endPoints[props.clockwise ? 0 : 3])}/>
      <path className={props.className} d={SVGHelper.getNormal(102, 160, props.startPoints[1] * toDeg, endPoints[props.clockwise ? 1 : 2])}/>
      <path className={props.className} d={SVGHelper.getNormal(102, 160, props.startPoints[2] * toDeg, endPoints[props.clockwise ? 2 : 1])}/>
      <path className={props.className} d={SVGHelper.getNormal(102, 160, props.startPoints[3] * toDeg, endPoints[props.clockwise ? 3 : 0])}/>
    </g>
  );
}

function CheckPoints(props){
  const count = props.points.length;
  let dots = [];
  for(let i=0; i<count; i++){
    const p = SVGHelper.polarToCartesian(0,0, 102, props.points[i] * ((props.clockwise) ? 360 : -360));
    dots.push(<circle className="ani" key={'dot'+i} cx={p.x} cy={p.y} r="2"/>)
  }

  return (
    <g>
      {dots}
    </g>
  );
}

function ChartTitle(props){
  return (
    <g transform={"translate(" + props.centerX + ", 0 )"}>
      <text className="label" x={0} y="38" fill="#44c5ef" textAnchor="middle">{props.headline}</text>
      <text className="label" x={0} y="68" fill="#FFFFFF" textAnchor="middle">{props.subject}</text>
    </g>
  );
}

function ChartTotal(props){
  return (
    <g>
      <g transform="translate(0, 12)">
        <AnimaText
          className="total"
          textAnchor="middle"
          duration={1000}
          value = {props.total}
          unit  = {props.unit}
          type = "svg"
          />
      </g>
    </g>
  );
}

function ChartRingLabel(props){
  const positions = (props.clockwise) ?
  [
    {x: props.dx,  y: props.dy},
    {x:-props.dx,  y: props.dy},
    {x:-props.dx,  y:-props.dy},
    {x: props.dx,  y:-props.dy},
  ] : [
    {x: props.dx,  y:-props.dy},
    {x:-props.dx,  y:-props.dy},
    {x:-props.dx,  y: props.dy},
    {x: props.dx,  y: props.dy},
  ];

  return (
    <g className="label-group" transform={"translate(" + positions[props.position].x + "," + positions[props.position].y + ")"}>
      <MultilineText className="unit" x="0" y="-10" textAnchor="middle">{props.name}</MultilineText>
      <AnimaText className="value"
                 x="0" y="30"
                 textAnchor="middle"
                 value={props.value}
                 unit={props.unit}
                 delay={props.delay}
                 type="svg"
                 format={ n => Math.round(n)}
      />

    </g>
  );
}

function MultilineText(props){
  const lines = props.children.split('\n');
  const lineHeight = 20;
  const nameY = props.y -(lines.length - 1) * lineHeight;

  let spans = [];
  for(let i=0; i < lines.length; i++){
    spans.push(<tspan key={"span"+i} x="0" dy={ i * lineHeight}>{lines[i]}</tspan>);
  }

  return (
    <text {...props} y={nameY}>{spans}</text>
  );
}

class SVGHelper{
  //https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
  static polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  static getArc(x, y, radius, startAngle, endAngle){
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  static getNormal(startRadius, endRadius, startAngle, endAngle){
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
      total: state.inViewport ? state.total : 0,
      totalUnit: state.totalUnit,
      inViewport: state.inViewport,
    };
  },
  dispatch => {return {
  }}
)(ChartRing);