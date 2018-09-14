import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import "./TodoList.css";
import { removeTaskAction, markTaskAction } from "./store/app/actions";
import clientHydration from "../../clientHydration";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";
import globalData from "../../global/reducer";
import Todo from "./components/Todo";

const TodoList = ({ todos, removeTask, markTask }) => (
  <div className="todo-list">
    <h4>Tasks</h4>
    {todos.size ? (
      <ul className="list-group">
        {Array.from(todos.entries()).map(([id, task]) => (
          <Todo
            key={id}
            task={task}
            onRemoveClick={removeTask}
            onTaskClick={markTask}
          />
        ))}
      </ul>
    ) : (
      <p className="text-center">No task added yet.</p>
    )}
  </div>
);

const mapStateToProps = state => {
  return {
    todos: state.globalData.todos
  };
};

const mapDispatchToProps = dispatch => ({
  removeTask: taskId => {
    dispatch(removeTaskAction(taskId));
  },
  markTask: (taskId, isDone) => {
    dispatch(markTaskAction(taskId, isDone));
  }
});

const connectedTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default connectedTodoList;

export { rootReducer };

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "TodoList",
    component: connectedTodoList,
    rootReducer,
    initialize
  });
}
