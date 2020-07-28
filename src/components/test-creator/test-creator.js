import React from "react";

import { connect } from "react-redux";

import TestConstructor from "../TestConstructor";
import PublisherContainer from "../publisher";
import "./test-creator.sass";

const TestCreator = ({ onFinalPublish, onNewTest, showPublisher }) => {
  const content = !showPublisher ? (
    <TestConstructor />
  ) : (
    <PublisherContainer
      onPublish={() => onFinalPublish()}
      onNewTest={onNewTest}
    />
  );

  return <div className="test-creator">{content}</div>;
};

const mapStateToProps = ({ testCreator: {}, testPublisher: { show } }) => {
  return { showPublisher: show };
};

export default connect(mapStateToProps, null)(TestCreator);
