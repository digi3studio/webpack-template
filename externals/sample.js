/**
 * Created by colinleung on 20/4/2017.
 */

var FILE = "sample";

require.config({
  paths: {
    "react":       "//unpkg.com/react@15.5.4/dist/react",
    "prop-types":  "//unpkg.com/prop-types@15.5.10/prop-types",
    "react-dom":   "//unpkg.com/react-dom@15.5.4/dist/react-dom",
    "redux":       "//unpkg.com/redux@3.6.0/dist/redux",
    "react-redux": "//unpkg.com/react-redux@5.0.5/dist/react-redux",
    "hammerjs" :   "//unpkg.com/hammerjs@2.0.8/hammer.min",
    "hot-reload":  "http://localhost:3000/static/"+FILE
  }
});

require(["react", "prop-types", "react-dom", "redux", "react-redux", "hammerjs"], function (React, PropTypes, ReactDOM, Redux, ReactRedux, Hammer) {
  window.React      = React;
  window.PropTypes  = PropTypes;
  window.ReactDOM   = ReactDOM;
  window.Redux      = Redux;
  window.ReactRedux = ReactRedux;
  window.Hammer     = Hammer;

  var host = window.location.hostname;
  if(host.indexOf("local") == 0){
    require(["hot-reload"]);
  }else{
    require(["../dist/"+FILE]);
  }
});