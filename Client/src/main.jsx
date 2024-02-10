import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { reducers } from "./Reducers/Index.js";
import { BrowserRouter } from "react-router-dom";
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
    clientId="1084705378169-283sfrbmu2ngt2l771jjn69s8ikl5nmc.apps.googleusercontent.com"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
