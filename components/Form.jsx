import React from "react";

export default class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading : false,
      urlBase : document.body.getAttribute('data-base')
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onResult = this.onResult.bind(this);
    this.post = this.post.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    const postData = new FormData(e.target);
    this.post(postData);
  }

  post(postData, action){
    this.setState({isLoading : true});
    fetch(
      this.state.urlBase + (action || this.props.action || this.state.action) + '.json', {
        credentials: "same-origin",
        method: 'post',
        body: postData
      })
      .then((response) => response.json())
      .then((data)=> {
        this.setState({isLoading: false});
        this.onResult(data);
      });
  }

  onResult(data){
    this.setState({
      error: null,
      isLoading: false
    });

    if(data.status === 'success'){
      if(this.props.onResultSuccess !== null)this.props.onResultSuccess(data);
    }else{
      if(this.props.onResultError !== null)this.props.onResultError(data);

      this.setState({
        error: data.code + data.info.message
      });

      clearTimeout(this.iid);
      this.iid = setTimeout(()=>{this.setState({error:''})}, 4000);
    }
  }
}
