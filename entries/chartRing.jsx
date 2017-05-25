import React from "react";
import ReactDOM from "react-dom";
import ChartRing from "../components/ChartRing";
import chartRingReducer from "../reducers/chartRingReducer";
import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const root = document.getElementById('root');
    const data = JSON.parse(root.getAttribute("data-chart"));

    console.log('data', data);

    const defaultState = Object.assign({} ,
      {
        headline:  root.getAttribute('data-headline'),
        subject:   root.getAttribute('data-subject'),
        total:     root.getAttribute('data-total'),
        totalUnit: root.getAttribute('data-total-unit'),
        dataUnit:  root.getAttribute('data-unit'),
      },
      data,
      {
        width: 470,
        height: 360,
      },
      window.__PRELOADED_STATE__ || {});

    delete window.__PRELOADED_STATE__;
    console.log(defaultState);

    this.store = createStore(chartRingReducer(defaultState));

    if (module.hot){
      module.hot.accept('../components/ChartRing', () => {
        this.render();
        this.store.dispatch({type:"HOT_RELOAD"});
      });
    }

    this.render();
  }

  render(){
    const state = this.store.getState();

    ReactDOM.render((
        <svg width={state.width} height={state.height}>
          <Provider store={this.store}>
            <ChartRing/>
          </Provider>
        </svg>
      ),
      root
    );
  }
}

window.main = new Main();