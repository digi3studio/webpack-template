import React from "react";

export default class PageInfo extends React.Component{
  render(){
    const containerCSS = "ui labeled fluid input";

    return (
      <div id="page-info">
        <h3><i className="icon setting"/>Settings</h3>
        <ul className="box">
          <Disabled className={containerCSS}>
            <label className="ui label">name</label>
            <input type="text" defaultValue={this.props.page.name || ""} onChange={this.props.on}/>
          </Disabled>

          <li className={`${containerCSS} icon`}>
            <label className="ui label">url</label>
            <input type="text" defaultValue={this.props.page.shortname || ""} />
            <i className="icon linkify"/>
          </li>

          <Disabled className={containerCSS}>
            <label className="ui label">parent page</label>
            <input type="text" defaultValue={this.props.page.parent_id || ""} />
          </Disabled>

          <li className={containerCSS}>
            <label className="ui label">pubish date</label>
            <input type="date" defaultValue={this.props.page.publish_start_date || ""} />
          </li>

          <li className={containerCSS}>
            <label className="ui label">expire date</label>
            <input type="date" defaultValue={this.props.page.publish_end_date || ""} />
          </li>

          <li>
            <FieldBoolean value={this.props.page.hide || 0}   label="Hide" name="hide"/>
            <FieldBoolean value={this.props.page.share || 1}  label="Allow Share" name="share"/>
            <FieldBoolean value={this.props.page.member || 0} label="Members Only" name="member"/>
          </li>
        </ul>
        <hr />
      </div>
    )
  }
}

class FieldBoolean extends React.Component{
  render(){
    return (
      <div className="ui checkbox">
        <input id={this.props.name} name={this.props.name} type="checkbox" defaultChecked={this.props.value == 1}/>
        <label htmlFor={this.props.name}>{this.props.label}</label>
      </div>
    );
  }
}

class Disabled extends React.Component{
  render(){
    return null;
  }
}