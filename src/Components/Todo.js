import { useState } from "react";

const Todo = () => {
  const [todo, setTodo] = useState(false);

  const handleToggle = () => {
    setTodo((prev) => !prev);
  };
  return (
    <>
      <button onClick={handleToggle}>todo</button>

      {todo && (
        <div className="todo panel">
          <div className="top_container">
            <p>Todo</p>
            <p className="close" onClick={handleToggle}>
              ×
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
