// @flow
import { ActionTypes } from "./constants";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_TODOLIST: {
      return {
        ...state,
        ...action.state.todoListData
      };
    }
  }

  return state;
};
