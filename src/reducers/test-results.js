const initialResults = {
  document: "",
  fetching: false,
  error: "",
};

const updateResults = (state, action) => {
  if (state === undefined) {
    return initialResults;
  }

  const { testResults } = state;

  switch (action.type) {
    case "RESULTS_START_FETCH": {
      return {
        ...testResults,
        fetching: true,
      };
    }

    case "RESULTS_FETCH_SUCCESS": {
      return {
        ...testResults,
        fetching: false,
        document: action.payload,
      };
    }

    case "RESULTS_FETCH_FAIL": {
      return {
        ...testResults,
        fetching: false,
        error: action.payload,
      };
    }

    default:
      return testResults;
  }
};

export { updateResults, initialResults };
