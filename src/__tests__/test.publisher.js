import React from "react";

import PublisherContainer from "../components/publisher";
import { render } from "test-utils";
import { initState } from "../reducers";
import { fireEvent, waitFor } from "@testing-library/dom";

describe("Test publisher", () => {
  it("Makes api call", async () => {
    const { getByText, getByTestId, debug } = render(<PublisherContainer />, {
      initialState: {
        ...initState,
        testPublisher: {
          ...initState.testPublisher,
          publisherEmail: "email"
        },
        testCreator: {
          ...initState.testCreator,
          questions: [
            {
              id: 0,
              body: "alfa",
              rightAnswer: 0,
              answers: [
                {
                  id: 0,
                  body: "1"
                },
                {
                  id: 1,
                  body: "2"
                }
              ]
            },

            {
              id: 1,
              body: "beta",
              rightAnswer: 0,
              answers: [
                {
                  id: 0,
                  body: "1"
                },
                {
                  id: 1,
                  body: "2"
                }
              ]
            }
          ]
        }
      },
      resolveTo: {
        ok: true,
        json: () => ({ testUrl: "testLink" })
      }
    });

    const button = getByText(/publish Test/i);

    expect(button).not.toBeNull();

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByTestId(/link/i)).toHaveTextContent("testLink");
    });
  });
});
