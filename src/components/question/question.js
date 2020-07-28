import React from "react";

import { connect } from "react-redux";
import {
  questionBodyChange,
  answerBodyChange,
  deleteAnswer,
  selectAnswer
} from "../../actions/creatorActions";

import "./question.sass";

const Question = ({
  question,
  onNext,
  onPrev,
  current = null,
  selectedAnswer = null,
  finalQuestion = null,
  mapDispatch = null,
  onFinishProcess = null,
  onSelectAnswer,
  onChangeQuestionBody,
  onChangeAnswerBody,
  onAddAnswer,
  onDeleteAnswer
}) => {
  const renderAnswers = () => {
    return question.answers.map((answer, i, arr) => {
      let activeAnswer = question.rightAnswer === answer.id ? "active" : null;

      if (mapDispatch) {
        activeAnswer = i === selectedAnswer ? "active" : null;
      }

      const addBtn =
        i === arr.length - 1 && arr.length - 1 < 5 && !mapDispatch ? (
          <i className="fa fa-plus-square" onClick={onAddAnswer}></i>
        ) : null;

      const deleteBtn =
        i > 1 && !mapDispatch ? (
          <i
            className="fa fa-trash"
            onClick={() => onDeleteAnswer(answer.id)}
          ></i>
        ) : null;

      const answerValue = !mapDispatch ? answer.body : answer;

      const selectAnswer = !mapDispatch
        ? () => onSelectAnswer(answer.id)
        : () => onSelectAnswer(i);

      return (
        <div className="answer" key={i}>
          <div className={`checkbox ${activeAnswer}`} onClick={selectAnswer}>
            {activeAnswer ? (
              <i className="fa fa-check" aria-hidden="true"></i>
            ) : null}
          </div>
          <label htmlFor="answer-body">{i + 1}</label>
          <input
            id="answer-body"
            autoComplete="off"
            type="text"
            value={answerValue} //
            onChange={e => onChangeAnswerBody(answer.id, e.target.value)}
          />
          {deleteBtn}
          {addBtn}
        </div>
      );
    });
  };

  const questionLabel = !mapDispatch ? "Question" : "";

  if (mapDispatch) {
    rightButton =
      current < finalQuestion - 1 ? (
        <button onClick={onNext} className="btn btn-primary">
          Next
        </button>
      ) : (
        <button onClick={onFinishProcess} className="btn btn-primary">
          Finish
        </button>
      );
  }

  return (
    <div className="question section-block">
      <div className="section-row">
        <label htmlFor="question-body">{questionLabel}</label>
        <textarea
          value={question.body}
          id="question-body"
          onChange={e => onChangeQuestionBody(e.target.value)}
          type="text"
          rows="4"
        />
      </div>

      <div className="section-row answers">{renderAnswers()}</div>

      <div onClick={onPrev} className="arrow left-arrow">
        <i className="fa fa-angle-double-left"></i>
      </div>
      <div onClick={onNext} className="arrow">
        <i className="fa fa-angle-double-right"></i>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { mapDispatch }) => {
  if (mapDispatch) return mapDispatch(dispatch);

  return {
    onNext: () => dispatch("SELECT_QUESTION_NEXT"),
    onPrev: () => dispatch("SELECT_QUESTION_PREV"),
    onChangeQuestionBody: body => dispatch(questionBodyChange(body)),
    onChangeAnswerBody: (answerId, body) =>
      dispatch(answerBodyChange(answerId, body)),
    onAddAnswer: () => dispatch("CLICK_ADD_ANSWER"),
    onDeleteAnswer: id => dispatch(deleteAnswer(id)),
    onSelectAnswer: id => dispatch(selectAnswer(id))
  };
};

export default connect(null, mapDispatchToProps)(Question);
