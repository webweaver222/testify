const getTest = (service) => (testId) => async (dispatch) => {
  dispatch("FETCH_TEST_START");

  try {
    const res = await service.get(`/test/${testId}`);

    if (!res.ok) {
      return dispatch({
        type: "FETCH_TEST_FAIL",
        payload: `Response status code ${res.status}. ${res.statusText}`,
      });
    }

    const body = await res.json();

    dispatch({
      type: "SET_TIMER",
      payload: body.timeLimit,
    });

    dispatch({
      type: "FETCH_TEST_SUCCESS",
      payload: body,
    });
  } catch (e) {
    dispatch({
      type: "FETCH_TEST_FAIL",
      payload: "Can't reach server",
    });
  }
};

const studentNameChange = (name) => {
  return {
    type: "CHANGE_STUDENT_NAME",
    payload: name,
  };
};

const startTest = (service) => (socket) => async (dispatch, getState) => {
  const {
    testProcess: {
      studentName,
      test: { id },
    },
  } = getState();

  if (!/\S+/.test(studentName)) return dispatch("START_TEST_FAIL");

  try {
    const startExam = await service.get(`/test/${id}/start`);
    const exam = await startExam.json();

    dispatch({
      type: "START_TEST_PROCESS",
      payload: exam.examId,
    });

    socket.emit("join", { exam_id: exam.examId });

    socket.on("Test End", function () {
      socket.disconnect();
      return dispatch("TEST_FINISHED");
    });
  } catch (e) {
    dispatch({
      type: "FETCH_TEST_FAIL",
      payload: "Can't reach server",
    });
  }
};

const sendTest = (service) => () => async (dispatch, getState) => {
  const {
    testProcess: { answers, examId, studentName },
  } = getState();

  dispatch("FETCH_TEST_START");

  try {
    const res = await service.post(
      {
        studentName,
        answers,
      },
      `/test/${examId}/finish`
    );

    if (res.ok) {
      return dispatch("TEST_FINISHED");
    }
  } catch (e) {
    dispatch({
      type: "FETCH_TEST_FAIL",
      payload: "Can't reach server",
    });
  }
};

const processAnswer = (idx, current) => {
  return {
    type: "PROCESS_SELECT_ANSWER",
    payload: idx,
    q_idx: current,
  };
};

const selectInField = (idx) => {
  return {
    type: "PROCESS_SELECT_FIELD",
    payload: idx,
  };
};

export {
  getTest,
  studentNameChange,
  startTest,
  sendTest,
  processAnswer,
  selectInField,
};
