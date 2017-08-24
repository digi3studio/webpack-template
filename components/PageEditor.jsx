import React from "react";
import {connect} from "react-redux";

import PageInfo from "./PageInfo";
import PageTypeSelector from "./PageTypeSelector";
import PageTranslations from "./PageTranslations";
import PageFields from "./PageFields";

class PageEditor extends React.Component{
  render(){
    let schemeProperties;
    let schemeFields;

    for(let i=0; i<this.props.pagetype.length; i++){
      const item = this.props.pagetype[i];
      if(item.id == this.props.style.type){
        schemeProperties = item.properties;
        schemeFields = item.fields;
        break;
      }
    }

    const fieldValues       = Object.assign({}, this.props.fields[this.props.editingLanguage]);
    const masterFieldValues = Object.assign({}, this.props.fields[this.props.masterLanguage]);

    return (
      <div>
        <div className="ui form">
          <div className="ui segment inverted theme">
            <h1>{this.props.campaignName}</h1>
          </div>

          <div id="page-content" className="column">
            <PageTranslations languages={this.props.languages} master={this.props.masterLanguage} current={this.props.editingLanguage} onChange={this.props.onLanguageChange}/>
            <PageFields scheme={schemeFields} values={fieldValues} masterValues={masterFieldValues} prefix="field" onChange={this.props.onInputChange}/>
          </div>

          <div id="page-setting" className="column">
            <div className="ui stacked segment inverted">
              <PageInfo campaignName={this.props.campaignName} page={this.props.page} onChange={this.props.onInputChange}/>
              <PageTypeSelector pagetypes={this.props.pagetype} selected={this.props.style} onChange={this.props.onPageStyleChange}/>
              <hr/>
              <h4><i className="icon setting"/>Page Style Settings</h4>
              <PageFields scheme={schemeProperties} values={this.props.properties} prefix="prop" onChange={this.props.onInputChange}/>
            </div>
          </div>
        </div>
        <div id="page-controls">
          <button className="ui secondary button">Save</button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,

      campaignName: state.campaign_name,
      languages : state.languages,
      masterLanguage : state.masterLanguage,
      editingLanguage: state.editingLanguage,
      pagetype: state.pagetype,
      page : state.page,
      style: state.style,
      properties: state.properties,
      fields: state.fields,
    };
  },
  dispatch => {return {
    onPageStyleChange : () =>{

    },

    onInputChange : (name, value, prefix)=> {
      switch (prefix){
        case 'field':
          dispatch({
            type: "CHANGE_FIELD_INPUT",
            payload: {
              name : name,
              value : value,
            }
          });
          break;
        case 'prop':
          dispatch({
            type: "CHANGE_PROPERTIES_INPUT",
            payload: {
              name : name,
              value : value,
            }
          });
          break;
        default:
          dispatch({
            type: "CHANGE_PAGE_SETTING",
            payload: {
              name : name,
              value : value,
            }
          });
      }
    },

    onLanguageChange : (language) =>{
      dispatch({type:"CHANGE_EDITING_LANGUAGE", payload:language});
    },
    onClick : () => {
      dispatch({type:"CHANGE_HELLO", payload:"click"});
    },
  }}
)(PageEditor);