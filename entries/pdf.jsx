import React from "react";
import ReactDOM from "react-dom";
import PdfEditor from "../components/PdfEditor";
import sampleReducer from "../reducers/sampleReducer";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    this.store = createStore(sampleReducer({}));

    if (module.hot){
      module.hot.accept('../components/Sample', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render();
      });
    }

    this.render();
  }

  render(){
    ReactDOM.render((
        <Provider store={this.store}>
          <PdfEditor/>
        </Provider>
      ),
      document.getElementById('root')
    );
  }
}

new Main();