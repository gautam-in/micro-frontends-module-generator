import { ActionTypes } from "./constants";
import { ActionTypes as AddTodoActionTypes } from "../../../AddTodo/store/app/constants";

const initState = {
  todos: []
};

const insertTask = (state, { task }) => {
  const id = parseInt(Math.random() * 1000000);

  return {
    ...state,
    todos: [
      ...state.todos,
      {
        id,
        label: task,
        done: false
      }
    ]
  };
};

const removeTask = (state, { taskId }) => {
  return {
    ...state,
    todos: [...state.todos.filter(val => val.id !== taskId)]
  };
};

const markTask = (state, { taskId, isDone }) => {
  state.todos.forEach(val => {
    if (val.id === taskId) {
      val.done = isDone;
    }
  });
  return {
    ...state,
    todos: [...state.todos]
  };
};

const todoListData = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.INIT: {
      return {
        ...state,
        ...action.state.TodoList
      };
    }

    case ActionTypes.REMOVE_TASK: {
      return removeTask(state, action);
    }

    case ActionTypes.MARK_TASK: {
      return markTask(state, action);
    }

    case AddTodoActionTypes.INSERT_TASK: {
      return insertTask(state, action);
    }
  }

  return state;
};

export default todoListData;
