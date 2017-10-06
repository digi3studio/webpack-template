import fetch from 'isomorphic-fetch'
import {fromJS} from "immutable";

export const FLASH_MESSAGE = 'FLASH_MESSAGE';
export const FLASH_MESSAGE_END = 'FLASH_MESSAGE_END';
function flash(dispatch, payload, timeout = 1000){
  dispatch({type: FLASH_MESSAGE, payload: payload});
  setTimeout(() => dispatch({type:FLASH_MESSAGE_END, payload: payload}), timeout);
}

function createPostData(aSettings, aProperties, aFields, campaignId, editingLanguage)
{
  //clean up blank variables
  let properties = fromJS(aProperties).toJSON();
  let fields     = fromJS(aFields).toJSON();
  let page_values= fromJS(aSettings).toJSON();

  for(let name in properties){
    if(isEmpty(properties[name]))delete properties[name];
  }

  for(let lang in fields){
    for(let name in fields[lang]){
      let value = fields[lang][name];
      if(isEmpty(value)){
        delete fields[lang][name];
      }
    }
    if(isEmpty(fields[lang])){
      delete fields[lang];
    }
  }

  for(let name in page_values){
    if(isEmpty(page_values[name]))delete page_values[name];
  }

  let postData = new FormData();
  let storage = {
    page_values     : page_values,
    field_values    : fields,
    page_ext_values : properties,
  };

  postData.append("source", JSON.stringify(storage));
  postData.append("campaign", campaignId);

  for(let key in storage.page_values){
    if(key === 'pagetype_id' || key === 'layout_id')continue;
    postData.append(key, storage.page_values[key]);
  }
  postData.append('pagetype_id',        page_values.pagetype_id);
  postData.append('layout_id',          page_values.layout_id);
  postData.append('editing_language',   editingLanguage);
  return postData;
}

export function isEmpty(obj)
{
  if(!obj)return true;
  if(obj.constructor === String)return (obj === "" || obj === "http://");
  if(obj.constructor === Array)return (obj.length === 0);
  if(obj.constructor === Object)return (Object.keys(obj).length === 0);

  return false;
}

export const LOAD_PREVIEW = 'LOAD_PREVIEW';
export const UPDATE_PREVIEW = 'UPDATE_PREVIEW';
export function previewPage(url, settings, properties, fields, campaignId, editingLanguage)
{
  return function(dispatch){
    dispatch({type: LOAD_PREVIEW});

    return fetch(url, {
      credentials: "same-origin",
      method: 'post',
      body: createPostData(settings, properties, fields, campaignId, editingLanguage),
    })
    .then(response => response.text())
    .then(data => {
      dispatch({type: UPDATE_PREVIEW, payload: data});
    });
  }
}

export function clearPreview()
{
  return {type: UPDATE_PREVIEW, payload: ''};
}

export const SAVE_PAGE = 'SAVE_PAGE';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';

export function savePage(url, settings, properties, fields, campaignId, editingLanguage)
{
  return function(dispatch){
    dispatch({type: SAVE_PAGE});

    return fetch(url, {
      credentials: "same-origin",
      method: 'post',
      body: createPostData(settings, properties, fields, campaignId, editingLanguage)
    })
    .then(response => response.json())
    .then(data => {
      if(data.status === 'success'){
        flash(dispatch, {type:SAVE_SUCCESS});
        updatePageId(dispatch, data.page_id);
      }else{
        console.log(data);
      }
    });
  }
}

export const CLEAN_FIELDS = 'ACTION_CLEAN_FIELDS';
export function cleanFields(state)
{
  return function(dispatch){
    let properties = {...state.properties};
    let fields = {...state.fields};

    for(let name in properties){
      if(isEmpty(properties[name]))delete properties[name];
    }

    for(let lang in fields){
      for(let name in fields[lang]){
        let value = fields[lang][name];
        if(isEmpty(value)){
          delete fields[lang][name];
        }
      }
      if(isEmpty(fields[lang])){
        delete fields[lang];
      }
    }

    const newState = {...state, properties: properties, fields: fields};
    dispatch({type: CLEAN_FIELDS, payload: newState});
  }
}

export const CHANGE_FIELD_INPUT = 'ACTION_CHANGE_FIELD_INPUT';
export function changeFieldInput(state)
{
//  const newState =
  dispatch({type : CHANGE_FIELD_INPUT, payload : newState})
}

export const UPDATE_PAGE_ID = 'UPDATE_PAGE_ID';
export function updatePageId(dispatch, id){
  dispatch({type: UPDATE_PAGE_ID, payload: id});
}

