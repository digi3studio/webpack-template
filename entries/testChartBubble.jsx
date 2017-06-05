import React from "react";
import ReactDOM from "react-dom";
import ChartBubble from "../components/ChartBubble";
import factReducer from "../reducers/factReducer";

import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const root = document.querySelector('.bubble-chart-root');

    const defaultState = {
      title: root.getAttribute('data-title'),
      valueOne: parseFloat(root.getAttribute('data-value-one')),
      valueTwo: parseFloat(root.getAttribute('data-value-two')),
      labelOne: root.getAttribute('data-label-one'),
      labelTwo: root.getAttribute('data-label-two'),
      unit: root.getAttribute('data-unit'),
      source: root.getAttribute('data-source')
    };
    this.store = createStore(factReducer(defaultState));

    if (module.hot){
      module.hot.accept('../components/ChartBubble', () => {
        this.store.dispatch({type:'HOT_RELOAD'});
        this.render(root);
      });
    }

    this.render(root);
  }

  render(root){
    ReactDOM.render((
        <Provider store={this.store}>
          <ChartBubble/>
        </Provider>
      ),
      root
    );
  }
}

window.main = new Main();