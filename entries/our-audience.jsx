import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux';

import InViewport from 'in-viewport';
import inViewportElementReducer from "../reducers/inViewportElementReducer";

import Infographic from "../components/Infographic";
import HorizontalBar from "../components/HorizontalBar";
import ChartBar from "../components/ChartBar";

class MainInfoGraphic{
  constructor(root){
    const defaultState = {
      value:       parseFloat(root.getAttribute('data-value')),
      source:      root.getAttribute('data-source'),
      description: root.getAttribute('data-description'),
      title:       root.getAttribute('data-title'),
    };

    this.store = this.store || createStore(inViewportElementReducer(defaultState));

    InViewport(root, (elt) =>{
      setTimeout(()=>{
        this.store.dispatch({type:"CHANGE_IN_VIEWPORT", payload: true});
      }, 500);
    });

    this.render(root);
  }

  render(root){
    ReactDOM.render(
      (
        <Provider store={this.store}>
          <Infographic />
        </Provider>
      )
      , root)
  }
}

class MainHorizontalBar{
  constructor(root){
    const defaultState = {
      title: root.getAttribute('data-title'),
      description: root.getAttribute('data-description'),
      value: root.getAttribute('data-value'),
      unit: root.getAttribute('data-unit'),
      source: root.getAttribute('data-source')
    };

    this.store = this.store || createStore(inViewportElementReducer(defaultState));

    InViewport(root, (elt) =>{
      setTimeout(()=>{
        this.store.dispatch({type:"CHANGE_IN_VIEWPORT", payload: true});
      }, 500);
    });

    this.render(root);
  }

  render(root){
    ReactDOM.render(
      (
        <Provider store={this.store}>
          <HorizontalBar />
        </Provider>
      )
      , root)
  }
}

class MainFactory{
  constructor(root, state, CLASS){
    this.store = this.store || createStore(inViewportElementReducer(state));
    this.render(root, CLASS);
    InViewport(root, (elt) =>{
      setTimeout(()=>{
        this.store.dispatch({type:"CHANGE_IN_VIEWPORT", payload: true});
      }, 500);
    });
  }

  render(root, CLASS){
    ReactDOM.render(
      (
        <Provider store={this.store}>
          <CLASS />
        </Provider>
      )
      , root)
  }
}

class Mains{
  constructor(){
    this.setup();
  }

  setup(){
    this.charts = [];

    const items = document.querySelectorAll('.info-graphic-root');
    for(let i = 0; i < items.length; i++){
      this.charts.push(new MainInfoGraphic(items[i]));
    }

    const bars = document.querySelectorAll('.horizontal-bar-root');
    for(let i = 0; i < bars.length; i++){
      this.charts.push(new MainHorizontalBar(bars[i]));
    }

    const vbars = document.querySelectorAll('.bar-chart-root');
    for(let i = 0; i < vbars.length; i++){
      const state = Object.assign({
        title:  vbars[i].getAttribute('data-title'),
        unit:   vbars[i].getAttribute('data-unit'),
        source: vbars[i].getAttribute('data-source')
      },
        JSON.parse(vbars[i].getAttribute("data-chart"))
      );

      this.charts.push(new MainFactory(vbars[i], state, ChartBar));
    }
  }
}

//window.main = new Main(document.querySelector('.chart-ring-root'));
window.main = new Mains();