import React from "react";
import Form from "./Form";

export default class PageControl extends Form{
  constructor(props){
    super(props);
    this.onSave = this.onSave.bind(this);
    this.preview = this.preview.bind(this);
  }

  createPostData(){
    let postData = new FormData();
    let storage = {
      page_values     : this.props.settings,
      field_values    : this.props.fields,
      page_ext_values : this.props.properties,
    };
    const settings = this.props.settings;
    postData.append("source", JSON.stringify(storage));
    postData.append("campaign", this.props.campaignId);

    for(let key in storage.page_values){
      if(key === 'pagetype_id' || key === 'layout_id')continue;
      postData.append(key, storage.page_values[key]);
    }
    postData.append('pagetype_id',        this.props.settings.pagetype_id);
    postData.append('layout_id',          this.props.settings.layout_id);
    postData.append('editing_language',   this.props.editingLanguage);
    return postData;
  }

  onSave(){
    this.post(this.createPostData());
  }

  preview(){
    let url = "page/admin_preview" + ((this.props.settings.id === "")? "" : `/${this.props.settings.id}`);

    this.setState({isLoading : true});
    fetch(
        this.state.urlBase + url, {
        credentials: "same-origin",
        method: 'post',
        body: this.createPostData()
      })
      .then((response) => response.json())
      .then((data)=> {
        this.setState({isLoading: false});
        console.log(data);
      });
  }

  render(){

    const buttonStyle = "ui button" + (this.state.isLoading?' loading': '');
    return(
      <div id="page-controls">
        <button className={buttonStyle+ " grey"} onClick={this.preview}>Preview</button>
        <button className={buttonStyle+ " black"} onClick={this.onSave}>Save</button>
      </div>
    );
  }
}