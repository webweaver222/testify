import React, { useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "utils";
import { bindActionCreators } from "redux";

import "./test-room.sass";

import { selectInField } from "actions/Exam";
import Question from "components/elements/question";
import {
  ExamQuestion,
  withAnswers,
} from "components/elements/question/question-hocs";
import QuestionsField from "components/ExamApp/QuestionsField";
import Timer from "components/ExamApp/timer";
import Preloader from "components/elements/preloader";
import ErrorIndicator from "components/elements/error-indicator";

const TestRoom = ({
  test,
  current,
  onSelectField,
  onPreSend,
  fetching,
  error,
}) => {
  const question = test.questions[current];

  const EQuestion = useCallback(
    compose(ExamQuestion, withAnswers)(Question),
    []
  );

  const content = fetching ? (
    <Preloader width={200} height={200} color={"#FF4656"} />
  ) : error ? (
    <ErrorIndicator message={error} type="error" />
  ) : (
    <>
      <QuestionsField onSelectQuestion={onSelectField} />
      <EQuestion question={question} />
      <div className="controls">
        <button onClick={onPreSend}>Send Test</button>
      </div>
    </>
  );

  return (
    <div className="test-room section-block">
      {
        <div className="timer-wrapper">
          <Timer />
        </div>
      }
      {content}
    </div>
  );
};

const mapStateToProps = ({
  testProcess: { test, current, fetching, error },
}) => ({
  test,
  current,
  fetching,
  error,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      onSelectField: (idx) => selectInField(idx),
      onPreSend: () => dispatch("SHOW_SEND_CONFIRM"),
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRoom);
