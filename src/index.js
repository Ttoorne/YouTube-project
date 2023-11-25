import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./contexts/ProductContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";
import { Provider } from "react-redux";
import store from "./contexts/store";
import FormattedContextProvider from "./contexts/FormattedContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store={store}>
          <ProductContextProvider>
            <FormattedContextProvider>
              <App />
            </FormattedContextProvider>
          </ProductContextProvider>
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
