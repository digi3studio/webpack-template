import React from "react";
import {FieldUtils} from "./utils/FieldUtils";

export default class PageFields extends React.Component{
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(name, value){
    this.props.onChange(name, value, this.props.prefix);
   }

  render(){
    //this.props.scheme
    const values       = Object.assign({}, this.props.values);
    const masterValues = this.props.masterValues || this.props.values;
    const fields = this.props.scheme && this.props.scheme.map(field => FieldUtils.renderField(this.props.prefix, field, values, masterValues, this.onChange));

    return (
      <ul className="box page-fields">
        {fields}
      </ul>
    );
  }
}
