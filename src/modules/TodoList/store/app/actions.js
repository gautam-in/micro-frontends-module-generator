import { ActionTypes } from "./constants";

export const initialize = state => ({
  type: ActionTypes.INIT,
  state
});

export const removeTaskAction = taskId => ({
  type: ActionTypes.REMOVE_TASK,
  taskId
});

export const markTaskAction = (taskId, isDone) => ({
  type: ActionTypes.MARK_TASK,
  taskId,
  isDone
});
