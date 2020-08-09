const initialTimer = {
  limit: 0,
  timePassed: 0,
  timeLeft: 0,
  strokeDasharray: 283
};
const updateTimer = (state, action) => {
  if (state === undefined) {
    return initialTimer;
  }

  const { timer } = state;

  switch (action.type) {
    case "SET_TIMER": {
      return {
        ...timer,
        limit: action.payload,
        timeLeft: action.payload
      };
    }

    case "SET_TIME_PASSED": {
      return {
        ...timer,
        timePassed: action.payload
      };
    }

    case "SET_TIME_LEFT": {
      return {
        ...timer,
        timeLeft: action.payload
      };
    }

    case "SET_SDA": {
      return {
        ...timer,
        strokeDasharray: action.payload
      };
    }

    default:
      return timer;
  }
};

export { updateTimer, initialTimer };
