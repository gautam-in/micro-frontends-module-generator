import React from "react";
import { connect } from "react-redux";

import "./Right.css";
import { setLeftAction } from "./store/app/actions";

const Right = ({ label, setLeft }) => (
  <div className="left">
    {label}
    <button type="button" onClick={setLeft}>
      Alert
    </button>
  </div>
);

const mapStateToProps = state => {
  return {
    label: state.Right.rightData.label
  };
};

const mapDispatchToProps = dispatch => ({
  setLeft: () => dispatch(setLeftAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Right);
