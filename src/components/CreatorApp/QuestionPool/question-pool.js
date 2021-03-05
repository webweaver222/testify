import React, { useRef } from "react";
import { connect } from "react-redux";
import { usePrevious, useDidMountEffect } from "../../customHooks";

import "./question-pool.sass";
import {
  handleDnD,
  clickQuestion,
  deleteQuestion,
  questionHover,
} from "actions/TestCreator";

import RLDD from "react-list-drag-and-drop/lib/RLDD";

const QuestionPool = ({
  questions,
  onDnd,
  onActive,
  onDelete,
  openDetails,
  onAdd,
  detailsOn,
  onDeleteAll,
}) => {
  const pool = useRef(null);

  const prevQuestions = usePrevious(questions);

  useDidMountEffect(() => {
    if (questions.length > prevQuestions.length) {
      pool.current.scrollTop = pool.current.scrollHeight;
    }
  }, [questions.length]);

  const onScroll = (e) => {
    pool.current.scrollTop += e.deltaY * 0.3;
  };

  return (
    <div className="question-pool">
      <h2>- Question List -</h2>
      <div className="control-menu">
        <button onClick={onAdd}>Add Question</button>
        <button onClick={onDeleteAll}>Delete All</button>
      </div>
      <div className="list-wrapper" onWheel={onScroll} ref={pool}>
        <RLDD
          items={questions}
          itemRenderer={(question, index) => {
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
                    style={
                      question.id === detailsOn ? { display: "block" } : null
                    }
                  >
                    {renderAnswers()}
                  </div>
                ) : null}
              </div>
            );
          }}
          onChange={onDnd}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ testCreator: { detailsOn, deleteConfirm } }) => {
  return {
    detailsOn,
    deleteConfirm,
  };
};

const mapDispatchToProps = (dispatch, { onActive }) => {
  return {
    onDnd: (newItems) => dispatch(handleDnD(newItems)),
    onActive: onActive || ((id) => dispatch(clickQuestion(id))),
    onDelete: (id) => dispatch(deleteQuestion(id)),
    onAdd: () => dispatch("CLICK_ADD_QUESTION"),
    onHover: (id) => dispatch(questionHover(id)),
    openDetails: (id) => dispatch({ type: "OPEN_DETAILS", payload: id }),
    onDeleteAll: () => dispatch("CLICK_DELETE_ALL"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPool);
