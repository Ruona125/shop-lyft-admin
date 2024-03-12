import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import store, { persistor } from "./redux/store.jsx";
import {store, persistor} from "./Redux/Store.jsx"
import App from "./App.jsx";
import "./index.css";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <NavbarComponent />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
