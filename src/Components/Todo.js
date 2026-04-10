import { useState } from "react";

const Todo = () => {
  // 패널 열림/닫힘
  const [isOpen, setIsOpen] = useState(false);

  // 현재 남아 있는 할 일 목록
  const [todos, setTodos] = useState([]);

  // 입력 모드 여부 (비어 있을 때/리스트 아래에서 모두 사용)
  const [inputMode, setInputMode] = useState(false);

  // 입력 값
  const [input, setInput] = useState("");

  const [openMenuId, setOpenMenuId] = useState(null);

  const handleTogglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setIsOpen(false);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // + 버튼 눌렀을 때: 입력 줄 열기
  const handleOpenInput = () => {
    setInputMode(true);
  };

  // 입력 줄에서 엔터 / + 버튼으로 추가
  const handleAdd = (e) => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) {
      // 아무 것도 안 쓰고 엔터치면 그냥 입력모드만 닫기
      setInputMode(false);
      return;
    }

    const newItem = {
      id: Date.now(),
      text: trimmed,
      checked: false
    };

    setTodos((prev) => [...prev, newItem]);
    setInput("");
    setInputMode(false);
  };

  // 삭제
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheck = (id) => {
    // 풀기/체크 토글
    setTodos((prev) =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const currentCount = todos.length;
  const doneCount = todos.filter(item => item.checked).length;

  return (
    <>
      {/* 패널 열기 버튼 */}
      <button onClick={handleTogglePanel}>Todo</button>

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 90, background: "transparent" }}></div>
          <div className="todo panel" style={{ alignSelf: 'flex-start', zIndex: 101, position: "relative" }}>
            {/* 상단 타이틀 + X */}
            <div className="top_container">
              <p>Todo</p>
              <p className="close" onClick={handleTogglePanel} style={{ cursor: 'pointer' }}>
                ×
              </p>
            </div>

            {/* 완료 카운트 */}
            <div className="todo-status">
              <span>
                {doneCount} / {currentCount} 완료
              </span>
            </div>

            {/* 본문 영역 */}
            <div className="todo-body">
              {/* 1) 아직 아무 목표도 없고, 입력 모드가 아닐 때 */}
              {currentCount === 0 && !inputMode && (
                <div className="todo-empty-row">
                  <span className="todo-empty-text">아직 목표가 없습니다</span>
                  <button
                    type="button"
                    className="todo-plus-btn"
                    onClick={handleOpenInput}
                  >
                    +
                  </button>
                </div>
              )}

              {/* 2) 리스트가 있을 때 */}
              {currentCount > 0 && (
                <ul className="todo-list">
                  {todos.map((item) => (
                    <li key={item.id} className="todo-item" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="checkbox" 
                        checked={item.checked || false} 
                        onChange={() => handleCheck(item.id)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span className="todo-text" style={{ flex: 1, textDecoration: item.checked ? 'line-through' : 'none', color: item.checked ? '#aaa' : 'inherit' }}>
                        {item.text}
                      </span>
                      <button
                        type="button"
                        className="todo-menu-btn"
                        onClick={() => setOpenMenuId(prev => prev === item.id ? null : item.id)}
                      >
                        ⋯
                      </button>

                      {openMenuId === item.id && (
                        <div style={{ position: 'absolute', right: '0', top: '100%', background: '#fff', borderRadius: '8px', boxShadow: '0 6px 20px rgba(0,0,0,0.25)', zIndex: 110 }}>
                          <p onClick={() => { handleDelete(item.id); setOpenMenuId(null); }} style={{ padding: '8px 16px', margin: 0, cursor: 'pointer', color: 'red', fontSize: '14px' }}>삭제하기</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* 3) 입력 모드일 때 (비었든/안 비었든 공통) */}
              {inputMode && (
                <form className="todo-input-row" onSubmit={handleAdd}>
                  <input
                    type="text"
                    placeholder="여기에 작성해주세요"
                    value={input}
                    onChange={handleChange}
                    autoFocus
                  />
                  <button type="submit" className="todo-add-btn">
                    +
                  </button>
                </form>
              )}

              {/* 4) 리스트가 있고, 아직 입력 모드가 아닐 때: 아래쪽 + 버튼만 */}
              {currentCount > 0 && !inputMode && (
                <div className="todo-add-row">
                  <button
                    type="button"
                    className="todo-plus-btn"
                    onClick={handleOpenInput}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Todo;
