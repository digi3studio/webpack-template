/**
 * Created by colinleung on 20/4/2017.
 */

var FILE = "chartRing";//entry file name

require.config({
  paths: {
    "react":       "//cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.min",
    "react-dom":   "//cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.min",
    "hammerjs" :   "//cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min",
    "redux":       "//cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min",
    "react-redux": "//cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.4/react-redux.min",
    "hot-reload":  "http://localhost:3000/static/"+FILE
  }
});

require(["react", "react-dom", "hammerjs", "redux", "react-redux"], function (React, ReactDOM, Hammer, Redux, ReactRedux) {
  window.React      = React;
  window.ReactDOM   = ReactDOM;
  window.Hammer     = Hammer;
  window.Redux      = Redux;
  window.ReactRedux = ReactRedux;

  var host = window.location.hostname;
  if(host.indexOf("local") == 0){
    require(["hot-reload"]);
  }else{
    require(["../dist/"+FILE]);
  }
});