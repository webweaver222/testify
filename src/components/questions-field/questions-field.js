import React from "react";

import { connect } from "react-redux";

import "./questions-field.sass";

const QuestionsField = ({ questions, answers, current, onSelectQuestion }) => {
  const renderQuestions = () => {
    return questions.map((q, i) => {
      let addClass = "empty";

      if (i === current) addClass = "current";

      if (answers[i] !== undefined) addClass = "full";

      return (
        <div
          key={i}
          className={`question-block ${addClass}`}
          onClick={() => onSelectQuestion(i)}
        >
          {i + 1}
        </div>
      );
    });
  };

  return <div className="questions-field">{renderQuestions()}</div>;
};

const mapStateToProps = ({
  testProcess: {
    test: { questions },
    answers,
    current,
  },
}) => {
  return {
    questions,
    answers,
    current,
  };
};

export default connect(mapStateToProps, null)(QuestionsField);
