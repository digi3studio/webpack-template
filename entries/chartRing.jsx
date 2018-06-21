import React from "react";
import ReactDOM from "react-dom";
import ChartRing from "../components/ChartRing";
import chartRingReducer from "../reducers/chartRingReducer";
import infoGraphicReducer from "../reducers/infoGraphicReducer";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import InViewport from 'in-viewport';
import Infographic from "../components/Infographic";

class Main{
  constructor(root){
    const defaultState = Object.assign({} ,
      {
        width: 470,
        height: 360,
      },
      {
        headline:   root.getAttribute('data-headline'),
        subject:    root.getAttribute('data-subject'),
        total:      parseFloat(root.getAttribute('data-total')),
        totalUnit:  root.getAttribute('data-total-unit'),
        dataUnit:   root.getAttribute('data-unit'),
        inViewport: InViewport(root),
      },
      JSON.parse(root.getAttribute("data-chart")),
    );


    this.store = createStore(chartRingReducer(defaultState));

    InViewport(root, (elt) =>{
      setTimeout(()=>{
        this.store.dispatch({type:"CHANGE_IN_VIEWPORT", payload: true});
      }, 500);
    });


    if (module.hot){
      module.hot.accept('../components/ChartRing', () => {
        this.render(root);
        this.store.dispatch({type:"HOT_RELOAD"});
      });
    }
    this.render(root);
  }

  render(root){
    const state = this.store.getState();

    ReactDOM.render((
        <svg width={state.width} height={state.height} viewBox={"0 0 " + state.width + ' ' + state.height}>
          <Provider store={this.store}>
            <ChartRing/>
          </Provider>
        </svg>
      ),
      root
    );
  }
}

class MainInfoGraphic{
  constructor(root){
    const defaultState = {
      value:       parseFloat(root.getAttribute('data-value')),
      source:      root.getAttribute('data-source'),
      description: root.getAttribute('data-description'),
    };

    this.store = createStore(infoGraphicReducer(defaultState));

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

class Mains{
  constructor(){
    this.setup();
  }

  setup(){
    const roots = document.querySelectorAll('.chart-ring-root');
    this.charts = [];
    for(let i = 0; i < roots.length; i++){
      this.charts.push(new Main(roots[i]));
    }

    const items = document.querySelectorAll('.info-graphic-root');
    for(let i = 0; i < items.length; i++){
      this.charts.push(new MainInfoGraphic(items[i]));
    }
  }
}

//window.main = new Main(document.querySelector('.chart-ring-root'));
window.main = new Mains();