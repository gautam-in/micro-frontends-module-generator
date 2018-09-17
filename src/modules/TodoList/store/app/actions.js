import { ActionTypes } from "./constants";

export const initialize = state => ({
  type: ActionTypes.INIT,
  state
});
