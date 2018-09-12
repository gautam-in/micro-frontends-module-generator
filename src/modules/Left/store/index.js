import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
import { createStore } from "redux-dynamic-reducer";
import rootReducer from "./rootReducer";

const configureStore = ({ initialState, middleware = [] } = {}) => {
  const devtools =
    typeof window !== "undefined" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

  const composeEnhancers = devtools || compose;

  const store = createStore(
    () => ({}),
    initialState,
    composeEnhancers(
      // createDynamix(),
      applyMiddleware(...[thunk].concat(...middleware))
    )
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./rootReducer", () =>
        store.replaceReducer(require("./rootReducer").default)
      );
    }
  }

  return store;
};

export { configureStore, rootReducer };
