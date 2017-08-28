import React from "react";
import {fromJS} from "immutable";

export class FieldType{}
FieldType.TEXT          = "text";
FieldType.NUMBER        = "number";
FieldType.DATE          = "date";
FieldType.DATE_RANGE    = "daterange";
FieldType.LINK          = "link";
FieldType.ADMIN_COMMENT = "admincomment";
FieldType.ENUM          = "enum";
FieldType.FILE          = "file";
FieldType.GROUP         = "group";
FieldType.BOOLEAN       = "boolean";
FieldType.DISABLE       = "disable";
FieldType.STYLE_SELECT  = "styleselect";

export class FieldUtils{
  static renderField(prefix, field, values, masterValues, onChange){
    //prefix:string

    //field data type:
    //{id:"string", name:"string", type:FieldType.Enum, option:"string"}

    //values data type:
    //{field1: "foo", field2: "bar"}
    //key is prefix + fieldId

    //masterValues: values

    const key = prefix+field.id;
    const commonAttributes = {key: key, prefix: prefix, id: field.id, label:field.name, option: field.option, onChange:onChange};

    switch(field.type){
      case FieldType.ADMIN_COMMENT:
        return (<FieldComment   {...commonAttributes} label={field.option}/>);
      case FieldType.DISABLE:
        return (<FieldDisabled  {...commonAttributes} />);
      case FieldType.TEXT:
        return (<FieldText      {...commonAttributes} value={values[key]} masterValue={masterValues[key]}/>);
      case FieldType.NUMBER:
        let attr = {};
        if(/-/.test(field.option)){
          const arg = field.option.split('-');
          attr['min'] = arg[0];
          attr['max'] = arg[1];
        }
        return (<FieldHTMLInput {...commonAttributes} value={values[key]} masterValue={masterValues[key]} type="number" {...attr}/>);
      case FieldType.DATE:
        return (<FieldHTMLInput {...commonAttributes} value={values[key]} masterValue={masterValues[key]} type="date"/>);
      case FieldType.LINK:
        return (<FieldLink      {...commonAttributes} value={["", values[key+'_1'], values[key+'_2']]} masterValue={["", masterValues[key+'_1'], masterValues[key+'_2']]}/>);
      case FieldType.ENUM:
        return (<FieldEnum      {...commonAttributes} value={values[key]} masterValue={masterValues[key]}/>);
      case FieldType.FILE:
        switch (field.option){
          case 'image':
            return (<FieldImage {...commonAttributes} value={[values[key], values[key+'_1'], values[key+'_2']]} masterValue={[masterValues[key], masterValues[key+'_1'], masterValues[key+'_2']]}/>);
          default:
            return (<FieldFile  {...commonAttributes} value={values[key]} masterValue={masterValues[key]}/>);
        }
      case FieldType.BOOLEAN:
        return (<FieldBoolean   {...commonAttributes} value={values[key]} masterValue={masterValues[key]}/>);
      case FieldType.GROUP:
        return (<FieldGroup     {...commonAttributes} values={values} masterValues={masterValues}/>);
      default:
        return (<FieldUnknown   {...commonAttributes}/>);
    }
  }
}

class IField extends React.Component{
  constructor(props){
    super(props);

    this.onValueChange = this.onValueChange.bind(this);

    const key = `${this.props.prefix}${this.props.id}`;

    this.state = {
      key : key,
      label : (<div className="ui label">{this.props.label.replace("_", " ")}</div>),
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.value && nextProps.value === this.props.value)return false;

    return true;
  }

  onValueChange(e){
    this.props.onChange(e.target.name, e.target.value);
  }

  getPlaceHolder(value, defaultValue){
    if(value == "")return defaultValue;
    return value || defaultValue;
  }
}

class FieldComment extends React.Component{
  render(){
    const label = this.props.label.replace(/---/g, "");
    return (
      <div className={`input-${FieldType.ADMIN_COMMENT}`}>
        <h4 className="ui horizontal divider">{label}</h4>
      </div>
    );
  }
}

class FieldText extends IField{
  render(){
    const length = parseInt(this.props.option);
    const placeholder = this.getPlaceHolder(this.props.masterValue, "");

    const input = ( (length > 64) || (length <= 0)) ?
      (<textarea onChange={this.onValueChange} name={this.state.key} value={this.props.value || ""} placeholder={placeholder}/>):
      (<input onChange={this.onValueChange} type="text" name={this.state.key} value={this.props.value || ""} placeholder={placeholder}/>);

    return (
      <li className={`input-${FieldType.TEXT}`}>
        <div className="ui fluid labeled input">
          {this.state.label}
          {input}
        </div>
      </li>
    );
  }
}

class FieldHTMLInput extends IField{
  render(){
    const placeholder = this.getPlaceHolder(this.props.masterValue, "");
    let props = Object.assign({}, this.props);
    delete props.masterValue;
    delete props.option;

    return (
      <li className={`input-${this.props.htmlType}`}>
        <div className="ui fluid labeled input">
          {this.state.label}
          <input {...props} onChange={this.onValueChange} name={this.state.key} value={this.props.value || ""} placeholder={placeholder}/>
        </div>
      </li>
    );
  }
}

