import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import globalData from "./global/reducer";
import { initialize as initializeGlobal } from "./global/actions";

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

  if (rootReducer) store.attachReducers({ [moduleName]: rootReducer });

  if (!window.store) {
    store.attachReducers({ globalData });
    store.dispatch(
      initializeGlobal(window.__PRELOADED_STATE__[moduleName]["globalData"])
    );
  }

  if (initialize)
    store.dispatch(initialize(window.__PRELOADED_STATE__[moduleName]));

  hydrate(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById(moduleName)
  );

  window.store = store;
};
