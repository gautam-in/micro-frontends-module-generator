import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import "./Left.css";
import { setRightAction } from "./store/app/actions";
import clientHydration from "../../clientHydration";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";

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

const connectedLeft = connect(
  mapStateToProps,
  mapDispatchToProps
)(Left);

export default connectedLeft;

export { rootReducer };

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "Left",
    component: connectedLeft,
    rootReducer,
    initialize
  });
}
