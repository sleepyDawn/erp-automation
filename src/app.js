// install  => import => use
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import moment from "moment";

import AppRouter, { history } from "./routers/appRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import LoadingPage from "./components/LoadingPage";

// import "normalize.css/normalize.css";
// import "./styles/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-dates/initialize';
// import "react-dates/lib/css/_datepicker.css";

// import "./firebase/firebase";
// import { firebaseApp } from "./firebase/firebase";
import db from './firebase/firebase'; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { startSetPiSheetListData } from "./actions/piSheetListData";
import { startSetPISheetInfos } from "./actions/piSheetInfo";
import { startSetDrillingInfos } from "./actions/drillingInfo";
import { startSetLoadingInfos } from "./actions/loadingInfo";
import { startSetLoaadingHaulingInfos } from "./actions/loadingHaulingInfo";

// import "./playground/promises";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const rootElement = document.getElementById("app");

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, rootElement);
    hasRendered = true;
  }
}

ReactDOM.render(<LoadingPage></LoadingPage>, rootElement);

const setStore = async () => {

  try{
    await store.dispatch(startSetPiSheetListData());
    await store.dispatch(startSetPISheetInfos());
    await store.dispatch(startSetDrillingInfos());
    await store.dispatch(startSetLoadingInfos());
    await store.dispatch(startSetLoaadingHaulingInfos());

    // console.log("checking state while settig up initial data ", store.getState());
  } catch(e) {
    console.log(e);
  }
 
}

onAuthStateChanged(getAuth(), (user) => {
  if(user) {
    store.dispatch(login(user.uid))
    setStore().then(() => {
      // console.log("checking state while settig up initial data ", store.getState());
      renderApp();
      if(history.location.pathname === '/') {
        history.push('/dashboard')
      }
    })

  } else {
    store.dispatch(logout())
    renderApp();
    history.push('/');
  }
})



