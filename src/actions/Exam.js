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

const startTest = (webSocket) => async (dispatch, getState) => {
  const {
    testProcess: {
      studentName,
      test: { id },
    },
  } = getState();

  if (!/\S+/.test(studentName)) return dispatch("START_TEST_FAIL");

  try {
    webSocket.init();
    const { socket } = webSocket;

    socket.emit("start_exam", { test_id: id });

    socket.on("exam_started", ({ exam_id }) => {
      dispatch({
        type: "START_TEST_PROCESS",
        payload: exam_id,
      });
    });

    socket.on("exam_timeout", () => {
      const {
        testProcess: { answers, examId, studentName },
      } = getState();
      socket.emit("finish_exam", { studentName, answers, exam_id: examId });

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

const sendTest = ({ socket }) => async (dispatch, getState) => {
  const {
    testProcess: { answers, examId, studentName },
  } = getState();

  dispatch("FETCH_TEST_START");

  try {
    socket.emit("finish_exam", { studentName, answers, exam_id: examId });
    socket.on("exam_finished", () => {
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

export {
  getTest,
  studentNameChange,
  startTest,
  sendTest,
  processAnswer,
  selectInField,
};
