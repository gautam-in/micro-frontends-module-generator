import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import "./Right.css";
import { setLeftAction } from "./store/app/actions";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";
import clientHydration from "../../clientHydration";

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

const connectedRight = connect(
  mapStateToProps,
  mapDispatchToProps
)(Right);

export default connectedRight;

export { rootReducer };

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "Right",
    component: connectedRight,
    rootReducer,
    initialize
  });
}
