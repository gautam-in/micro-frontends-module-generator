// @flow
import { ActionTypes } from "./actions";

export const initialState = Object.freeze({
  label: "Right not clicked"
});

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case ActionTypes.INIT: {
      return {
        ...state,
        ...action.state.leftData
      };
    }
    case "app/set-left": {
      return {
        ...state,
        label: payload
      };
    }
  }

  return state;
};
