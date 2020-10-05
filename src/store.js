import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducer } from "./reducers";

const stringMdw = () => dispatch => action => {
  if (typeof action === "string") {
    //console.log(action);
    return dispatch({
      type: action
    });
  }
  //console.log(action.type);
  return dispatch(action);
};

export const middlewares = [thunk, stringMdw];

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
