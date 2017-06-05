/**
 * Created by colinleung on 20/4/2017.
 */

var FILE = "our-audience";//entry file name

require.config({
  paths: {
    "react":       "//unpkg.com/react@15.5.4/dist/react",
    "prop-types":  "//unpkg.com/prop-types@15.5.10/prop-types",
    "react-dom":   "//unpkg.com/react-dom@15.5.4/dist/react-dom",
    "redux":       "//unpkg.com/redux@3.6.0/dist/redux",
    "react-redux": "//unpkg.com/react-redux@5.0.5/dist/react-redux",
    "in-viewport": "//unpkg.com/in-viewport@3.5.0/build/in-viewport.min",
    "hot-reload":  "http://localhost:3000/static/"+FILE
  }
});

require(["react", "prop-types", "react-dom", "redux", "react-redux", "in-viewport"], function (React, PropTypes, ReactDOM, Redux, ReactRedux, InViewport) {
  window.React      = React;
  window.ReactDOM   = ReactDOM;
  window.Redux      = Redux;
  window.ReactRedux = ReactRedux;
  window.PropTypes  = PropTypes;
  window.InViewport = window.inViewport;

  var host = window.location.hostname;
  if(host.indexOf("local") == 0){
    require(["hot-reload"]);
  }else{
    require(["../dist/"+FILE]);
  }
});