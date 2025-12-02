
import { useEffect, useState } from 'react'
import Greeting from './Components/Greeting'
import Login from './Components/Login'
import Weather from './Components/Weather'
import Todos from './Components/Todos'
import Quotes from './Components/Quotes'

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
      
      { // user의 정보가 있으면 greeting화면, 없으면 login화면 
      //greeting에는 입력한 문자열 userName 넘기기  로그아웃 함수도 넘겨주기
      //Login에는 handleLogin 함수 넘기기 
      userName ? <Greeting user={userName} onLogout={handleLogout}/> : <Login onLogin={handleLogin}/>
      }
      <Quotes/>
      <Todos/>
      <Weather/>
    </div>
  )
}

export default App
