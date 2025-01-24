import React, { useState } from 'react';
import './index.css';

const StartReset = ({ imageURL, text, onClick }) => {
  return (
    <button className="startresetbtn" onClick={onClick}>
      <img className="image" src={imageURL} alt={text} />
      {text}
    </button>
  );
};

const DigitalTimer = () => {
  const [timer, setTimer] = useState(25 * 60); // Timer in seconds
  const [timerLimit, setTimerLimit] = useState(25); // Timer Limit in minutes
  const [isStart, setIsStart] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isTimesUp, setIsTimesUp] = useState(false);

  const onClickStartBtn = () => {
    if (!isStart) {
      setIsStart(true);
      setIsTimesUp(false);

      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(id);
            setIsStart(false);
            setIsTimesUp(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setIntervalId(id);  
    }
  };

  const onClickPauseBtn = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsStart(false);
      setIntervalId(null);
    }
  };

  const onReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTimer(timerLimit * 60);
    setIsStart(false);
    setIntervalId(null);
    setIsTimesUp(false);
  };

  const onIncrement = () => {
    if (!isStart) {
      setTimerLimit((prev) => prev + 1);
      setTimer((prevTimer) => prevTimer + 60); // Add 1 minute to timer
    }
  };

  const onDecrement = () => {
    if (!isStart && timerLimit > 1) {
      setTimerLimit((prev) => prev - 1);
      setTimer((prevTimer) => (prevTimer > 60 ? prevTimer - 60 : 60)); // Reduce 1 minute
    }
  };

  return (
    <div className="container">
      <h1 className='heading'>Digital Timer</h1>
      
      <div className="main-c">
        <div className="timer-container">
          <div className="timer">
            {isTimesUp ? (
              <h2 className='countdown'>Times Up!</h2>
            ) : (
              <h2 className='countdown'>
                {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </h2>
            )}
            {isTimesUp? null : <p className='status'>{isStart ? 'Running' : 'Paused'}</p>}
            
          </div>
        </div>
        <div className="content-c">
          <div className="startresetbtn-container">
            {isStart ? (
              <StartReset
                imageURL="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                text="Pause"
                onClick={onClickPauseBtn}
              />
            ) : (
              <StartReset
                imageURL="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                text="Start"
                onClick={onClickStartBtn}
              />
            )}
            <StartReset
              imageURL="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              text="Reset"
              onClick={onReset}
            />
          </div>
          <p className='nrml-text'>Set Timer Limit</p>
          <div className="btn-c">
            <button type="button" className="btn" onClick={onDecrement}>
              -
            </button>
            <p className="timer-limit">{timerLimit<10?`0${timerLimit}`:timerLimit}</p>
            <button type="button" className="btn" onClick={onIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTimer;
