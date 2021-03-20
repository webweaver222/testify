import React, { useRef } from "react";
import { connect } from "react-redux";
import { usePrevious, useDidMountEffect } from "../../customHooks";

import "./question-pool.sass";
import { questionHover } from "actions/TestCreator";

import DnDList from "./dndList";

const QuestionPool = ({ questions, onAdd, detailsOn, onDeleteAll }) => {
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
        <DnDList questions={questions} detailsOn={detailsOn} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: () => dispatch("CLICK_ADD_QUESTION"),
    onHover: (id) => dispatch(questionHover(id)),
    onDeleteAll: () => dispatch("CLICK_DELETE_ALL"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPool);
