import React from "react";
import { connect } from "react-redux";
import ExecutionEnvironment from "exenv";

import "./TodoList.css";
import { removeTaskAction, markTaskAction } from "./store/app/actions";
import clientHydration from "../../clientHydration";
import reducer from "./store/app/reducer";
import { initialize } from "./store/app/actions";
import Todo from "./components/Todo";
import { ActionTypes } from "./store/app/constants";

class TodoList extends React.Component {
  componentWillMount() {
    const { todos } = this.props;
    this.setState({
      todos: todos.reduce((accu, curr) => accu.set(curr["id"], curr), new Map())
    });
  }

  componentWillReceiveProps(nextProps) {
    const { todos } = nextProps;
    this.setState({
      todos: todos.reduce((accu, curr) => accu.set(curr["id"], curr), new Map())
    });
  }

  render() {
    const { removeTask, markTask } = this.props;
    const { todos } = this.state;

    return (
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
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
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

export { reducer };

export { ActionTypes };

if (ExecutionEnvironment.canUseDOM) {
  clientHydration({
    moduleName: "TodoList",
    component: connectedTodoList,
    reducer,
    initialize
  });
}
