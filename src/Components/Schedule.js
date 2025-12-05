import { useState } from "react"

const Schedule = () => {

  const [schedule, setShedule] = useState(false);

  const handleToggle = () => {
    setShedule(prev => !prev);
  }

  return (
  <>
    <button onClick={handleToggle}>Schedule</button>
  {
    schedule && (
      <div className="schedule panel">
      <div className="top_container">
        <p>Schedule</p>
        <p>×</p>
      </div>
      <ul>

      </ul>
    </div>
    )
  }
  </>
    
  )
}

export default Schedule