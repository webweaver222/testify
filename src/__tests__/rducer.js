import { reducer, initState } from "../reducers/index";

describe("Reducer", () => {
  it("Should return default state", () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(initState);
  });

  it("Should return changed state", () => {
    const newState = reducer(initState, {
      type: "CHANGE_TEST_NAME",
      payload: "alex"
    });
    expect(newState).toEqual({
      ...initState,
      testCreator: {
        ...initState.testCreator,
        testName: "alex"
      }
    });
  });
});
