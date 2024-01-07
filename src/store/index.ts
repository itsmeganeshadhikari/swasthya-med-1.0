import { createStore } from "redux";
import { persistStore } from "redux-persist";
import reducer from "./reducer";

// ==============================|| REDUX - MAIN STORE ||============================== //

const store: any = createStore(reducer);
const persister = persistStore(store);

export { store, persister };
