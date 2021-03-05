const createNewTest = () => (dispatch) => {
  dispatch("RESET_STORE");
};

const toPrePublish = () => (dispatch, getState) => {
  const {
    testCreator: { testName },
  } = getState();

  if (testName === "") return dispatch("SHOW_TESTNAME_ERROR");

  return dispatch("SHOW_PUBLISHER");
};

const finalPublish = (service) => () => async (dispatch, getState) => {
  const {
    testPublisher: { publisherEmail },
  } = getState();

  if (publisherEmail === "") {
    return dispatch("EMPTY_EMAIL_SHOW");
  }

  dispatch("EMPTY_EMAIL_CLOSE");
  dispatch("FETCH_PREP");
  dispatch("SAVE_TEST_START");

  const {
    testCreator: { active, hoveredQuestion, ...testCreator },
    testPublisher,
  } = getState();

  const notEmptyQuestions = testCreator.questions.filter(
    (question) => !testPublisher.emptyQuestions.includes(question.id)
  );

  const test = {
    ...testCreator,
    publisherEmail: testPublisher.publisherEmail,
    timeLimit: testPublisher.timeLimit,
    questions: notEmptyQuestions,
  };

  try {
    const res = await service.post(test, "/test");

    if (!res.ok) {
      return dispatch({
        type: "SAVE_TEST_FAIL",
        payload: `Response status code ${res.status}. ${res.statusText}`,
      });
    }

    const body = await res.json();

    dispatch({
      type: "SAVE_TEST_SUCCESS",
      payload: body.testUrl,
    });
  } catch (e) {
    dispatch({
      type: "SAVE_TEST_FAIL",
      payload: `Can't reach server`,
    });
  }
};

export { toPrePublish, finalPublish, createNewTest };
