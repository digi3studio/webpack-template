import React from "react";
import eases from "eases";

export default class AnimaText extends React.Component{
  constructor(props){
    super(props);
    this.timeoutId = null;
    this.step = this.step.bind(this);
    this.state = {value: 0};
    this.startStep();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.props.value){
      this.startStep();
    }
  }

  startStep(){
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(()=>{
      this.start = null;
      this.iv = null;
      this.dv = null;
      window.requestAnimationFrame(this.step);
    }, this.props.delay * 1000);
  }

  step(timestamp){
    if(this.start === null)this.start = timestamp;
    if(this.iv === null)this.iv = this.state.value;
    if(this.dv === null)this.dv = this.props.value - this.state.value;
    const dt = timestamp - this.start;

    if(dt >= this.props.duration){
      this.setState({value: this.props.value});
      return;
    }

    const nv = this.props.ease( dt / this.props.duration );
    this.setState(
      {value: nv * this.dv + this.iv}
    );
    window.requestAnimationFrame(this.step);
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    let {value, unit, ease, delay, duration, ...others} = this.props;
    let displayValue = this.props.format(this.state.value);

    if(unit === ":"){
      const sec = displayValue % 60;
      const min = Math.floor(displayValue / 60);
      displayValue = min + ":" + ((sec < 10) ? ("0"+sec) : sec);
      unit = "";
    }

    return (this.props.type === 'svg') ?
      AnimaText.renderSVG(others, displayValue, unit) :
      AnimaText.renderSpan(others, displayValue, unit);
  }

  static renderSVG(props, displayValue, unit){
    return (<text {...props}>{displayValue + unit}</text>);
  }

  static renderSpan(props, displayValue, unit){
    return (<span {...props}>{displayValue + unit}</span>);
  }
}

AnimaText.defaultProps = {
  speed : 500,
  duration: 1000,
  delay: 0,
  type: "span",
  format: n => String(Math.round( n * 10)/10),
  ease: eases.quartOut,
  unit:""
};