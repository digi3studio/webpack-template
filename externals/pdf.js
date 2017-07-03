/**
 * Created by colinleung on 20/4/2017.
 */

var FILE = "pdf";

require.config({
  paths: {
    "react":       "//unpkg.com/react@15.5.4/dist/react",
    "prop-types":  "//unpkg.com/prop-types@15.5.10/prop-types",
    "react-dom":   "//unpkg.com/react-dom@15.5.4/dist/react-dom",
    "redux":       "//unpkg.com/redux@3.6.0/dist/redux",
    "react-redux": "//unpkg.com/react-redux@5.0.5/dist/react-redux",
    "browsefs"   : "//unpkg.com/browserfs@1.3.0/dist/browserfs.min",
    "pdfkit"     : "../dist/pdfkit",
    "hot-reload":  "http://localhost:3000/static/"+FILE
  }
});

require(["react", "prop-types", "react-dom", "redux", "react-redux", "browsefs", "pdfkit"], function (React, PropTypes, ReactDOM, Redux, ReactRedux, BrowserFS, PDFDocument) {
  window.React      = React;
  window.PropTypes  = PropTypes;
  window.ReactDOM   = ReactDOM;
  window.Redux      = Redux;
  window.ReactRedux = ReactRedux;
  window.BrowserFS  = BrowserFS;
  window.PDFDocument= PDFDocument;

  BrowserFS.install(window);
  // Constructs an instance of the LocalStorage-backed file system.
  var lsfs = new BrowserFS.FileSystem.LocalStorage();
  // Initialize it as the root file system.
  BrowserFS.initialize(lsfs);



  var host = window.location.hostname;
  if(host.indexOf("local") == 0){
    require(["hot-reload"]);
  }else{
    require(["../dist/"+FILE]);
  }
});