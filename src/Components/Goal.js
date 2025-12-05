import { useEffect, useState } from "react"
import GoalForm from "./GoalForm"
import GoalList from "./GoalList"

const Goal = () => {
  // id : 현재시간 Date.now() -> 27319371321 식으로 생성됨.
  // done: true/false 
  // goal: 'text'

    //goalForm에서 받은 값을 관리하는 State 지정 
    const [enterTask, setEnterTask] = useState(() => {
        //localStorage에 있는 Goal(key)읽어오기
        const load = localStorage.getItem("Goal");
        //값이 있으면 변환해서 쓰고 없으면 빈배열을 기본값으로 씀
        return load ? JSON.parse(load) : [];
    });

    //enterTask의 값이 변하면 useEffect를 실행
    useEffect(() => {
      //enterTask를 localstorage에 저장
      // 요소를 문자열로 저장 
      const saved = JSON.stringify(enterTask);
      localStorage.setItem("Goal", saved);
    }, [enterTask]);
  
    //goalForm에서 입력값을 전달받을 함수 지정
    const handleTaskSubmit = (text) => {
      //trim(): 문자열의 좌우 공백을 없애주는 매서드 
      const trimmed = text.trim();
      if(!trimmed) return;

      //전달받은 값을 배열에 저장하기 
      //이전값을 받을 때는 콜백함수 사용하기
      // setEnterTask((prev) => {
      //   return [...prev, list];
      // })

      //전달 받은 값을 객체로 저장하기 
      //id : Date.now()로 고유 id 부여 
      //done : default 로 false 지정, 체크되면 true로 변경
      const newgoal = {id: Date.now(), done : false, goal : trimmed };
      setEnterTask((prev) => {
        return [...prev, newgoal]
      });

    }

    // 삭제
    const handlegoalDel = (id) => {
      //idx 번호에 해당되는 list 제거하기 
      //해당되는 idx를 제거한 새로운 데이터를 가진 배열 만들기(filter : 조건부 새로운 배열 만들기)
      // const update = enterTask.filter((item) => {
      //   return item.id !== id;
      // });
      // setEnterTask(update)

      setEnterTask((prev) => prev.filter((item) => item.id !== id));
    }

    //체크
    const handleToggle = (id) => {
      // const update = enterTask.map((list) => {
      //   return list.id === id ? {...list, done : !list.done} : list;
      // });
      // setEnterTask(update);

      setEnterTask((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      );
    }

    //수정 
    const handleEdit = (id, newText) => {
      setEnterTask((prev) => {
        prev.map((item) => 
          item.id === id ? {...item, goal: newText} : item
        )
      })
    }


  return (
    <section id="goal-page" className="today-goal">
      <p className="goal-question">오늘의 주요 목표는 무엇인가요?</p>
      <GoalForm onSubmitTask = {handleTaskSubmit}/>
      <GoalList save = {enterTask} onDel = {handlegoalDel} onToggle = {handleToggle} onEdit = {handleEdit}/>
    </section>
  )
}

export default Goal