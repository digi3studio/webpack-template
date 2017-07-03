import React from "react";
import {connect} from "react-redux";
import blobStream from "blob-stream";
import PDFDocument from "pdfkit";

class PdfEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {pdf : null};
  }

  drawPDF(){
    const doc = new PDFDocument;
    const stream = doc.pipe(blobStream());

    doc.save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill("#FF3300");

    doc.end();

    stream.on ('finish', () => {
      this.setState({pdf: stream.toBlobURL('application/pdf')});
    });
  }

  render(){
    return (<div>
      <div className="ui button" onClick={e => this.drawPDF()}>Write PDF > </div>
      {(this.state.pdf != null) ? <iframe src={this.state.pdf}/> : '' }
    </div>);
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
    };
  },
  dispatch => {return {
    onClick : () => {
    },
  }}
)(PdfEditor);