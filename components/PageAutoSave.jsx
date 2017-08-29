import React from "react";

export default class PageAutoSave extends React.Component{
  constructor(props){
    super(props);

    this.state = Object.assign(this.state || {}, {
      urlBase : document.body.getAttribute('data-base'),
      storageKeys : Object.keys(localStorage).filter(key => /edition\d+/i.test(key))
    });

    this.removeAutoSave = this.removeAutoSave.bind(this);
  }

  removeAutoSave(keyToDelete){
    localStorage.removeItem(keyToDelete);
    this.setState({
      storageKeys: this.state.storageKeys.filter(key => key !== keyToDelete)
    })
  }

  render(){

    const saves = this.state.storageKeys.map(key => (
      <li key={key}>
        <a href={`${this.state.urlBase}admin/page/edit/${this.props.pageId}?campaign=${this.props.campaignId}&r=${Math.floor(Math.random()*10000)}#${key}`}>
          {`${key} ${(key===this.props.currentEdition)? "(current)" : ""} `}
        </a>
        {(key===this.props.currentEdition) ? null : (
          <span className="link delete" onClick={()=>this.removeAutoSave(key)}><i className="ui icon delete"/></span>
        )}
      </li>
    ));

    return (
      <div>
        <h4>Auto Save:</h4>
        <ul>{saves}</ul>
      </div>
    );
  }
}