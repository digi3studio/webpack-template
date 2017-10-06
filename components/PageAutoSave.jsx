import React from "react";

export default class PageAutoSave extends React.Component{
  constructor(props){
    super(props);
    this.urlBase = document.body.getAttribute('data-base');
    this.state = {
      update : 0
    };

    this.stateSize = 0;

    const newState = JSON.parse(localStorage.getItem(this.props.currentEdition));
    if(newState){
      this.props.onLoadState(newState);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentEdition !== this.props.currentEdition){
      this.onDelete(this.props.currentEdition);
    }

    const autosave = JSON.stringify(nextProps.state);
    this.stateSize = autosave.length;
    if(autosave.length > 100000)return;
    try{
      localStorage.setItem(nextProps.currentEdition, autosave);
    }catch(ex){
      alert(ex);
    }
  }

  onDelete(key){
    localStorage.removeItem(key);
    this.setState(
      {update : this.state.update++}
    );
  }

  render(){
    const format      = new RegExp(`edition${this.props.pageId}:`, 'i');
    const storageKeys = Object.keys(localStorage).filter(key => /edition\d*:\d+/i.test(key));
    const saves       = storageKeys.map(key => !format.test(key) ? null : (
      <li key={key}>
        <a href={`${this.urlBase}admin/page/edit/${this.props.pageId}?campaign=${this.props.campaignId}&r=${Math.floor(Math.random()*10000)}#${key}`}>
          {`${key} ${(key===this.props.currentEdition)? "(current)" : ""} `}
        </a>
        {(key===this.props.currentEdition)? null : (<span className="link delete" onClick={()=>this.onDelete(key)}><i className="ui icon delete"/></span>)}
      </li>
    ));

    return (
      <div>
        <h4><i className="ui icon save"/>Auto Save:</h4>
        {(this.stateSize < 100000)? null : <div>This page is too large for auto save.</div>}
        <ul>{saves}</ul>
      </div>
    );
  }
}