import React from "react";
import { connect } from "react-redux";

const TestInfo = ({
  publisherEmail,
  timeLimit,
  emailChange,
  limitChange,
  emailError,
  onCloseNotif
}) => {
  const error = emailError ? (
    <div className="input-error" onClick={onCloseNotif}>
      You have to right your email
    </div>
  ) : null;

  const inputClass = emailError ? "withError" : "";

  return (
    <div className="test-info">
      <h2>Publish page</h2>
      <div className="section-row">
        <label htmlFor="creator-email">Creator Email</label>
        <div className="input-wrapper">
          <input
            type="text"
            className={inputClass}
            onChange={e => emailChange(e.target.value)}
            value={publisherEmail}
            id="creator-email"
          />
        </div>
        {error}
      </div>
      <div className="section-row">
        <label htmlFor="time-input">Time limit (min)</label>
        <input
          className="time-input"
          type="number"
          onChange={e => limitChange(e.target.value)}
          value={timeLimit}
          id="time-input"
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    emailChange: email =>
      dispatch({ type: "CHANGE_PUBLISHER_EMAIL", payload: email }),
    limitChange: time => dispatch({ type: "CHANGE_TIME_LIMIT", payload: time }),
    onCloseNotif: () => dispatch("EMPTY_EMAIL_CLOSE")
  };
};

export default connect(
  ({ testPublisher: { publisherEmail, timeLimit, emailError } }) => {
    return {
      publisherEmail,
      timeLimit,
      emailError
    };
  },
  mapDispatchToProps
)(TestInfo);
