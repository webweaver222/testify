const initialProcess = {
  test: {},
  examId: null,
  current: 0,
  answers: [],
  studentName: "",
  started: false,
  finished: false,
  sendConfirm: false,
  fetching: false,
  error: null,
  nameError: false
};

const upadateTestProcess = (state, action) => {
  if (state === undefined) {
    return initialProcess;
  }

  const {
    testProcess,
    testProcess: { current, answers, test }
  } = state;

  switch (action.type) {
    case "FETCH_TEST_START": {
      return {
        ...testProcess,
        fetching: true,
        sendConfirm: false
      };
    }

    case "FETCH_TEST_SUCCESS": {
      return {
        ...testProcess,
        test: action.payload,
        answers: new Array(action.payload.questions.length),
        fetching: false
      };
    }

    case "FETCH_TEST_FAIL": {
      return {
        ...testProcess,
        error: action.payload,
        fetching: false
      };
    }

    case "CHANGE_STUDENT_NAME": {
      return {
        ...testProcess,
        studentName: action.payload
      };
    }

    case "START_TEST_PROCESS": {
      return {
        ...testProcess,
        examId: action.payload,
        started: true,
        nameError: false
      };
    }

    case "START_TEST_FAIL": {
      return {
        ...testProcess,
        nameError: true
      };
    }

    case "CLOSE_NAME_ERROR": {
      return {
        ...testProcess,
        nameError: false
      };
    }

    case "PROCESS_NEXT_QUESTION": {
      let next = current + 1;

      if (current >= test.questions.length - 1) {
        next = current;
      }

      return {
        ...testProcess,
        current: next
      };
    }

    case "PROCESS_PREV_QUESTION": {
      return {
        ...testProcess,
        current: current === 0 ? current : current - 1
      };
    }

    case "PROCESS_SELECT_ANSWER": {
      return {
        ...testProcess,
        answers: [
          ...answers.slice(0, action.q_idx),
          action.payload,
          ...answers.slice(action.q_idx + 1)
        ]
      };
    }

    case "PROCESS_SELECT_FIELD": {
      return {
        ...testProcess,
        current: action.payload
      };
    }

    case "SHOW_SEND_CONFIRM": {
      return {
        ...testProcess,
        sendConfirm: true
      };
    }

    case "CLOSE_SEND_CONFIRM": {
      return {
        ...testProcess,
        sendConfirm: false
      };
    }

    case "TEST_FINISHED": {
      return {
        ...testProcess,
        sendConfirm: false,
        finished: true,
        fetching: false
      };
    }

    default:
      return testProcess;
  }
};

export default upadateTestProcess;
