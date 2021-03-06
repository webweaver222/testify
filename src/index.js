import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./resources/vars.sass";
import "./resources/reset.sass";
import "./resources/main.sass";

import ErrorBoundry from "components/elements/error-boundry";
import { ServiceProvider } from "components/elements/service-provider";

import TestifyApi from "./services/testifyApi";
import io from "socket.io-client";
import store from "./store";

import Routing from "components/router.js";

const history = createBrowserHistory({ basename: "/" });

const container = {
  api: new TestifyApi("http://localhost:3000"),
  socket: io.connect("http://localhost:3000"),
};

ReactDom.render(
  <Provider store={store}>
    <ErrorBoundry>
      <ServiceProvider value={container}>
        <Router history={history}>
          <Routing />
        </Router>
      </ServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);

import "./resources/media.sass";
