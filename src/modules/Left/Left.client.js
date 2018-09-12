import Left from "./Left";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";
import clientHydration from "../../clientHydration";

clientHydration({
  moduleName: "Left",
  component: Left,
  rootReducer,
  initialize
});
