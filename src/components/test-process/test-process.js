import React, { useEffect } from "react";

import { compose } from "../../utils";
import withService from "../hoc/withService";
import withTimerEvents from "../hoc/withTimerEvents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./test-process.sass";

import TestIntro from "../test-intro";
import TestRoom from "../test-room";
import Confirm from "./confirm";
import { getTest, startTest, sendTest } from "../../actions/creatorActions";

const TestProcess = ({
  onStart,
  onSend,
  started,
  finished,
  sendConfirm,
  match,
  onMount
}) => {
  useEffect(() => {
    onMount(match.params.id);
  }, []);

  const intro =
    !started && !finished ? <TestIntro onStartTest={onStart} /> : null;

  const testRoom = started && !finished ? <TestRoom /> : null;

  const confirm = sendConfirm ? <Confirm onSend={onSend} /> : null;

  const final = finished ? (
    <div className="success-notif section-block">
      <span>The answers have been successfully sent!</span>
    </div>
  ) : null;

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

const mapDispatchToProps = (dispatch, { service }) => {
  return bindActionCreators(
    {
      onMount: testId => getTest(service)(testId),
      onStart: startTest(service),
      onSend: sendTest(service)
    },
    dispatch
  );
};

export default compose(
  withService,
  withTimerEvents,
  connect(({ testProcess: { started, finished, answers, sendConfirm } }) => {
    return {
      started,
      finished,
      answers,
      sendConfirm
    };
  }, mapDispatchToProps)
)(TestProcess);
