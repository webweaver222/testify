import React, { useEffect } from "react";
import { useDidMountEffect } from "components/customHooks/index.js";

import { getResults } from "actions/Results";
import { compose } from "utils";
import { withApi } from "components/hoc/withService";

import { connect } from "react-redux";
import "./TestResults.sass";

import ErrorIndicator from "components/elements/error-indicator";
import Preloader from "components/elements/preloader";

const TestResults = ({ document, match, onMount, fetching, error }) => {
  useEffect(() => {
    console.log(match.params.id);
    onMount(match.params.id);
  }, []);

  const content = fetching ? (
    <Preloader height={221} width={221} color={"#FF4656"} />
  ) : error ? (
    <ErrorIndicator message={error} type="error" />
  ) : (
    <iframe srcDoc={document}></iframe>
  );

  return <div className="TestResultsWrapper">{content}</div>;
};

const mapStateToProps = ({ testResults: { document, fetching, error } }) => ({
  document,
  fetching,
  error,
});

const mapDispatchToProps = (dispatch, { service }) => ({
  onMount: (id) => dispatch(getResults(service)(id)),
});

export default compose(
  withApi,
  connect(mapStateToProps, mapDispatchToProps)
)(TestResults);
