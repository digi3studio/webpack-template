import React from "react";
import Form from "./Form";
import {fromJS} from "immutable";

export default class PageControl extends Form{
  constructor(props){
    super(props);
    this.onSave = this.onSave.bind(this);
    this.preview = this.preview.bind(this);

    this.state = {
      ...this.state,
      isSaved : false,
    }
  }

  isEmpty(obj){
    if(!obj)return true;
    if(obj.constructor === String)return (obj === "" || obj === "http://");
    if(obj.constructor === Array)return (obj.length === 0);
    if(obj.constructor === Object)return (Object.keys(obj).length === 0);

    return false;
  }

  createPostData(){
    //clean up blank variables
    let properties = fromJS(this.props.properties).toJSON();
    let fields     = fromJS(this.props.fields).toJSON();
    let page_values= fromJS(this.props.settings).toJSON();

    for(let name in properties){
      if(this.isEmpty(properties[name]))delete properties[name];
    }

    for(let lang in fields){
      for(let name in fields[lang]){
        let value = fields[lang][name];
        if(this.isEmpty(value)){
          delete fields[lang][name];
        }
      }
      if(this.isEmpty(fields[lang])){
        delete fields[lang];
      }
    }

    for(let name in page_values){
      if(this.isEmpty(page_values[name]))delete page_values[name];
    }

    let postData = new FormData();
    let storage = {
      page_values     : page_values,
      field_values    : fields,
      page_ext_values : properties,
    };

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

    this.setState({
      isLoading : true,
      isSaved : false,
    });

    fetch(
        this.state.urlBase + url, {
        credentials: "same-origin",
        method: 'post',
        body: this.createPostData()
      })
      .then((response) => response.text())
      .then((data)=> {
        this.setState({
          isLoading: false,
        });
        this.props.onPreviewRender(data);
      });
  }

  render(){

    const buttonStyle = "ui button" + (this.state.isLoading?' loading': '');
    return(
      <div id="page-controls">
        <button className={buttonStyle+ " grey"} onClick={this.preview}>Preview</button>
        <button className={buttonStyle+ " black"} onClick={this.onSave}>Save</button>
        {this.state.isSaved ? (<i className="ui icon checkmark"/>): null}
      </div>
    );
  }

  onResultSuccess(data){
    super.onResultSuccess(data);
    this.setState({isSaved : true});

    clearTimeout(this.iid);
    this.iid = setTimeout(()=>{this.setState({isSaved : false})}, 3000);
  }
}