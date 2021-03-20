import React from "react";
import RLDD from "react-list-drag-and-drop/lib/RLDD";

import { connect } from "react-redux";

import { handleDnD, clickQuestion, deleteQuestion } from "actions/TestCreator";

const DnDList = ({
  questions,
  detailsOn,
  onDnd,
  onActive,
  onDelete,
  openDetails,
}) => {
  const renderFn = (question, index) => {
    const delete_button =
      index !== 0 ? (
        <div
          className="delete"
          onClick={(e) => {
            onDelete(question.id);
            e.stopPropagation();
          }}
        >
          <i
            className="fa fa-times"
            aria-hidden="true"
            style={{ fontSize: "14px" }}
          ></i>
        </div>
      ) : null;

    const detailsIcon =
      detailsOn !== question.id ? (
        <i className="fa fa-angle-down" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-angle-up" aria-hidden="true"></i>
      );

    const renderAnswers = () => (
      <ul>
        {question.answers.map((answer, i) => {
          if (answer.body !== "")
            return (
              <li key={answer.id}>
                <span className="num">{`${i + 1}. `}</span>
                <span>{answer.body}</span>
              </li>
            );
        })}
      </ul>
    );

    return (
      <div className="question-wrapper">
        <div className="question" onClick={() => onActive(index)}>
          <span className="num">{index + 1}.</span>
          <span className="text">{question.body}</span>
          <div
            className="deteils"
            onClick={(e) => {
              openDetails(question.id);
              e.stopPropagation();
            }}
          >
            {detailsIcon}
          </div>
          {delete_button}
        </div>
        {question.answers.some((a) => a.body !== "") ? (
          <div
            className="answers"
            style={question.id === detailsOn ? { display: "block" } : null}
          >
            {renderAnswers()}
          </div>
        ) : null}
      </div>
    );
  };

  return <RLDD items={questions} itemRenderer={renderFn} onChange={onDnd} />;
};

const mapDispatchToProps = (dispatch, { onActive }) => {
  return {
    onDnd: (newItems) => dispatch(handleDnD(newItems)),
    onActive: onActive || ((id) => dispatch(clickQuestion(id))),
    onDelete: (id) => dispatch(deleteQuestion(id)),
    openDetails: (id) => dispatch({ type: "OPEN_DETAILS", payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(DnDList);
