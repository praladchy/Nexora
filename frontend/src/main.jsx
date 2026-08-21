import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { persistor, store } from "./redux/store.jsx";

import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./service/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
