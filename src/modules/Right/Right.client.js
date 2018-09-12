import Right from "./Right";
import rootReducer from "./store/rootReducer";
import { initialize } from "./store/app/actions";
import clientHydration from "../../clientHydration";

clientHydration({
  moduleName: "Right",
  component: Right,
  rootReducer,
  initialize
});
