import React from "react";

export default class PagePreview extends React.Component{
  render(){
    if(this.props.source === ""){
      return (null);
    }

    return (
      <div>
        <iframe id="page-preview" ref={ iframe => iframe && iframe.contentWindow.document.write(this.props.source)}/>
      </div>
    );
  }
}