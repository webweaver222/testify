import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./test-room.sass";

import { processAnswer, selectInField } from "actions/creatorActions";
import Question from "components/elements/question";
import QuestionsField from "components/ExamApp/QuestionsField";
import Timer from "components/ExamApp/timer";
import Preloader from "components/elements/preloader";
import ErrorIndicator from "components/elements/error-indicator";

const TestRoom = ({
  test,
  current,
  answers,
  onSelectField,
  onPreSend,
  fetching,
  error,
}) => {
  const question = test.questions[current];

  const content = fetching ? (
    <Preloader width={200} height={200} color={"#FF4656"} />
  ) : error ? (
    <ErrorIndicator message={error} type="error" />
  ) : (
    <React.Fragment>
      <QuestionsField onSelectQuestion={onSelectField} />
      <Question
        question={question}
        selectedAnswer={answers[current]}
        processActions={(dispatch) => {
          return {
            onNext: () => dispatch("PROCESS_NEXT_QUESTION"),
            onPrev: () => dispatch("PROCESS_PREV_QUESTION"),
            onSelectAnswer: (idx) => dispatch(processAnswer(idx, current)),
            onChangeQuestionBody: () => {},
            onChangeAnswerBody: () => {},
            onAddAnswer: () => {},
            onDeleteAnswer: () => {},
          };
        }}
      />
      <div className="controls">
        <button onClick={onPreSend}>Send Test</button>
      </div>
    </React.Fragment>
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
  testProcess: { test, current, answers, fetching, error },
}) => {
  return {
    test,
    current,
    answers,
    fetching,
    error,
  };
};

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
