import { useState } from "react";

const TodoForm = ({ onSubmitTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    //기존기능 방지
    e.preventDefault();
    //전송이 되면 보여지는 입력값 저장
    setTask("");

    //props로 task값 전달하기
    onSubmitTask(task);
  };

  // const handleKeyDown = (e) => {
  //   if(e.code === "KeyA"){
  //     setView(task);
  //   }else{
  //     setView('');
  //   }
  // }

  return (
    <div id="todo-form">
      <h2>할 일 내용을 입력하세요</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          //특정 키를 누를 때 이벤트 처리하기
          // onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  );
};

export default TodoForm;
