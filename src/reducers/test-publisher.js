const initialPublisher = {
  show: false,
  publisherEmail: "",
  timeLimit: 0,
  testNameError: false,
  emptyQuestions: [],
  savedTestUrl: null,
  fetching: false,
  error: null
};

const upadateTestPublisher = (state, action) => {
  if (state === undefined) {
    return {
      ...initialPublisher
    };
  }

  const {
    testPublisher,
    testPublisher: { testNameError, hoveredQuestion },
    testCreator: { testName }
  } = state;

  switch (action.type) {
    case "CLOSE_INPUT_ERROR": {
      return {
        ...testPublisher,
        testNameError: false
      };
    }

    case "SHOW_PUBLISHER": {
      return {
        ...testPublisher,
        show: true
      };
    }

    case "CLICK_PUBLISH_TEST": {
      return {
        ...testPublisher,
        testNameError: testName === "" ? true : false
      };
    }

    case "FETCH_PREP": {
      //if (testNameError === null) {
      const empty = [];
      testCreator.questions.forEach(question => {
        if (
          question.body === "" ||
          question.answers.filter(a => a.body !== "").length < 2
        ) {
          empty.push(question.id);
        }
      });

      return {
        ...testPublisher,
        emptyQuestions: empty
      };
      //}
    }

    case "SAVE_TEST_SUCCESS": {
      return {
        ...testPublisher,
        savedTestUrl: action.payload,
        fetching: false
      };
    }

    case "SAVE_TEST_START": {
      return {
        ...testPublisher,
        fetching: true
      };
    }

    case "SAVE_TEST_FAIL": {
      return {
        ...testPublisher,
        fetching: false,
        error: action.payload
      };
    }

    case "CHANGE_PUBLISHER_EMAIL": {
      return {
        ...testPublisher,
        publisherEmail: action.payload
      };
    }

    case "CHANGE_TIME_LIMIT": {
      return {
        ...testPublisher,
        timeLimit: action.payload
      };
    }

    default:
      return testPublisher;
  }
};

export default upadateTestPublisher;
