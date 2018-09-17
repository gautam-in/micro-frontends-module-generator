import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { SubspaceProvider } from "react-redux-subspace";

// import globalData from "./global/reducer";
// import { initialize as initializeGlobal } from "./global/actions";

export default ({ moduleName, component: Component, reducer, initialize }) => {
  const store =
    window.store ||
    configureStore({
      initialState: {},
      middleware: []
    });

  if (reducer) store.attachReducers({ [moduleName]: reducer });

  // if (!window.store) {
  //   store.attachReducers({ globalData });
  //   store.dispatch(
  //     initializeGlobal({
  //       globalData: window.__PRELOADED_STATE__[moduleName]["globalData"]
  //     })
  //   );
  // }

  if (initialize)
    store.dispatch(initialize(window.__PRELOADED_STATE__[moduleName]));

  hydrate(
    <Provider store={store}>
      <SubspaceProvider mapState={state => state[moduleName] || {}}>
        <Component />
      </SubspaceProvider>
    </Provider>,
    document.getElementById(moduleName)
  );

  window.store = store;
};
