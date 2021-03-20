import React, { useEffect } from "react";

import { compose } from "utils";
import { withApi, withSocket } from "components/hoc/withService";
import withTimerEvents from "components/hoc/withTimerEvents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./test-process.sass";

import TestIntro from "components/ExamApp/TestIntro";
import TestRoom from "components/ExamApp/TestRoom";
import Confirm from "./confirm";
import { getTest, startTest, sendTest } from "actions/Exam";

const TestProcess = ({
  onStart,
  onSend,
  started = false,
  finished = true,
  sendConfirm,
  match,
  history,
  onMount,
  examId,
}) => {
  useEffect(() => {
    onMount(match.params.id);
  }, []);

  const intro = !started && !finished && <TestIntro onStartTest={onStart} />;

  const testRoom = started && !finished && <TestRoom />;

  const confirm = sendConfirm && <Confirm onSend={onSend} />;

  const final = finished && (
    <div className="success-notif section-block">
      <span>The answers have been successfully sent!</span>
      <button onClick={() => history.push(`/results/${examId}`)}>
        Show Results
      </button>
    </div>
  );

  const shading = sendConfirm ? <div className="shading"></div> : null;

  return (
    <div className="test-process">
      {intro}
      {testRoom}
      {confirm}
      {final}
      {shading}
    </div>
  );
};

const mapDispatchToProps = (dispatch, { service, socket }) => {
  return bindActionCreators(
    {
      onMount: (testId) => getTest(service)(testId),
      onStart: () => startTest(socket),
      onSend: () => sendTest(socket),
    },
    dispatch
  );
};

export default compose(
  withApi,
  withSocket,
  withTimerEvents,
  connect(
    ({ testProcess: { started, finished, answers, sendConfirm, examId } }) => {
      return {
        started,
        finished,
        answers,
        sendConfirm,
        examId,
      };
    },
    mapDispatchToProps
  )
)(TestProcess);
