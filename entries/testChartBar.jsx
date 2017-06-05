import React from "react";
import ReactDOM from "react-dom";
import ChartBar from "../components/ChartBar";
import reducer from "../reducers/inViewportElementReducer";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const root = document.querySelector('.bar-chart-root');

    const defaultState = Object.assign(
      {
        title:  root.getAttribute('data-title'),
        unit:   root.getAttribute('data-unit'),
        source: root.getAttribute('data-source')
      },
      JSON.parse(root.getAttribute("data-chart"))
    );
    this.store = createStore(reducer(defaultState));

    if (module.hot){
      module.hot.accept('../components/ChartBar', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render(root);
      });
    }

    this.render(root);
  }

  render(root){
    ReactDOM.render((
        <Provider store={this.store}>
          <ChartBar/>
        </Provider>
      ),
      root
    );

    InViewport(root, (elt) =>{
      setTimeout(()=>{
        this.store.dispatch({type:"CHANGE_IN_VIEWPORT", payload: true});
      }, 500);
    });
  }
}

window.main = new Main();