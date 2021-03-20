import React from "react";
import { connect } from "react-redux";

import "./test-intro.sass";

import ErrorIndicator from "components/elements/error-indicator";
import Preloader from "components/elements/preloader";

import { studentNameChange } from "actions/Exam";

const TestIntro = ({
  timeLimit,
  testName,
  testDescription,
  fetching,
  error,
  onNameChange,
  onStartTest,
  nameError,
  onCloseNotif,
}) => {
  const inputError = nameError ? (
    <div className="input-error" onClick={onCloseNotif}>
      You have to write your name
    </div>
  ) : null;

  const inputClass = nameError ? "withError" : "";

  const content = fetching ? (
    <Preloader height={221} width={221} color={"#FF4656"} />
  ) : error ? (
    <ErrorIndicator message={error} type="error" />
  ) : (
    <>
      <div className="intro-header">
        <div className="section-row">
          <span>Test Name:</span>
          <p>{testName}</p>
        </div>

        <div className="section-row">
          <span>Test Description:</span>
          <p>{testDescription}</p>
        </div>

        <div className="section-row">
          <span>Time Limit (min):</span>
          <p>{timeLimit && timeLimit / 60}</p>
        </div>

        <div className="section-row">
          <span>Your Name:</span>
          <div className="input-wrapper">
            <input
              type="text"
              className={inputClass}
              onChange={(e) => onNameChange(e.target.value)}
            />
            {inputError}
          </div>
        </div>
      </div>

      <div className="intro-footer">
        <button onClick={onStartTest}>Start Test</button>
      </div>
    </>
  );

  return <div className="test-intro section-block">{content}</div>;
};

const mapStateToProps = ({
  testProcess: {
    test: { testName, testDescription, timeLimit },
    fetching,
    error,
    nameError,
  },
}) => {
  return {
    timeLimit,
    testName,
    testDescription,
    fetching,
    error,
    nameError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => dispatch(studentNameChange(name)),
    onCloseNotif: () => dispatch("CLOSE_NAME_ERROR"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestIntro);
