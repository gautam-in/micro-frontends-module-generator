export const ActionTypes = {
  INIT: "app/init-left",
  SETRIGHT: "app/set-right"
};

export const initialize = state => ({
  type: ActionTypes.INIT,
  state
});

export const setRightAction = () => ({
  type: ActionTypes.SETRIGHT,
  payload: "Left Clicked"
});
