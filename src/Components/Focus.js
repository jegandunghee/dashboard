import { useState } from "react";

const Focus = () => {
  
  const [focus, setFocus] = useState(false);

  const handleToggle = () => {
    setFocus(prev => !prev);
  }


  return (
    <>
      <button onClick={handleToggle}>Focus</button>

    {
      focus && (
        <div className="focus panel">
        <div className="top_container">
          <p>Timer</p>
          <p className="close" onClick={handleToggle}>×</p>
        </div>

        <div className="timer_content">
          <p>30:00</p>
          <button>▷ Start</button>
        </div>
      </div>
      )
    }

    </>
  );
};

export default Focus;
