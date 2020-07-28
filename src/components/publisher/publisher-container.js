import React from "react";
import { connect } from "react-redux";
import { compose } from "../../utils";

import QuestionList from "../QuestionList";
import Publisher from "./publisher";
import TestInfo from "./test-info";
import "./publisher.sass";
import { finalPublish } from "../../actions/creatorActions";
import withService from "../hoc/withService";

const PublisherContainer = ({
  questions,
  onBack,
  onPublish,
  savedTestUrl,
  onNewTest,
  hoveredQuestion
}) => {
  const render = (preloader, error) => {
    let detailsBlock = null;

    if (hoveredQuestion !== null) {
      const hoveredIdx = questions.findIndex(q => q.id === hoveredQuestion);

      detailsBlock = (
        <div className="questionDetails section-block">
          <p>{questions[hoveredIdx].body}</p>
          <ul>
            {questions[hoveredIdx].answers.map((answer, i) => {
              if (answer.body !== "")
                return (
                  <li key={answer.id}>
                    <span className="num">{`${i + 1}. `}</span>
                    <span>{answer.body}</span>
                  </li>
                );
            })}
          </ul>
        </div>
      );
    }

    const bttonContent = preloader ? preloader : "Publish Test";

    const publishButton = savedTestUrl ? (
      <div className="test-url">{savedTestUrl}</div>
    ) : (
      <button onClick={onPublish}>{bttonContent}</button>
    );

    const newTestButton = savedTestUrl ? (
      <button onClick={onNewTest} className="new-test-btn">
        New Test
      </button>
    ) : null;

    return (
      <React.Fragment>
        <TestInfo />

        <QuestionList questions={questions} />

        <div className="section-row control">
          <button onClick={onBack}>Back</button>
          {publishButton}
          {newTestButton}
        </div>

        {detailsBlock}
      </React.Fragment>
    );
  };

  return <Publisher render={render} />;
};

const mapStateToProps = ({
  testCreator: { questions, hoveredQuestion },
  testPublisher: { emptyQuestions, fetching, error, savedTestUrl }
}) => {
  return {
    emptyQuestions,
    fetching,
    error,
    savedTestUrl,
    questions,
    hoveredQuestion
  };
};

export default compose(
  withService,
  connect(mapStateToProps, (dispatch, { service }) => {
    return {
      onBack: () => dispatch("BACK_TO_CONSTRUCTOR"),
      onPublish: () => dispatch(finalPublish(service)()),
      onNewTest: () => dispatch("RESET_STORE")
    };
  })
)(PublisherContainer);
