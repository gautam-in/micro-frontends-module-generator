import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";

// import Left from "./Left";
// import { configureStore } from "./store";
// import rootReducer from "./store/rootReducer";
// import { initialize } from "./store/app/actions";

export default ({
  moduleName,
  component: Component,
  configureStore,
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
