import React from "react";

import { compose } from "../../utils";
import withService from "../hoc/withService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./test-process.sass";

import TestIntro from "../test-intro";
import TestRoom from "../test-room";
import Confirm from "./confirm";
import { getTest, startTest, sendTest } from "../../actions/creatorActions";

class TestProcess extends React.Component {
  calculateTimeFraction() {
    const { limit, timeLeft } = this.props;
    const rawTimeFraction = timeLeft / limit;
    return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const { setSda } = this.props;
    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(
      0
    )} 283`;
    setSda(circleDasharray);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.onMount(id);
  }

  componentDidUpdate = async prevProps => {
    const {
      started,
      finished,
      setTimePassed,
      setTimeLeft,
      limit,
      timePassed
    } = this.props;
    const {
      started: prevStarted,
      finished: prevFinished,
      timePassed: prevTime
    } = prevProps;

    if (finished !== prevFinished) {
      return () => clearTimeout(this.timer);
    }

    if (started !== prevStarted || timePassed !== prevTime) {
      this.timer = setTimeout(() => {
        if (timePassed <= limit) {
          //setTimePassed(timePassed + 1);
          //setTimeLeft(limit - timePassed);
          //this.setCircleDasharray();
        }
      }, 1000);
      return () => clearTimeout(this.timer);
    }
  };

  finishTest() {
    const {
      match: { url },
      history
    } = this.props;
    history.push(`${url}/send`);
  }

  render() {
    const { onStart, onSend, started, finished, sendConfirm } = this.props;

    const intro =
      !started && !finished ? <TestIntro onStartTest={onStart} /> : null;

    const testRoom =
      started && !finished ? (
        <TestRoom onFinishProcess={() => this.finishTest()} />
      ) : null;

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
  }
}

const mapDispatchToProps = (dispatch, { service }) => {
  return bindActionCreators(
    {
      onMount: testId => getTest(service)(testId),
      onStart: startTest(service),
      onSend: sendTest(service),
      setTimePassed: tp => {
        return { type: "SET_TIME_PASSED", payload: tp };
      },
      setTimeLeft: tl => {
        return { type: "SET_TIME_LEFT", payload: tl };
      },
      setSda: sda => {
        return { type: "SET_SDA", payload: sda };
      }
    },
    dispatch
  );
};

export default compose(
  withService,
  connect(
    ({
      timer: { timePassed, timeLeft, strokeDasharray, limit },
      testProcess: { started, finished, answers, sendConfirm }
    }) => {
      return {
        started,
        finished,
        timePassed,
        timeLeft,
        strokeDasharray,
        limit,
        answers,
        sendConfirm
      };
    },
    mapDispatchToProps
  )
)(TestProcess);
