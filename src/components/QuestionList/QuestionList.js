import React from "react";

import { connect } from "react-redux";
import "./QuestionList.sass";

const QuestionList = ({ questions, onHoverQuestion }) => {
  const renderQuestions = () =>
    questions.map((q, i) => {
      return (
        <div
          className="question"
          onMouseEnter={() => onHoverQuestion(q.id)}
          onMouseLeave={() => onHoverQuestion(null)}
          key={q.id}
        >
          {i + 1}
        </div>
      );
    });

  return <div className="question-list">{renderQuestions()}</div>;
};

export default connect(null, dispatch => {
  return {
    onHoverQuestion: id => dispatch({ type: "HOVER_QUESTION", payload: id })
  };
})(QuestionList);
