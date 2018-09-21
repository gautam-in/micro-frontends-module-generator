import React from "react";
import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import { SubspaceProvider } from "react-redux-subspace";
import { namespaced, namespacedAction } from "redux-subspace";

// import globalData from "./global/reducer";
// import { initialize as initializeGlobal } from "./global/actions";

export default ({ moduleName, component: Component, reducer, initialize }) => {
  const store =
    window.store ||
    configureStore({
      initialState: {},
      middleware: []
    });

  if (reducer)
    store.attachReducers({ [moduleName]: namespaced(moduleName)(reducer) });

  // if (!window.store) {
  //   store.attachReducers({ globalData });
  //   store.dispatch(
  //     initializeGlobal({
  //       globalData: window.__PRELOADED_STATE__[moduleName]["globalData"]
  //     })
  //   );
  // }

  if (initialize)
    store.dispatch(
      namespacedAction(moduleName)(
        initialize(window.__PRELOADED_STATE__[moduleName])
      )
    );

  const renderFunction = document.getElementById(moduleName).innerHTML
    ? hydrate
    : render;

  renderFunction(
    <Provider store={store}>
      <SubspaceProvider
        mapState={state => ({ ...state[moduleName], rootState: state } || {})}
        namespace={moduleName}
      >
        <Component />
      </SubspaceProvider>
    </Provider>,
    document.getElementById(moduleName)
  );

  window.store = store;
};
