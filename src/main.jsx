import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalContextProvider } from "./context/useGlobalContext.jsx";
import  { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <Toaster/>
    <App />
  </GlobalContextProvider>
);