class FieldLink extends IField{
  render(){
    const placeholder1 = this.getPlaceHolder(this.props.masterValue[1], "Label");
    const placeholder2 = this.getPlaceHolder(this.props.masterValue[2], "http://");

    return (
      <li className={`input-${FieldType.LINK}`}>
        <div className="ui fluid labeled icon input">
          {this.state.label}
          <span className="ui left icon input">
            <i className="font icon"/>
            <input type="text" onChange={this.onValueChange} name={`${this.state.key}_1`} value={this.props.value[1] || ""} placeholder={placeholder1}/>
          </span>

          <span className="ui left icon input">
            <i className="linkify icon"/>
            <input type="text" onChange={this.onValueChange} name={`${this.state.key}_2`} value={this.props.value[2] || ""} placeholder={placeholder2}/>
          </span>
        </div>
      </li>
    );
  }
}

class FieldFile extends IField{
  render(){
    const placeholder = this.getPlaceHolder(this.props.masterValue, "Label");

    return (
      <li className={`input-${FieldType.FILE}`}>
        <div className="ui fluid labeled input">
          {this.state.label}
          <input type="text" onChange={this.onValueChange} name={this.state.key} value={this.state.value || ""} placeholder={placeholder}/>
          <input type="file" />
        </div>
      </li>
    );
  }
}

class FieldImage extends IField{
  render(){
    const placeholder0 = this.getPlaceHolder(this.props.masterValue[0], "Label");
    const placeholder1 = this.getPlaceHolder(this.props.masterValue[1], "alt");
    const placeholder2 = this.getPlaceHolder(this.props.masterValue[2], "crop");

    const fileLink = (this.props.value[0] == null || this.props.value[0] == "") ?
      (
        <span className="ui input file">
          <input type="file"/>
        </span>
      ):
      (
        <span>
          <div className="ui input left icon">
            <i className="icon file image outline"/>
            <input type="text" onChange={this.onValueChange} name={this.state.key} value={this.props.value[0] || ""} placeholder={placeholder0} />
          </div>

          <div className="ui input">
            <input type="text" onChange={this.onValueChange} name={`${this.state.key}_1`} value={this.props.value[1] || ""} placeholder={placeholder1} />
          </div>

          <div className="ui input">
            <input type="text" onChange={this.onValueChange} name={`${this.state.key}_2`} value={this.props.value[2] || ""} placeholder={placeholder2} />
          </div>
        </span>
      );

    return (
      <li className={`input-${FieldType.FILE}`}>
        <div className="ui labeled input">
          {this.state.label}
        </div>

        {fileLink}
      </li>
    );
  }
}

class FieldEnum extends IField{
  constructor(props){
    super(props);
    this.refreshDropdown = this.refreshDropdown.bind(this);
  }

  refreshDropdown(item, key){
    $(item).dropdown(
      {
        onChange: value => {
          this.props.onChange(key, value);
        }
      }
    );
  }

  componentDidMount(){
    this.refreshDropdown();
  }

  componentDidUpdate(){
    this.refreshDropdown();
  }

  render(){
    const options = this.props.option.split(",").map(option => {
      //support value:label in option
      if(/\:/.test(option)){
        const args = option.split(":");
        return (
          <div className="item" data-value={args[0]} key={option}>{args[1]}</div>
        );
      }
      return (
        <div className="item" data-value={option} key={option}>{option}</div>
      );
    });

    return (
      <li className={`input-${FieldType.ENUM}`}>
        <div className="ui selection dropdown fluid" name={this.state.key} ref={item => this.refreshDropdown(item, this.state.key)}>
          <input type="hidden" name={this.state.key} value={this.props.value}/>
          <i className="dropdown icon"/>
          <div className="default text">{this.props.label}</div>
          <div className="menu">
            {options}
          </div>
        </div>
      </li>
    )
  }
}

class FieldUnknown extends IField{
  render(){
    return (
      <li className={`input-unknown`}>
        <div>not implement : {this.props.type}</div>
      </li>
    );
  }
}

class FieldGroup extends IField{
  shouldComponentUpdate(nextProps, nextState){
    //always update group
    return true;
  }

  render(){
    //this.props.scheme
    let count = this.props.masterValues[`count${this.props.id}`] || 1;
    count = parseInt(count);

    let fieldGroup = [];
    for(let i=0; i<count; i++){
      const groupId = `${this.props.id}(${i})`;

      const options = fromJS(this.props.option);
      const childrenSchemes = options.map(
        //append group id to children
        option => option.set('id', `${groupId}_${option.get('id')}`).toJSON()
      );

      const fields = childrenSchemes.map(field => FieldUtils.renderField(this.props.prefix, field, this.props.values, this.props.masterValues, this.props.onChange));

      fieldGroup[i] = (
        <li key={'group'+i} draggable="true" className="wide">
          <div className="ui segment">
            <div className="ui top left attached label theme">{`${this.state.key}(${i})`}</div>
            <ul className="box">
              {fields}
            </ul>
          </div>
        </li>
      )
    }

    return (
      <li className={`input-${FieldType.GROUP}`}>
        <div className="ui segment">
          <div className="ui ribbon label teal">{this.props.label}</div>
          <div className="ui input labeled">
            <div className="ui label">count:</div>
            <input type="number" name={'count'+this.props.id} min="1" value={this.props.masterValues[`count${this.props.id}`] || 1} onChange={this.onValueChange}/>
          </div>

          <ul className="box">
            {fieldGroup}
          </ul>
        </div>
      </li>
    );
  }
}

class FieldBoolean extends IField{
  render(){
    return (
      <div className="ui checkbox">
        <input id={this.state.key} name={this.state.key} type="checkbox" checked={this.props.value == 1} onChange={(e)=>this.props.onChange(this.state.key, (e.target.checked) ? "1" : "0" )}/>
        <label htmlFor={this.state.key}>{this.props.label}</label>
      </div>
    );
  }
}

class FieldDisabled extends React.Component{
  render(){
    return null;
  }
}