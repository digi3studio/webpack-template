/**
 * Created by colinleung on 20/4/2017.
 */

var FILE = "IGVideoMaker";

require.config({
  paths: {
    "react":       "//unpkg.com/react@15.5.4/dist/react",
    "prop-types":  "//unpkg.com/prop-types@15.5.10/prop-types",
    "react-dom":   "//unpkg.com/react-dom@15.5.4/dist/react-dom",
    "redux":       "//unpkg.com/redux@3.6.0/dist/redux",
    "react-redux": "//unpkg.com/react-redux@5.0.5/dist/react-redux",
    "jquery"     : "//unpkg.com/jquery@3.2.1/dist/jquery.min",
    "hot-reload":  "http://localhost:3000/static/"+FILE
  }
});

require(["react", "prop-types", "react-dom", "redux", "react-redux", "jquery"], function (React, PropTypes, ReactDOM, Redux, ReactRedux, jQuery) {
  window.React      = React;
  window.PropTypes  = PropTypes;
  window.ReactDOM   = ReactDOM;
  window.Redux      = Redux;
  window.ReactRedux = ReactRedux;
  window.jQuery     = jQuery;
  window.$          = jQuery;

  var host = window.location.hostname;
  if(host.indexOf("local") == 0){
    require(["hot-reload"]);
  }else{
    require(["../dist/"+FILE]);
  }
});