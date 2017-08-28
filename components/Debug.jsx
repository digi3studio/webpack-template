import React from "react";

export default class Debug extends React.Component{
  render(){
    let json = Object.assign({}, this.props.state);

    delete json.pagetype;
    delete json.hmr;
    delete json.campaign_name;
    delete json.campaign_shortname;
    delete json.campaign_id;
    delete json.session_id;
    delete json.languages;

    return (<div className="debugger">
      {JSON.stringify(json)}
    </div>)
  }
}