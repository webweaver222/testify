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
import WebSocket from "./services/ws";
import store from "./store";

import Routing from "components/router.js";

const history = createBrowserHistory({ basename: "testify" });

const container = {
  api: new TestifyApi(`${location.protocol}//${location.hostname}/testifyapi`),
  socket: new WebSocket(`${location.protocol}//${location.hostname}`, {
    path: "/testifyapi/socket.io",
  }),
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
