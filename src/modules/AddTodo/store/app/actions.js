import { ActionTypes } from "./constants";

export const insertTaskAction = task => ({
  type: ActionTypes.INSERT_TASK,
  task
});
