import React from "react";
import { ServiceProvider } from "../src/components/service-provider";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { middlewares } from "../src/store";
import { initState, reducer } from "../src/reducers";
import service from "./api-mock";

function render(
  ui,
  {
    initialState = initState,
    store = createStore(reducer, initialState, applyMiddleware(...middlewares)),
    ...options
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ServiceProvider value={service}>
          <Router>{children}</Router>
        </ServiceProvider>
      </Provider>
    );
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options
  });
}

const testStore = (initialState = initState) => {
  const createStoreWithMdw = applyMiddleware(...middlewares)(createStore);
  return createStoreWithMdw(reducer, initialState);
};

export * from "@testing-library/react";

export { render, testStore };
