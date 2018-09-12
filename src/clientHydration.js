import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

export default ({
  moduleName,
  component: Component,
  rootReducer,
  initialize
}) => {
  const store =
    window.store ||
    configureStore({
      initialState: {},
      middleware: []
    });

  store.attachReducers({ [moduleName]: rootReducer });

  store.dispatch(initialize(window.__PRELOADED_STATE__[moduleName]));

  hydrate(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById(moduleName)
  );

  window.store = store;
};
