import React from "react";

export default class PageAutoSave extends React.Component{
  constructor(props){
    super(props);

    this.state = Object.assign(this.state || {}, {
      urlBase : document.body.getAttribute('data-base'),
      storageKey: this.props.currentEdition,
    });

    this.onDelete = this.onDelete.bind(this);
    this.onAutoSave = this.onAutoSave.bind(this);
    this.stateSize = 0;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.pageId !== this.props.pageId){
      setTimeout(()=>{
        this.setState({
          storageKey : this.props.currentEdition,
        })
      }, 100);
    }
  }

  onDelete(keyToDelete){
    localStorage.removeItem(keyToDelete);
    this.setState({
      storageKey: this.props.currentEdition,
    })
  }

  onAutoSave(){
    const autosave = JSON.stringify(this.props.state);
    this.stateSize = autosave.length;

    if(this.stateSize > 100000){
      return;
    }
    try{
      localStorage.setItem(this.props.currentEdition, autosave);
    }catch(ex){
      alert(ex);
    }
  }

  render(){
    this.onAutoSave();

    const format = new RegExp(`edition${this.props.pageId}:`, 'i');
    const storageKeys = Object.keys(localStorage).filter(key => /edition\d*:\d+/i.test(key));
    const saves = storageKeys.map(key => !format.test(key) ? null : (
      <li key={key}>
        <a href={`${this.state.urlBase}admin/page/edit/${this.props.pageId}?campaign=${this.props.campaignId}&r=${Math.floor(Math.random()*10000)}#${key}`}>
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