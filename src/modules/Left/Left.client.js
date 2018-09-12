import Left from "./Left";
import { configureStore } from "./store";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";
import clientHydration from "../../clientHydration";

clientHydration({
  moduleName: "Left",
  component: Left,
  configureStore,
  rootReducer,
  initialize
});
