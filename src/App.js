
import { useEffect, useState } from 'react'
import './Styles/dashboard.css';
import Weather from './Components/Weather'
import Quotes from './Components/Quotes'
import Focus from './Components/Focus';
import BookMark from './Components/BookMark';
import Schedule from './Components/Schedule';
import GoalModifyDel from './Components/GoalModifyDel';
import Center from './Components/Center';
import Todo from './Components/Todo';

const App = () => {

  //user의 정보를 전달하려면 부모 component가 전달해줘야함 
  const [userName, setUserName] = useState(null);


  //브라우저가 실행되자마자 user정보가 있는지 확인해야함 
  // user의 정보가 로컬 스토리지에 있으면 Greeting화면, 없으면 Loigin화면 
  useEffect( () => {
    const saved = localStorage.getItem("USER_NAME");
    //saved에 값이 있으면 
    if(saved){
      setUserName(saved);
    }
  },[])

  // 함수는 Login 컴포넌트로 전달되고 Login 컴포넌트에서 input으로 입력된 값을 전달받음 
  //사용자가 입력한 값은 data로 전달되고 setUserName로 userName의 값이 입력받은 data로 전달됨. 
  // 그 값은 localStorage에 저장됨.
  const handleLogin = (data) => {
    setUserName(data);
    localStorage.setItem("USER_NAME", data);
  }

  //로그아웃 되었을 때 함수 지정하기 
  const handleLogout = () => {
    localStorage.clear();
    // setUserName(null);

    //전체 페이지 
    window.location.reload();
    
  }

  


  return (
    <div id='app'>
      <Focus/>
      <BookMark/>
      <Schedule/>
      <Todo/>
      {/* 가운데 영역 */}
      <Center 
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <Weather/>
      <Quotes/>
    </div>
  )
}

export default App
