export const ActionTypes = {
  INIT: "app/init-right",
  SETLEFT: "app/set-left"
};

export const initialize = state => ({
  type: ActionTypes.INIT,
  state
});

export const setLeftAction = () => ({
  type: ActionTypes.SETLEFT,
  payload: "Right clicked"
});
