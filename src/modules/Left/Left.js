import React from "react";
import { connect } from "react-redux";

import "./Left.css";
import { setRightAction } from "./store/app/actions";

const Left = ({ label, setRight }) => (
  <div className="left">
    {label}
    <button type="button" onClick={setRight}>
      Alert
    </button>
  </div>
);

const mapStateToProps = state => {
  return {
    label: state.Left.leftData.label
  };
};

const mapDispatchToProps = dispatch => ({
  setRight: () => dispatch(setRightAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Left);
