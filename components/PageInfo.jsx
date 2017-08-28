import React from "react";
import {FieldUtils, FieldType} from "./utils/FieldUtils";

export default class PageInfo extends React.Component{
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);

    this.scheme = [
      {id:"name",                  name:"Name",         type:FieldType.DISABLE,  option:"64"},
      {id:"shortname",             name:"URL",          type:FieldType.TEXT,     option:"64"},
      {id:"parent_id",             name:"Parent Page",  type:FieldType.DISABLE,  option:"64"},
      {id:"publish_start_date",    name:"Publish Date", type:FieldType.DATE,     option:""},
      {id:"publish_end_date",      name:"Expire Date",  type:FieldType.DATE,     option:""},
      {id:"hide",                  name:"Hide",         type:FieldType.BOOLEAN,  option:""},
      {id:"share",                 name:"Allow Share",  type:FieldType.BOOLEAN,  option:""},
      {id:"member",                name:"Members Only", type:FieldType.BOOLEAN,  option:""},
    ];
  }

  onChange(name, value){
    this.props.onChange(name, value, "");
  }

  render(){
    const values = {
      "name"               : this.props.page.name,
      "shortname"          : this.props.page.shortname,
      "parent_id"          : this.props.page.parent_id,
      "publish_start_date" : this.props.page.publish_start_date,
      "publish_end_date"   : this.props.page.publish_end_date,
      "hide"               : this.props.page.hide || 0,
      "share"              : this.props.page.share || 1,
      "member"             : this.props.page.member || 0,
    };

    const fields = this.scheme.map(field => FieldUtils.renderField("", field, values, values, this.onChange));

    return (
      <ul className="box">
        {fields}
      </ul>
    )
  }
}