import { upadateTestCreator, initialTest } from "./test-creator";
import { upadateTestPublisher, initialPublisher } from "./test-publisher";
import { upadateTestProcess, initialProcess } from "./test-process";
import { updateTimer, initialTimer } from "./timer";
import { updateResults, initialResults } from "./test-results";

const initState = {
  testCreator: initialTest,
  testProcess: initialProcess,
  testPublisher: initialPublisher,
  timer: initialTimer,
  testResults: initialResults,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET_STORE": {
      state = undefined;
    }

    default:
      return {
        testCreator: upadateTestCreator(state, action),
        testPublisher: upadateTestPublisher(state, action),
        testProcess: upadateTestProcess(state, action),
        testResults: updateResults(state, action),
        timer: updateTimer(state, action),
      };
  }
};

export { reducer, initState };
