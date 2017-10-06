import React from "react";
import _ from "lodash";

export default class LocationBar extends React.Component{
  serialize(obj, prefix) {
    let str = [], p;
    for(p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push((v !== null && typeof v === "object") ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }

  deserialize(queryString) {
    let obj = {};
    if(queryString) {
      queryString.slice(1).split('&').map((item) => {
        const [ k, v ] = item.split('=');
        v ? obj[k] = v : null
      })
    }
    return obj;
  }

  isURLMatch(){
    return (
     (location.pathname.replace(/\/$/i, '') === this.getPath()) &&
       _.isEqual(this.props.query, this.deserialize(location.search)) &&
     (location.hash.replace(/^#/i, '') === this.props.fragment)
    );
  }

  getPath(){
    return this.props.path.replace(/\/$/i, '');
  }

  getQuery(){
    if(_.isEmpty(this.props.query))return '';
    return `?${this.serialize(this.props.query)}`;
  }

  getFragment(){
    if(_.isEmpty(this.props.fragment))return '';
    return `#${this.props.fragment}`;
  }

  render(){
    if(!this.isURLMatch()){
      window.history.replaceState({},'', `${this.getPath()+this.getQuery()+this.getFragment()}`)
    }

    return null;
/*    (
      <div>
        <div>{this.isURLMatch() ? 'match' : 'mismatch'}</div>
        <div>{this.getPath()+this.getQuery()+this.getFragment()}</div>
      </div>
    );*/
  }
}