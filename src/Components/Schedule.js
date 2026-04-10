import { useState } from "react";

const Schedule = () => {
  const [schedule, setSchedule] = useState(false);
  const [items, setItems] = useState([]);
  const [inputTime, setInputTime] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputMode, setInputMode] = useState(false);

  const handleToggle = () => setSchedule(prev => !prev);
  
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) setSchedule(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!inputTime || !inputText.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), time: inputTime, text: inputText.trim() }].sort((a, b) => a.time.localeCompare(b.time)));
    setInputTime("");
    setInputText("");
    setInputMode(false);
  };

  const handleDelete = (id) => setItems(prev => prev.filter(item => item.id !== id));

  return (
    <>
      <button onClick={handleToggle}>Schedule</button>
      {schedule && (
        <>
          <div onClick={() => setSchedule(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: "transparent" }}></div>
          <div className="schedule panel" style={{ alignSelf: 'flex-start', zIndex: 101, position: "relative" }}>
            <div className="top_container">
              <p>Schedule</p>
              <p className="close" onClick={handleToggle} style={{ cursor: 'pointer' }}>×</p>
            </div>
            <div className="todo-body" style={{ marginTop: '10px' }}>
              {items.length === 0 && !inputMode && (
                <div className="todo-empty-row" style={{ textAlign: 'center', padding: '10px 0' }}>
                  <span className="todo-empty-text">일정이 없습니다</span>
                </div>
              )}
              {items.length > 0 && (
                <ul className="todo-list" style={{ listStyle: 'none', padding: 0, margin: '10px 0' }}>
                  {items.map(item => (
                    <li key={item.id} className="todo-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="todo-text"><strong>{item.time}</strong> {item.text}</span>
                      <button type="button" className="todo-del-btn" onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: '#fff' }}>-</button>
                    </li>
                  ))}
                </ul>
              )}
              {inputMode ? (
                <form className="todo-input-row" onSubmit={handleAdd} style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                  <input type="time" value={inputTime} onChange={e => setInputTime(e.target.value)} required style={{ padding: '5px' }} />
                  <input type="text" placeholder="일정" value={inputText} onChange={e => setInputText(e.target.value)} required style={{ flex: 1, padding: '5px' }} />
                  <button type="submit" className="todo-add-btn" style={{ cursor: 'pointer', padding: '5px 10px' }}>+</button>
                </form>
              ) : (
                <div className="todo-add-row" style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button type="button" className="todo-plus-btn" onClick={() => setInputMode(true)} style={{ cursor: 'pointer', fontSize: '1.2rem', background: 'transparent', border: 'none', color: '#fff' }}>+</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Schedule;