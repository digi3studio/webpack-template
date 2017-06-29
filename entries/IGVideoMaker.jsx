import React from "react";
import ReactDOM from "react-dom";
import IGVideoMaker from "../components/IGVideoMaker";
import sampleReducer from "../reducers/sampleReducer";
import {$,jQuery} from "jquery";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    this.store = createStore(sampleReducer({}));

    if (module.hot){
      module.hot.accept('../components/IGVideoMaker', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render();
      });
    }

    this.render();
  }

  render(){
    ReactDOM.render((
        <Provider store={this.store}>
          <IGVideoMaker/>
        </Provider>
      ),
      document.getElementById('root')
    );
  }
}

new Main();