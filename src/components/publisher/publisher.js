import React from "react";
import { connect } from "react-redux";

import ErrorIndicator from "../error-indicator";
import Preloader from "../preloader";

const Publisher = ({ render, fetching, error }) => {
  const preloader = fetching ? (
    <Preloader height={15} width={15} color={"#FF4656"} />
  ) : null;

  const errorBlock = error ? (
    <div className="error-block">
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
      {error}
      <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
    </div>
  ) : null;

  return (
    <div className="publisher section-block">
      {render(preloader, errorBlock)}
      {errorBlock}
    </div>
  );
};

export default connect(({ testPublisher: { fetching, error } }) => {
  return {
    fetching,
    error
  };
}, null)(Publisher);
