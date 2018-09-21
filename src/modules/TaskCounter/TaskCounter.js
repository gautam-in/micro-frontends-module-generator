import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import clientHydration from "../../clientHydration";
import "./TaskCounter.css";

const TaskCounter = ({ todos }) => {
  return (
    <div>
      <h4>Total Tasks:</h4>
      <p className="display-3 text-center count">
        {todos ? todos.length : null}
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  if (state.rootState.TodoList) {
    return { todos: state.rootState.TodoList.todos };
  }
  return {};
};

const connectedTaskCounter = connect(mapStateToProps)(TaskCounter);

export default connectedTaskCounter;

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "TaskCounter",
    component: connectedTaskCounter
  });
}
