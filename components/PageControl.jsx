import React from "react";

export default class PageControl extends React.Component{
  constructor(props){
    super(props);
    this.onSave = this.onSave.bind(this);
    this.preview = this.preview.bind(this);
  }

  onSave(){
    this.props.onSave();
  }

  preview(){
    this.props.onPreview();
  }

  render(){
    if(this.props.enabled === false){
      return(
        <div>Undefined Page Type. Please select an page type.</div>
      );
    }

    const buttonStyle = "ui button" + (this.props.isLoading ? ' loading' : '');
    return(
      <div id="page-controls">
        <button className={buttonStyle+ " grey"} onClick={this.preview}>Preview</button>
        <button className={buttonStyle+ " black"} onClick={this.onSave}>Save</button>
        {this.props.justSaved ? (<i className="ui icon checkmark"/>): null}
      </div>
    );
  }
}