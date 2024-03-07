import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
// import { AuthProvider } from "./context/AuthProvider.tsx";

axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        {/* <AuthProvider> */}
        <App />
        {/* </AuthProvider> */}
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
