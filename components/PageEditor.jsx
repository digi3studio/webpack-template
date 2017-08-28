import React from "react";
import {connect} from "react-redux";

import PageInfo from "./PageInfo";
import PageTypeSelector from "./PageTypeSelector";
import PageLayoutSelector from "./PageLayoutSelector";
import PageTranslations from "./PageTranslations";
import PageFields from "./PageFields";
import PageControl from "./PageControl";
import PagePreview from "./PagePreview";

import Debug from "./Debug";

class PageEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      previewSource : "",
    };

    this.onPreviewRender = this.onPreviewRender.bind(this);
  }

  onPreviewRender(data){
    this.setState({previewSource: data})
  }

  render(){
    let schemeProperties;
    let schemeFields;

    for(let i=0; i<this.props.pagetype.length; i++){
      const item = this.props.pagetype[i];
      if(item.id === this.props.page.pagetype_id){
        schemeProperties = item.properties;
        schemeFields = item.fields;
        break;
      }
    }

    const fieldValues       = Object.assign({}, this.props.fields[this.props.editingLanguage]);
    const masterFieldValues = Object.assign({}, this.props.fields[this.props.masterLanguage]);

    if(this.state.previewSource !== ""){
      return (
        <div>
          <div className="ui segment">
            <div className="ui button" onClick={e => this.setState({previewSource: ""})}>Close Preview</div>
          </div>
          <PagePreview source={this.state.previewSource}/>
        </div>
      )
    }

    return (
      <div>
        <div className="ui form">
          <div className="ui segment inverted theme">
            <h1>{this.props.campaignName}</h1>
            {
              (this.props.page.shortname === "")?
                (<div>&nbsp;</div>):
                (<div>{`${this.props.city}_${this.props.editingLanguage}/${this.props.campaignShortName}/${this.props.page.shortname}`}</div>)
            }
          </div>

          <div id="page-content" className="column">
            <PageTranslations
              languages={this.props.languages}
              master={this.props.masterLanguage}
              current={this.props.editingLanguage}
              onChange={this.props.onLanguageChange}
            />
            <PageFields
              scheme={schemeFields || this.props.pagetype[0].fields}
              values={fieldValues}
              masterValues={masterFieldValues}
              prefix="field"
              onChange={this.props.onInputChange}
            />
            <PageControl
              campaignId={this.props.campaignId}
              sessionId={this.props.sessionId}
              settings={this.props.page}
              fields={this.props.fields}
              properties={this.props.properties}
              onResultSuccess={this.props.onSaveSuccess}
              onResultError={this.props.onSaveError}
              onPreviewRender = {this.onPreviewRender}
              editingLanguage={this.props.editingLanguage}
              action={"admin/page/save" + ((this.props.page.id === "")? "" : `/${this.props.page.id}`)
              }
            />
          </div>

          <div id="page-setting" className="column">
            <div className="ui stacked segment inverted">
              <h3><i className="icon setting"/>Settings</h3>
              <div id="page-info">
                <PageTypeSelector
                  scheme={this.props.pagetype}
                  selectedType={this.props.page.pagetype_id || 1}
                  selectedLayout={this.props.page.layout_id || 0}
                  onChange={this.props.onInputChange}
                />
                <PageInfo
                  campaignName={this.props.campaignName}
                  page={this.props.page}
                  onChange={this.props.onInputChange}
                />
              </div>

            </div>

            <PageLayoutSelector
              scheme={this.props.pagetype}
              selectedType={this.props.page.pagetype_id || 1}
              selectedLayout={this.props.page.layout_id || 0}
              onChange={this.props.onInputChange}
            />

            {(isEmpty(schemeProperties))? null : (
              <div className="ui segment">
                <h4><i className="icon setting"/>Additional Settings</h4>
                <PageFields
                  scheme={schemeProperties}
                  values={this.props.properties}
                  prefix="prop"
                  onChange={this.props.onInputChange}
                />
              </div>
            )}

            {(false) ? null : (
            <div className="ui segment">
              <h4>Debug: state</h4>
              <Debug state={this.props.debug}/>
              <h5>TODO:</h5>
              <ul>
                <li>Ordering of group items</li>
                <li>Versioning</li>
                <li>Auto save</li>
                <li>reduce blank fields</li>
                <li>Image crop</li>
              </ul>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}


function isEmpty(obj){
  if(obj === undefined)return true;
  if(obj.constructor === Array)return (obj.length === 0);
  if(obj.constructor === Object)return (obj.keys(obj).length === 0);

  return false;
}

export default connect(
  state => {
    return{
      hmr: state.hmr,

      campaignName: state.campaign_name,
      campaignId : state.campaign_id,
      campaignShortName : state.campaign_shortname,
      sessionId : state.session_id,
      languages : state.languages,
      masterLanguage : state.masterLanguage,
      editingLanguage: state.editingLanguage,
      pagetype: state.pagetype,
      page : state.page,
      properties: state.properties,
      fields: state.fields,
      city: state.city,
      debug: state,
    };
  },
  dispatch => {return {
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

    onSaveSuccess:(data)=>{
      dispatch({type:"UPDATE_PAGE_ID", payload: data.page_id});
      window.history.pushState({}, "", data.url);
    },

    onSaveError:(data)=>{
      console.log(data);
    }
  }}
)(PageEditor);