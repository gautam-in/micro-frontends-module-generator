import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Left from "./Left";
import { configureStore } from "./store";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";

const store =
  window.store ||
  configureStore({
    initialState: {},
    middleware: []
  });

store.attachReducers({ Left: rootReducer });

store.dispatch(initialize(window.__PRELOADED_STATE__.Left));

hydrate(
  <Provider store={store}>
    <Router>
      <Left />
    </Router>
  </Provider>,
  document.getElementById("Left")
);

// if (process.env.NODE_ENV !== "production") {
if (module.hot) {
  module.hot.accept();
}

window.store = store;
// }
