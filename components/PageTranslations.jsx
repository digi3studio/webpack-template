import React from "react";

export default class PageTranslations extends React.Component{
  onClick(language){
    this.props.onChange(language);
  }

  render(){

    let languages = this.props.languages.map(language => {
      let cssClass = [];
      if(language == this.props.master)cssClass.push("master");
      if(language == this.props.current)cssClass.push("active");

      return (<li key={language} className={cssClass.join(" ")} onClick={()=>this.onClick(language)}>{language}</li>)
    });

    return (
      <div id="translations">
        <div className="column">
          <div className="ui right pointing label inverted theme">Translation</div>
        </div>
        <div className="column">
          <ul className="box">{languages}</ul>
        </div>


      </div>
    );
  }
}