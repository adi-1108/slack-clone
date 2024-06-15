import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Signup from "./pages/Signup.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>,
);
