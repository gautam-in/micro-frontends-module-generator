// @flow
import { ActionTypes } from "./actions";

export const initialState = Object.freeze({
  label: "Left not clicked"
});

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case ActionTypes.INIT: {
      return {
        ...state,
        ...action.state.rightData
      };
    }
    case "app/set-right": {
      return {
        ...state,
        label: payload
      };
    }
  }

  return state;
};
