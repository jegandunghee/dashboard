import { useState, useEffect } from "react";

const Focus = () => {
  const [focus, setFocus] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert("타이머가 종료되었습니다!");
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleToggle = () => {
    setFocus(prev => !prev);
  }

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setFocus(false);
    }
  }

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  }

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1800);
  }

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <>
      <button onClick={handleToggle}>Focus</button>

      {focus && (
        <>
          <div onClick={() => setFocus(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: "transparent" }}></div>
          <div className="focus panel" style={{ alignSelf: 'flex-start', zIndex: 101, position: "relative" }}>
            <div className="top_container">
              <p>Timer</p>
              <p className="close" onClick={handleToggle} style={{ cursor: 'pointer' }}>×</p>
            </div>

            <div className="timer_content">
              <p>{minutes}:{seconds}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={toggleTimer} style={{ cursor: 'pointer' }}>{isRunning ? "Pause" : "▷ Start"}</button>
                <button onClick={resetTimer} style={{ cursor: 'pointer' }}>Reset</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Focus;
