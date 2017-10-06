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
import LocationBar from "./LocationBar";

import {isEmpty, previewPage, savePage, clearPreview} from "../reducers/actions";

//import Debug from "./Debug";

class PageEditor extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      hugeFile: false,
      urlBase : document.body.getAttribute('data-base'),
    };

    this.onPreview       = this.onPreview.bind(this);
    this.onSave          = this.onSave.bind(this);
  }

  onPreview(){
    let url = this.state.urlBase + "page/admin_preview" + ((this.props.page.id === "")? "" : `/${this.props.page.id}`);

    this.props.onPreview(
      url,
      this.props.page,
      this.props.properties,
      this.props.fields,
      this.props.campaignId,
      this.props.editingLanguage
    );
  }

  onSave(){
    let url = this.state.urlBase + "admin/page/save" + ((this.props.page.id === "")? "" : `/${this.props.page.id}`) + '.json';

    this.props.onSave(
      url,
      this.props.page,
      this.props.properties,
      this.props.fields,
      this.props.campaignId,
      this.props.editingLanguage
    );
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

    if(this.props.previewSource !== ""){
      return (
        <div>
          <div className="ui segment">
            <div className="ui button" onClick={this.props.clearPreview}>Close Preview</div>
          </div>
          <PagePreview source={this.props.previewSource}/>
        </div>
      )
    }

    const previewURL = `${this.props.city}_${this.props.editingLanguage}/${this.props.campaignShortName}/${this.props.page.shortname}`;
    return (
      <div>
        <LocationBar
          path={`${this.state.urlBase}admin/page/edit/${this.props.page.id}`}
          query={{campaign: this.props.campaignId}}
          fragment={`edition${this.props.page.id}:${this.props.editTime}`}
        />
        <div className="ui form">
          <div className="ui segment inverted theme">
            <h1>{this.props.campaignName}</h1>
            {
              (this.props.page.shortname === "")?
                (<div>&nbsp;</div>):
                (<div><a className="preview-link" href={previewURL} target="_blank">{previewURL}</a></div>)
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
              scheme={schemeFields}
              values={fieldValues}
              masterValues={masterFieldValues}
              prefix="field"
              onChange={this.props.onInputChange}
            />
            <PageControl
              onPreview={this.onPreview}
              onSave={this.onSave}
              justSaved = {this.props.justSaved}
            />
          </div>

          <div id="page-setting" className="column">
            <div className="ui stacked segment inverted">
              <h3><i className="icon setting"/>Settings</h3>
              <div id="page-info">
                <PageTypeSelector
                  scheme={this.props.pagetype}
                  selectedType={this.props.page.pagetype_id}
                  selectedLayout={this.props.page.layout_id}
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
              selectedType={this.props.page.pagetype_id}
              selectedLayout={this.props.page.layout_id}
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
                currentEdition={`edition${this.props.page.id}:${this.props.editTime}`}
                state={this.props.state}
                onLoadState={this.props.onLoadState}
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

export default connect(
  state => {
    return {
      ...state,

      campaignName: state.campaign_name,
      campaignId : state.campaign_id,
      campaignShortName : state.campaign_shortname,
      sessionId : state.session_id,

      state: state,
    };
  },
  dispatch => {return {
    onInputChange : (name, value, prefix) => {
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

    onLanguageChange : language => dispatch({type:"CHANGE_EDITING_LANGUAGE", payload:language}),

    onPreview: (url, settings, properties, fields, campaignId, editingLanguage) => dispatch(previewPage(
      url,
      settings,
      properties,
      fields,
      campaignId,
      editingLanguage
    )),

    onSave:(url, settings, properties, fields, campaignId, editingLanguage) => dispatch(savePage(
      url,
      settings,
      properties,
      fields,
      campaignId,
      editingLanguage
    )),

    onCleanField:() => dispatch({type:"CLEAN_FIELDS", payload: ""}),

    onLoadState:(newState) => dispatch({type:"LOAD_STATE", payload: newState}),

    clearPreview: () => dispatch(clearPreview()),
  }}
)(PageEditor);