import React from "react";
import ReactDOM from "react-dom";
import PageEditor from "../components/PageEditor";
import reducer from "../reducers/PageEditReducer";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const state = this.getDefaultState();
    this.store = createStore(reducer(state));

    if (module.hot){
      module.hot.accept('../components/PageEditor', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render();
      });
    }

    this.render();
  }

  getDefaultState(){
    const state = Object.assign({} , {
      //default state:
      campaign_name: "",
      languages : ["en", 'tc'],
      masterLanguage : "en",
      editingLanguage: "en",
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
      },
      style:{
        type: "1",
        layout: "1",
      },
      properties: {},
      fields: {},
      pagetype:[],

    }, window.__PRELOADED_STATE__ || {});

    return state;
  }

  render(){
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