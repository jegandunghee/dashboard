import { useEffect, useState } from "react"
import TodoForm from "./TodoForm"
import TodoList from "./TodoList"

const Todos = () => {
  // id : 현재시간 Date.now() -> 27319371321 식으로 생성됨.
  // done: true/false 
  // todo: 'text'

    //TodoForm에서 받은 값을 관리하는 State 지정 
    const [enterTask, setEnterTask] = useState([ ]);

    //Todos.js가 실행되자 마자 동작하는 useEffect 지정 
    useEffect(() => {
      //localStorage에 있는 TODOS(key)읽어오기
      const load = localStorage.getItem("TODOS");
      if(load){
        //문자열 -> 객체로 변환 
        setEnterTask(JSON.parse(load));
      }
    },[]);


    //enterTask의 값이 변하면 useEffect를 실행
    useEffect(() => {
      //enterTask를 localstorage에 저장
      // 요소를 문자열로 저장 
      const saved = JSON.stringify(enterTask);
      localStorage.setItem("TODOS", saved);
    }, [enterTask]);
  
    //todoForm에서 입력값을 전달받을 함수 지정
    const handleTaskSubmit = (list) => {
      //전달받은 값을 배열에 저장하기 
      //이전값을 받을 때는 콜백함수 사용하기
      // setEnterTask((prev) => {
      //   return [...prev, list];
      // })

      //전달 받은 값을 객체로 저장하기 
      //id : Date.now()로 고유 id 부여 
      //done : default 로 false 지정, 체크되면 true로 변경
      const newTodo = {id: Date.now(), done : false, todo : list };
      setEnterTask((prev) => {
        return [...prev, newTodo]
      });

    }

    //x 버튼 눌렀을 때 li 삭제하기 -TodoList.js
    const handleTodoDel = (id) => {
      //idx 번호에 해당되는 list 제거하기 
      //해당되는 idx를 제거한 새로운 데이터를 가진 배열 만들기(filter : 조건부 새로운 배열 만들기)
      const update = enterTask.filter((item) => {
        return item.id !== id;
      });
      setEnterTask(update)
    }

    //체크박스 설정 함수 
    const handleToggle = (id) => {
      const update = enterTask.map((list) => {
        return list.id === id ? {...list, done : !list.done} : list;
      });
      setEnterTask(update);
    }


  return (
    <div id="todo-page">
      <TodoForm onSubmitTask = {handleTaskSubmit}/>
      <TodoList save = {enterTask} onDel = {handleTodoDel} onToggle = {handleToggle}/>
    </div>
  )
}

export default Todos