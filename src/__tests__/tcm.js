import React from "react";
import { render } from "test-utils";
import TestCreatorMain from "../components/test-creator-main";
import user from "@testing-library/user-event";
import { initState } from "../reducers";

const setUp = (props = {}) => {
  const component = render(<TestCreatorMain />, props);
  return component;
};

describe("Test-Creator-main", () => {
  it("shows input notif", () => {
    const { getByText } = setUp({
      initialState: {
        ...initState,
        testPublisher: {
          ...initState.testPublisher,
          testNameError: true
        }
      }
    });

    const error = getByText(/you have to name your test/i);
    expect(error).not.toBe(null);
  });

  it("renders without state", () => {
    const { getByLabelText, debug } = setUp();

    const test_name = getByLabelText(/test name/i);
    const test_descr = getByLabelText(/description/i);
    expect(test_name).toHaveAttribute("value", "");
    expect(test_descr).toHaveValue("");
    user.type(test_name, "jon");
    expect(test_name).toHaveAttribute("value", "jon");
  });

  it("renders with state", () => {
    const { getByLabelText: getByLabelTextU, debug: debugU } = setUp({
      initialState: {
        ...initState,
        testCreator: {
          ...initState.testCreator,
          testName: "alex"
        }
      }
    });
    const test_name = getByLabelTextU(/test name/i);
    expect(test_name).toHaveAttribute("value", "alex");
  });
});
