import { ActionTypes } from "./constants";

export const insertTaskAction = task => ({
  type: ActionTypes.INSERT_TASK,
  task
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
