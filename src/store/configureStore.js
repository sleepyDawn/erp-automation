import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import authReducer from "../reducers/auth";
import authReducer from '../reducers/auth';
import drillingInfosReducer from "../reducers/drillingInfos";
import piSheetInfoReducder from "../reducers/piSheetInfo";
import piSheetListDataReducer from "../reducers/piSheetListData";
import loadingInfosReducer from "../reducers/loadingInfos";
import loadingHaulingInfosReducer from "../reducers/loadingHaulingInfos";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // Store Creation
  const store = createStore(
    combineReducers({
      piSheetInfos: piSheetInfoReducder,
      drillingInfos: drillingInfosReducer,
      loadingInfos: loadingInfosReducer,
      loadingHaulingInfos: loadingHaulingInfosReducer,
      piSheetListData: piSheetListDataReducer,
      auth: authReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
