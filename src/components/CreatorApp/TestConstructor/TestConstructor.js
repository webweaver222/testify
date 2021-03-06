import React, { useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import { bindActionCreators } from "redux";

import TestCreatorMain from "components/CreatorApp/TestCreatorMain";
import {
  CreatorQuestion,
  withAnswers,
} from "components/elements/question/question-hocs";
import Question from "components/elements/question";
import QuestionPool from "components/CreatorApp/QuestionPool";
import { withApi } from "components/hoc/withService";

import "./testConstructor.sass";
import { toPrePublish } from "actions/TestPublisher";

const TestConstructor = ({
  questions,
  active,
  publishTest,
  deleteConfirm,
  onDeleteCondirm,
  onDeleteReject,
}) => {
  const question = questions.find((q) => q.id === active);

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

  const CQuestion = useCallback(
    compose(CreatorQuestion, withAnswers)(Question),
    []
  );

  return (
    <div className="test-constructor">
      {confirmBlock}
      {shading}
      <div className="left">
        <TestCreatorMain onPublishTest={publishTest} />
        <CQuestion question={question} />
      </div>
      <div className="right section-block">
        <QuestionPool questions={questions} />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  testCreator: { questions, active, deleteConfirm },
}) => {
  return {
    questions,
    active,
    deleteConfirm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      publishTest: () => dispatch(toPrePublish),
      onDeleteCondirm: () => dispatch("DELETE_QUESTIONS_CONFIRM"),
      onDeleteReject: () => dispatch("DELETE_QUESTIONS_REJECT"),
    },
    dispatch
  );
};

export default compose(
  withApi,
  connect(mapStateToProps, mapDispatchToProps)
)(TestConstructor);
