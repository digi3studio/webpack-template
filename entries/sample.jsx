import React from "react";
import ReactDOM from "react-dom";
import Sample from "../components/Sample";
import sampleReducer from "../reducers/sampleReducer";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const state = this.getDefaultState();
    this.store = createStore(sampleReducer(state));

    if (module.hot){
      module.hot.accept('../components/Sample', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render();
      });
    }

    this.render();
  }

  getDefaultState(){
    const state = Object.assign({} , {
      //default state:
      hello: "world",
    }, window.__PRELOADED_STATE__ || {});

    delete window.__PRELOADED_STATE__;
    console.log(state);
    return state;
  }

  render(){
    ReactDOM.render((
        <Provider store={this.store}>
          <Sample/>
        </Provider>
      ),
      document.getElementById('root')
    );
  }
}

new Main();