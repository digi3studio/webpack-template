import React from "react";

export default class PageTypeSelector extends React.Component{
  render(){
    let types = this.props.pagetypes.map((type) => {
      return (
        <li key={type.name} className="ui card">
          <div className="image"><img /></div>
          <div className="content">{type.name}</div>
        </li>
      )
    });

    return (
      <div>
        <h4>Page Style</h4>
        <ul className="ui three doubling cards">{types}</ul>

        <div>
          <div>{this.props.selected.type}</div>
          <div>{this.props.selected.layout}</div>
        </div>
      </div>
    );
  }
}