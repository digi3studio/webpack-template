import React from "react";

export default class PageAutoSave extends React.Component{
  constructor(props){
    super(props);

    this.state = Object.assign(this.state || {}, {
      urlBase : document.body.getAttribute('data-base'),
      storageKey: this.props.currentEdition,
    });

    this.onDelete = this.onDelete.bind(this);
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

  render(){
    const format = new RegExp(`edition${this.props.pageId}:`, 'i');
    const storageKeys = Object.keys(localStorage).filter(key => /edition\d*:\d+/i.test(key));
    const saves = storageKeys.map(key => !format.test(key) ? null : (
      <li key={key}>
        <a href={`${this.state.urlBase}admin/page/edit/${this.props.pageId}?campaign=${this.props.campaignId}&r=${Math.floor(Math.random()*10000)}#${key}`}>
          {`${key} ${(key===this.props.currentEdition)? "(current)" : ""} `}
        </a>
        <span className="link delete" onClick={()=>this.onDelete(key)}><i className="ui icon delete"/></span>
      </li>
    ));

    return (
      <div>
        <h4><i className="ui icon save"/>Auto Save:</h4>
        <ul>{saves}</ul>
      </div>
    );
  }
}