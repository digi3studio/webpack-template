import React from "react";
import {connect} from "react-redux";
import Button from "./SimpleButton";
import PictureSelector from "./CloudinaryPictureUploader";

class IGVideoMaker extends React.Component{
  constructor(props){
    super(props);
    this.addPicture = this.addPicture.bind(this);
    this.onTransferComplete = this.onTransferComplete.bind(this);

    this.state = {
      list     : [<PictureSelector key={0} index={0} onTransferComplete={this.onTransferComplete}/>],
      uploaded : [],
      delay    : 1,
      loop     : 1,
    };
  }

  addPicture(){
    this.setState(
      {list: [...this.state.list, <PictureSelector key={this.state.list.length} index={this.state.list.length} onTransferComplete={this.onTransferComplete}/>]}
    );
  }

  onTransferComplete(index, value){
    let uploaded = [...this.state.uploaded];
    uploaded[index] = value.public_id;

    this.setState({uploaded: uploaded});
  }

  render(){
    let videoLink = "";

    if(this.state.uploaded.length > 0){
      const delay = this.state.delay;
      const loop  = this.state.loop;
      const count = this.state.uploaded.length;
      const duration = delay * count * loop;
      videoLink = 'http://res.cloudinary.com/hellocolin/video/upload/cs_srgb,vc_h264:high,q_auto:best,h_1080,w_1080,so_0,eo_' + duration;

      let so = 0;
      for(let j = 0; j < loop; j++){
        for(let i = 0; i < count; i++){
          const eo = so + delay;
          videoLink += '/l_' + this.state.uploaded[i] + ',so_' + so +',eo_' + eo +',w_1080,h_1080';
          so = eo;
        }
      }
      videoLink += '/30s.mp4';
    }

    const buttonVideo = (videoLink == "") ? "" : (
      <div className="ui button">
        <i className="icon file video outline"/>
        <a href={videoLink} target="_blank">Generate Video</a>
      </div>
    );

    return (
      <div>
        <div className="ui ordered steps">
          <div className="step">
            <i className="icon file image outline"/>
            <div className="content">
              <div className="title">Choose File</div>
              <div className="description">Choose Pictures</div>
            </div>
          </div>
          <div className="step">
            <i className="icon upload"/>
            <div className="content">
              <div className="title">Upload</div>
              <div className="description">Upload Pictures to cloudinary server</div>
            </div>
          </div>
          <div className="step">
            <i className="icon file video outline"/>
            <div className="content">
              <div className="title">Generate Video</div>
            </div>
          </div>
        </div>

        <div className="ui segments">
          {this.state.list}
          <div className="ui segment">
            <Button className="icon add square" label="Add Photo" onClick={this.addPicture}/>

            <div className="ui right labeled input">
              <div className="ui label" htmlFor="delay">delay</div>
              <input value={this.state.delay} onChange={e => this.setState({delay: e.target.value})} name="delay" type="number" step="0.1" min="0"/>
              <div className="ui basic label">second</div>
            </div>
            <div className="ui labeled input"><label className="ui label" htmlFor="loop" >loop</label><input  value={this.state.loop}  onChange={e => this.setState({loop:  e.target.value})} name="loop" type="number" min="1"/></div>
          </div>
        </div>
        {buttonVideo}
      </div>
    );
  }
}

export default connect(
  state => {
    return{
      hmr: state.hmr,
      hello: state.hello,
    };
  },
  dispatch => {return {
    onClick : () => {
      dispatch({type:"CHANGE_HELLO", payload:"click"});
    },
  }}
)(IGVideoMaker);
