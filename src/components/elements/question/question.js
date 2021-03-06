import React from "react";

import "./question.sass";

const Question = ({
  question,
  onNext,
  onPrev,
  started,
  answers,
  onChangeQuestionBody,
}) => (
    <div className={!started ? "question section-block" : "question"}>
      <div className="section-row">
        <label htmlFor="question-body">{!started && "Question"}</label>
        <textarea
          value={question.body}
          id="question-body"
          onChange={(e) =>
            onChangeQuestionBody && onChangeQuestionBody(e.target.value)
          }
          type="text"
          rows="4"
        />
      </div>

      <div className="section-row answers">{answers()}</div>

      <div onClick={onPrev} className="arrow left-arrow">
        <i className="fa fa-angle-double-left"></i>
      </div>
      <div onClick={onNext} className="arrow">
        <i className="fa fa-angle-double-right"></i>
      </div>
    </div>
  );


export default Question;
