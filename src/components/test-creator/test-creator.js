import React from "react";

import { connect } from "react-redux";
import { compose } from "../../utils";
import { bindActionCreators } from "redux";

import TestConstructor from "../TestConstructor";
import PublisherContainer from "../publisher";
import "./test-creator.sass";

import { finalPublish, createNewTest } from "../../actions/creatorActions";
import withService from "../hoc/withService";

const TestCreator = ({ onFinalPublish, onNewTest, showPublisher }) => {
  const content = !showPublisher ? (
    <TestConstructor />
  ) : (
    <PublisherContainer
      //onBack={() => history.goBack()}
      onPublish={() => onFinalPublish()}
      onNewTest={onNewTest}
    />
  );

  return <div className="test-creator">{content}</div>;
};

const mapStateToProps = ({ testCreator: {}, testPublisher: { show } }) => {
  return { showPublisher: show };
};

const mapDispatchToProps = (dispatch, { service }) => {
  return bindActionCreators(
    {
      onFinalPublish: finalPublish(service)
      //onNewTest: createNewTest(history)
    },
    dispatch
  );
};

export default compose(
  withService,
  connect(mapStateToProps, mapDispatchToProps)
)(TestCreator);
