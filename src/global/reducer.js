import { ActionTypes } from "./constants";
import { ActionTypes as AddTodoActionTypes } from "../modules/AddTodo/store/app/constants";
import { ActionTypes as TodoListActionTypes } from "../modules/TodoList/store/app/constants";

const initState = {
  todos: new Map([
    [
      123456,
      {
        id: 123456,
        label: "Initially added Todo.",
        done: true
      }
    ]
  ])
};

const insertTask = (state, { task }) => {
  const id = parseInt(Math.random() * 1000000);

  return {
    ...state,
    todos: new Map([
      ...state.todos.entries(),
      [
        id,
        {
          id,
          label: task
        }
      ]
    ])
  };
};

const removeTask = (state, { taskId }) => {
  delete state.todos.delete(taskId);
  return {
    ...state,
    todos: new Map([...state.todos.entries()])
  };
};

const markTask = (state, { taskId, isDone }) => {
  delete state.todos.set(taskId, { ...state.todos.get(taskId), done: isDone });
  return {
    ...state,
    todos: new Map([...state.todos.entries()])
  };
};

const globalData = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_GLOBAL_DATA: {
      return {
        ...state,
        ...action.state.globalData
      };
    }

    case AddTodoActionTypes.INSERT_TASK: {
      return insertTask(state, action);
    }

    case TodoListActionTypes.REMOVE_TASK: {
      return removeTask(state, action);
    }

    case TodoListActionTypes.MARK_TASK: {
      return markTask(state, action);
    }
  }

  return state;
};

export { ActionTypes };

export default globalData;
