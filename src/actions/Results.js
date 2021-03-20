const getResults = (service) => (exam_id) => async (dispatch) => {
  dispatch("RESULTS_START_FETCH");
  try {
    const res = await service.get(`/test/results/${exam_id}`);

    if (!res.ok) {
      console.log(res);
      dispatch({ type: "RESULTS_FETCH_FAIL", payload: res.statusText });
    }

    const body = await res.json();

    dispatch({ type: "RESULTS_FETCH_SUCCESS", payload: body.results });
  } catch (e) {
    dispatch({ type: "RESULTS_FETCH_FAIL", payload: e.message });
  }
};

export { getResults };
