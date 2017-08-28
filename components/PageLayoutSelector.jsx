import React from "react";
import {FieldType, FieldUtils} from "./utils/FieldUtils";

export default class PageLayoutSelector extends React.Component{
  constructor(props){
    super(props);

    const typeNames = this.props.scheme.map(type => `${type.id}:${type.name}`);

    this.scheme = [
      {id:"pagetype_id", name:"Type",   type:FieldType.ENUM,   option:typeNames.join(',')},
    ];

    this.onChange = this.onChange.bind(this);
  }

  onChange(name, value){
    if(value === "")value = 0;
    this.props.onChange(name, value, "");
  }

  render(){
    const values = {
      "pagetype_id" : this.props.selectedType,
      "layout_id"   : this.props.selectedLayout || 0,
    };

    let layoutCounts = {};
    this.props.scheme.forEach(type => layoutCounts[`type${type.id}`] = parseInt(type.layout_count));
    let layoutCount = layoutCounts[`type${this.props.selectedType}`];

    if(layoutCount <= 1){
      return null;
    }

    return (
      <div className="ui segment inverted">
        <h4><i className="icon setting"/>Page Style Settings</h4>
        <div>
          <div className="ui input labeled">
            <div className="ui label">Layout</div>
            <input type="number" min="0" max={layoutCount-1} value={this.props.selectedLayout} onChange={e => this.onChange("layout_id", e.target.value)}/>
          </div>
        </div>
      </div>
    );
  }
}