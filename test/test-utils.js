import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import { initState, reducer } from "../src/reducers";

function render(
  ui,
  {
    initialState = initState,
    store = createStore(reducer, initialState),
    ...options
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options
  });
}

export * from "@testing-library/react";

export { render };
