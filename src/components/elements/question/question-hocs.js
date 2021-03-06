import React from "react";
import { connect } from "react-redux";

import {
  questionBodyChange,
  answerBodyChange,
  deleteAnswer,
  selectAnswer,
} from "actions/TestCreator";

import { processAnswer } from "actions/Exam";

const creatorActions = (dispatch) => {
  return {
    onNext: () => dispatch("SELECT_QUESTION_NEXT"),
    onPrev: () => dispatch("SELECT_QUESTION_PREV"),
    onChangeQuestionBody: (body) => dispatch(questionBodyChange(body)),
    onChangeAnswerBody: (answerId, body) =>
      dispatch(answerBodyChange(answerId, body)),
    onAddAnswer: () => dispatch("CLICK_ADD_ANSWER"),
    onDeleteAnswer: (id) => dispatch(deleteAnswer(id)),
    onSelectAnswer: (id) => dispatch(selectAnswer(id)),
  };
};

const examActions = (dispatch) => {
  return {
    onNext: () => dispatch("PROCESS_NEXT_QUESTION"),
    onPrev: () => dispatch("PROCESS_PREV_QUESTION"),
    onSelectAnswer: (idx) => dispatch(processAnswer(idx)),
  };
};

const examData = ({ testProcess: { current, answers, started } }) => ({
  current,
  answers,
  started,
});

const withAnswers = (Wrapped) => (props) => {
  const {
    question,
    selectedAnswer,
    onSelectAnswer,
    onChangeAnswerBody,
    onAddAnswer,
    onDeleteAnswer,
    started,
  } = props;

  const renderAnswers = () => {
    return question.answers.map((answer, i, arr) => {
      let activeAnswer = question.rightAnswer === answer.id ? "active" : null;

      if (started) {
        activeAnswer = i === selectedAnswer ? "active" : null;
      }

      const addBtn =
        i === arr.length - 1 && arr.length - 1 < 5 && !started ? (
          <i className="fa fa-plus-square" onClick={onAddAnswer}></i>
        ) : null;

      const deleteBtn =
        i > 1 && !started ? (
          <i
            className="fa fa-trash"
            onClick={() => onDeleteAnswer(answer.id)}
          ></i>
        ) : null;

      const answerValue = !started ? answer.body : answer;

      const selectAnswer = !started
        ? () => onSelectAnswer(answer.id)
        : () => onSelectAnswer(i);

      return (
        <div className="answer" key={i}>
          <div className={`checkbox ${activeAnswer}`} onClick={selectAnswer}>
            {activeAnswer ? (
              <i className="fa fa-check" aria-hidden="true"></i>
            ) : null}
          </div>

          <input
            autoComplete="off"
            type="text"
            value={answerValue}
            onChange={(e) =>
              onChangeAnswerBody &&
              onChangeAnswerBody(answer.id, e.target.value)
            }
          />
          {deleteBtn}
          {addBtn}
        </div>
      );
    });
  };

  return <Wrapped {...props} answers={renderAnswers} />;
};

const CreatorQuestion = (Wrapped) =>
  connect(null, creatorActions)((props) => <Wrapped {...props} />);

const ExamQuestion = (Wrapped) =>
  connect(
    examData,
    examActions
  )((props) => {
    const { current, answers } = props;

    return <Wrapped {...props} selectedAnswer={answers[current]} />;
  });

export { CreatorQuestion, ExamQuestion, withAnswers };
