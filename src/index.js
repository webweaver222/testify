import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./resources/vars.sass";
import "./resources/reset.sass";
import "./resources/main.sass";

import ErrorBoundry from "./components/error-boundry";
import { ServiceProvider } from "./components/service-provider";
import App from "./components/app";

import TestifyApi from "./services/testifyApi";
import store from "./store";

const history = createBrowserHistory({ basename: "/" });

const service = new TestifyApi();

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={service}>
        <Router history={history}>
          <App />
        </Router>
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);

import "./resources/media.sass";
