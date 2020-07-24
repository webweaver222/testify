import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TestCreatorMain from "../test-creator-main";
import Question from "../question";
import QuestionPool from "../question-pool";

import "./testConstructor.sass";

const TestConstructor = ({
  questions,
  active,
  publishTest,
  deleteConfirm,
  onDeleteCondirm,
  onDeleteReject
}) => {
  const question = questions.find(q => q.id === active);

  const confirmBlock = deleteConfirm ? (
    <div className="delete-confirm">
      <h3>Delete all questions?</h3>
      <div className="options">
        <button onClick={onDeleteCondirm}>Yes</button>
        <button onClick={onDeleteReject}>No</button>
      </div>
    </div>
  ) : null;

  const shading = deleteConfirm ? <div className="shading"></div> : null;

  return (
    <div className="test-constructor">
      {confirmBlock}
      {shading}
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

const mapStateToProps = ({
  testCreator: { questions, active, deleteConfirm }
}) => {
  return {
    questions,
    active,
    deleteConfirm
  };
};

const mapDispatchToProps = (dispatch, {}) => {
  return bindActionCreators(
    {
      publishTest: () => dispatch("CLICK_PUBLISH_TEST"),
      onDeleteCondirm: () => dispatch("DELETE_QUESTIONS_CONFIRM"),
      onDeleteReject: () => dispatch("DELETE_QUESTIONS_REJECT")
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TestConstructor);
