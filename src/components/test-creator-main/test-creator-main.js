import React from "react";
import { connect } from "react-redux";
import "./test-creator-main.sass";

import {
  testNameChange,
  testDescriptionChange
} from "../../actions/creatorActions";

const TestCreatorMain = ({
  onPublishTest,
  testName,
  testDerscription,
  testNameError,
  onNameChange,
  onDescriptionChange,
  onCloseNotif
}) => {
  const error = testNameError ? (
    <div className="input-error" onClick={onCloseNotif}>
      You have to name your test
    </div>
  ) : null;

  const inputClass = testNameError ? "withError" : "";

  return (
    <div className="test-creator-main section-block">
      <div className="section-row">
        <label htmlFor="test-name">Test Name</label>
        <div className="input-wrapper">
          <input
            id="test-name"
            type="text"
            className={inputClass}
            style={testNameError ? { border: `2px solid red` } : null}
            value={testName}
            onChange={e => onNameChange(e.target.value)}
          />
          {error}
        </div>
      </div>

      <div className="section-row">
        <label htmlFor="test-descr">Description</label>
        <textarea
          id="test-descr"
          rows="5"
          value={testDerscription}
          onChange={e => onDescriptionChange(e.target.value)}
        />
      </div>

      <div className="section-row">
        <button className="btn btn-primary" onClick={onPublishTest}>
          Publish test
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  testPublisher: { testNameError },
  testCreator: { testName, testDerscription }
}) => {
  return {
    testName,
    testDerscription,
    testNameError
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseNotif: () => dispatch("CLOSE_INPUT_ERROR"),
  onNameChange: t => dispatch(testNameChange(t)),
  onDescriptionChange: t => dispatch(testDescriptionChange(t))
});

export default connect(mapStateToProps, mapDispatchToProps)(TestCreatorMain);
