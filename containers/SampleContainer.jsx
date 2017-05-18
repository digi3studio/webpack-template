import {connect} from "react-redux";
import Sample from "../components/Sample";

const SampleContainer = connect(
  state => {
    return{
      hello: state.hello,
    };
  },
  dispatch => {return {
    onClick : () => {
      dispatch({type:"CHANGE_HELLO", value:"click"});
    },
  }}
)(Sample);

export default SampleContainer;