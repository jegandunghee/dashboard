import { useRef, useState } from "react";
import GoalModifyDel from "./GoalModifyDel";

const GoalList = ({ save, onDel, onToggle, onEdit }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  //하트 애니메이션 state
  const [heartId, setHeartId] = useState(null);

  //목표 추가
  const handleMenuToggle = (id) => {
    //메뉴 열고 닫기
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  //
  const handleEdit = (item) => {
    setEditId(item.id);
    setEditValue(item.goal);
    setOpenMenuId(null);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();

    const trimmed = editValue.trim();
    if (!trimmed) return;

    onEdit(id, trimmed);
    setEditId(null);
  };

  const triggerHeart = (id) => {
    setHeartId(id);
    setTimeout(() => {
      setHeartId(null);
    }, 800);
  };

  return (
    <ul id="goal-list" className="today-goal-list">
      {save.map((item, idx) => {
        //done : false / true
        const isDone = item.done;
        const isMenuOpen = openMenuId === item.id;
        const idEdit = editId === item.id;

        return (
          <li
            key={item.id}
            className={`goal-card ${isDone ? "goal-card-done" : ""}`}
          >
            {heartId === item.id && (
              <div className="goal-hearts">❤ ❤ ❤ ❤ ❤</div>
            )}

            <label className="goal-checkbox-wrap">
              <input
                type="checkbox"
                onChange={() => {
                  if (!isDone) {
                    triggerHeart(item.id);
                  }
                  onToggle(item.id);
                }}
              />
              {idEdit ? (
                <form
                  className="goal-edit-form"
                  onSubmit={(e) => handleEditSubmit(e, item.id)}
                >
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    autoFocus
                  />
                </form>
              ) : (
                <span className={`goal-text ${isDone ? "goal-text-done" : ""}`}>
                  {item.goal}
                </span>
              )}
            </label>

            {/* ... 메뉴 버튼 */}
            <button
              type="button"
              className="goal-menu-btn"
              onClick={() => handleMenuToggle(item.id)}
            >
              ⋯
            </button>

            {/* 수정/삭제 메뉴 */}
            {isMenuOpen && (
              <GoalModifyDel
                onEdit={() => handleEdit(item)}
                onDelete={() => onDel(item.id)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GoalList;
