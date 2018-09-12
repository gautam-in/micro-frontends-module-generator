import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Right from "./Right";
import { configureStore } from "./store";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";

const store =
  window.store ||
  configureStore({
    initialState: {},
    middleware: []
  });

store.attachReducers({ Right: rootReducer });

store.dispatch(initialize(window.__PRELOADED_STATE__.Right));

hydrate(
  <Provider store={store}>
    <Router>
      <Right />
    </Router>
  </Provider>,
  document.getElementById("Right")
);

// if (process.env.NODE_ENV === "development") {
if (module.hot) {
  module.hot.accept();
}
window.store = store;
// }
