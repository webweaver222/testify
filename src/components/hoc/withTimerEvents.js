import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDidMountEffect } from "../customHooks";

const withTimerEvents = Wrapped =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(props => {
    const {
      started,
      timePassed,
      setTimePassed,
      setSda,
      setTimeLeft,
      limit,
      timeLeft,
      ...other
    } = props;

    let timer;

    useDidMountEffect(() => {
      timer = setTimeout(() => {
        if (timePassed <= limit) {
          setTimePassed(timePassed + 1);
          setTimeLeft(limit - timePassed);
          setCircleDasharray();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [started, timePassed]);

    const calculateTimeFraction = () => {
      const rawTimeFraction = timeLeft / limit;
      return rawTimeFraction - (1 / limit) * (1 - rawTimeFraction);
    };

    const setCircleDasharray = () => {
      const circleDasharray = `${(calculateTimeFraction() * 283).toFixed(
        0
      )} 283`;
      setSda(circleDasharray);
    };

    return <Wrapped {...other} />;
  });

const mapStateToProps = ({
  timer: { timePassed, timeLeft, strokeDasharray, limit },
  testProcess: { started }
}) => {
  return {
    started,
    timePassed,
    timeLeft,
    strokeDasharray,
    limit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTimePassed: tp => dispatch({ type: "SET_TIME_PASSED", payload: tp }),
    setTimeLeft: tl => dispatch({ type: "SET_TIME_LEFT", payload: tl }),
    setSda: sda => dispatch({ type: "SET_SDA", payload: sda })
  };
};

export default withTimerEvents;
