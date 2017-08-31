import React from "react";
import {connect} from "react-redux";

import PageInfo from "./PageInfo";
import PageTypeSelector from "./PageTypeSelector";
import PageLayoutSelector from "./PageLayoutSelector";
import PageTranslations from "./PageTranslations";
import PageFields from "./PageFields";
import PageControl from "./PageControl";
import PagePreview from "./PagePreview";
import PageAutoSave from "./PageAutoSave";

import Debug from "./Debug";

class PageEditor extends React.Component{
  constructor(props){
    super(props);
    const editionFormat = /#edition\d*:\d+/i;

    const isContiueEdition = editionFormat.test(window.location.href);
    const edition = isContiueEdition ? window.location.href.match(editionFormat)[0].replace('#','') : `edition${this.props.page.id}:${Date.now()}`;

    this.state = {
      previewSource : "",
      autoSaveId : edition,
      hugeFile: false,
    };

    this.onPreviewRender = this.onPreviewRender.bind(this);
    this.onSaveSuccess   = this.onSaveSuccess.bind(this);

    if(!isContiueEdition){
      window.history.replaceState({}, "", `#${this.state.autoSaveId}`);
    }else{
      const newState = JSON.parse(localStorage.getItem(this.state.autoSaveId));
      if(newState){
        this.props.onLoadState(newState);
      }
    }
  }

  onPreviewRender(data){
    this.setState({previewSource: data})
  }

  onSaveSuccess(data){
    const oldPageId = this.props.page.id;

    this.props.onSaveSuccess(data);

    if(oldPageId !== this.props.page.id){
      const newAutoSaveId = this.state.autoSaveId.replace("edition:", `edition${this.props.page.id}:`);
      localStorage.removeItem(this.state.autoSaveId);

      this.setState({autoSaveId: newAutoSaveId});
      window.history.replaceState({}, "", `${data.url}#${this.state.autoSaveId}`);
    }
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
              onResultSuccess={this.onSaveSuccess}
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

            <div className="ui segment">
              <PageAutoSave
                campaignId={this.props.campaignId}
                pageId={this.props.page.id}
                currentEdition={this.state.autoSaveId}
                state={this.props.state}
              />

              <h5>TODO:</h5>
              <ul>
                <li>Ordering of group items</li>
                <li>Image crop</li>
                <li>check other user editing same page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function isEmpty(obj){
  if(obj === undefined)return true;
  if(obj.constructor === String)return (obj === "");
  if(obj.constructor === Array)return (obj.length === 0);
  if(obj.constructor === Object)return (Object.keys(obj).length === 0);

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
      state: state,
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
    },

    onSaveError:(data)=>{
      console.log(data);
    },

    onCleanField:() => {
      dispatch({type:"CLEAN_FIELDS", payload: ""})
    },

    onLoadState:(newState) => {
      dispatch({type:"LOAD_STATE", payload: newState});
    },

  }}
)(PageEditor);