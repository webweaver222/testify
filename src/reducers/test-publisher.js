const initialPublisher = {
  show: false,
  publisherEmail: "",
  timeLimit: 0,
  testNameError: false,
  emailError: false,
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
    //testPublisher: { },
    testCreator: { questions }
  } = state;

  switch (action.type) {
    case "EMPTY_EMAIL_SHOW": {
      return {
        ...testPublisher,
        emailError: true
      };
    }

    case "EMPTY_EMAIL_CLOSE": {
      return {
        ...testPublisher,
        emailError: false
      };
    }

    case "CLOSE_INPUT_ERROR": {
      return {
        ...testPublisher,
        testNameError: false
      };
    }

    case "SHOW_PUBLISHER": {
      return {
        ...testPublisher,
        show: true,
        testNameError: false
      };
    }

    case "BACK_TO_CONSTRUCTOR": {
      return {
        ...testPublisher,
        show: false
      };
    }

    case "SHOW_TESTNAME_ERROR": {
      return {
        ...testPublisher,
        testNameError: true
      };
    }

    case "FETCH_PREP": {
      const empty = [];
      questions.forEach(question => {
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
        fetching: true,
        error: null
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
