import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [customTime, setCustomTime] = useState(25);

  useEffect(() => {
    let interval;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isPaused]);

  const startHandler = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseHandler = () => {
    setIsPaused(!isPaused);
  };

  const resetHandler = () => {
    setIsActive(false);
    setMinutes(customTime);
    setSeconds(0);
    setIsPaused(false);
  };

  const handleTimeChange = (e) => {
    const newTime = Math.max(1, Math.min(120, e.target.value));
    setCustomTime(newTime);
    if (!isActive) {
      setMinutes(newTime);
    }
  };

  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <div className="time-input">
        <label>Set Time (Minutes):</label>
        <input
          type="number"
          value={customTime}
          onChange={handleTimeChange}
          min="1"
          max="120"
        />
      </div>
      <div className="timer">
        <span>{String(minutes).padStart(2, "0")}:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
      <div className="controls">
        {!isActive ? (
          <button onClick={startHandler}>Start</button>
        ) : (
          <button onClick={pauseHandler}>{isPaused ? "Continue" : "Pause"}</button>
        )}
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default App;
