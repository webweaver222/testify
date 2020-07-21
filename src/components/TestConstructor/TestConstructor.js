import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TestCreatorMain from "../test-creator-main";
import Question from "../question";
import QuestionPool from "../question-pool";

import "./testConstructor.sass";

const TestConstructor = ({ questions, active, publishTest }) => {
  const question = questions.find(q => q.id === active);

  return (
    <div className="test-constructor">
      <div className="left">
        <TestCreatorMain onPublishTest={publishTest} />
        <Question question={question} />
      </div>
      <div className="right section-block">
        <QuestionPool questions={questions} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ testCreator: { questions, active } }) => {
  return {
    questions,
    active
  };
};

const mapDispatchToProps = (dispatch, {}) => {
  return bindActionCreators(
    {
      publishTest: () => dispatch("CLICK_PUBLISH_TEST")
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TestConstructor);
