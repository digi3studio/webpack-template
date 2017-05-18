import React from "react";
import ReactDOM from "react-dom";
import SampleContainer from "../containers/SampleContainer";
import { Provider } from "react-redux";
import { createStore } from 'redux';

export default class Main{
  constructor(){
    const defaultState = Object.assign({} , {
      hello: "world",
    }, window.__PRELOADED_STATE__ || {});

    delete window.__PRELOADED_STATE__;
    console.log(defaultState);

    this.store = createStore(
      (state = defaultState, action) => {
        switch(action.type){
          case 'CHANGE_HELLO':
            if(state.hello == action.value)return state;
            return Object.assign({}, state, {hello : action.value});
          default:
            return state;
        }
      }
    );

    const render = (Component) => {
      ReactDOM.render((
          <Provider store={this.store}>
            <Component/>
          </Provider>
        ),
        document.getElementById('root')
      );
    };

    render(SampleContainer);
    if (module.hot){
      module.hot.accept(
        '../containers/SampleContainer',
        () => render(SampleContainer)
      );
    }
  }
}

new Main();