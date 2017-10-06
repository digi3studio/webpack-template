import React from "react";
import ReactDOM from "react-dom";
import PageEditor from "../components/PageEditor";
import reducer from "../reducers/PageEditReducer";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'


export default class Main{
  constructor(){
    const state = this.getDefaultState();
    this.store = createStore(
      reducer(state),
      applyMiddleware(thunkMiddleware)
    );

    if (module.hot){
      module.hot.accept('../components/PageEditor', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render();
      });
    }

    this.render();
  }

  getDefaultState()
  {
    return Object.assign({} , {
      //default state:
      campaign_name: "",
      campaign_shortname: "",
      campaign_id:"",
      languages : ["en", 'tc'],
      masterLanguage : "en",
      editingLanguage: "en",
      city: "",
      page : {
        id: null,
        name : "",
        shortname : "",
        publish_start_date : "",
        publish_end_date : "",
        parent_id : "",
        order : 1,
        hide : false,
        member: false,
        share: true,
        pagetype_id: "1",
        layout_id: "0"
      },
      properties: {},
      fields: {en:{}},
      pagetype:[],
      previewSource : "",
      editTime: this.getEditTime(),
    }, window.__PRELOADED_STATE__ || {});
  }

  getEditTime()
  {
    return /#edition\d*:\d+/i.test(window.location.href) ?
      location.href.replace(/[^#]+#edition\d*:(\d+)/i, '$1') :
      Date.now();
  }

  render()
  {
    ReactDOM.render((
        <Provider store={this.store}>
          <PageEditor/>
        </Provider>
      ),
      document.getElementById('root')
    );
  }
}

new Main();