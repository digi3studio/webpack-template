import React from "react";
import Button from "./SimpleButton";

export default class CloudinaryPictureUploader extends React.Component{
  constructor(props){
    super(props);
    this.onFileSelect       = this.onFileSelect.bind(this);
    this.onUpload           = this.onUpload.bind(this);
    this.onTransferComplete = this.onTransferComplete.bind(this);
    this.onUploadProgress   = this.onUploadProgress.bind(this);
    this.state = {fileData : "", loading : false, progress : 0, uploadedID : ""};
  }

  onFileSelect(){
    const input = this.refs.file;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = e => this.setState({fileData : e.target.result});
      reader.readAsDataURL(input.files[0]);
    }
  }

  onUploadProgress(e){
    if (e.lengthComputable) {
      const value = Math.floor((e.loaded / e.total) * 100);
      console.log(value);
      this.setState({ progress : value});
    }
  }

  onTransferComplete(e){
    const response = e.target.response;
    this.props.onTransferComplete(this.props.index, response);

    this.setState({
      loading: false,
      uploadedID: response.public_id,
    });
  }

  onUpload(){
    const formData = new FormData();
    formData.append("upload_preset", "thllmprh");
    formData.append("file", this.refs.file.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener('load', this.onTransferComplete);
    xhr.upload.addEventListener('progress', this.onUploadProgress);

    xhr.open("POST", "//api.cloudinary.com/v1_1/hellocolin/upload");
    xhr.send(formData);

    this.setState({loading : true});
  }

  render(){
    if(this.state.uploadedID != ""){
      return (
        <div className="ui vertical segment">
          <div className="image-uploader">
            uploaded image ID: {this.state.uploadedID}
          </div>
        </div>
      );
    }

    return (
      <div className={"ui vertical segment" + (this.state.loading ? " loading": "")}>
        <div className="image-uploader">
          <input ref="file" name="file[]" type="file" onChange={this.onFileSelect}/>
          {(this.state.fileData == "") ? "" : (
            <div className="image-preview">
              <img src={this.state.fileData} />
              <Button className="icon upload" onClick={this.onUpload} label="upload"/>
            </div>
          )}
          {(this.state.progress <= 0)? "" :(
            <div className="progress">{this.state.progress}%</div>
          )}
        </div>
      </div>);
  }
}