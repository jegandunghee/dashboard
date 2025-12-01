import { useState } from "react"


const Login = ({onLogin}) => {

  //user 정보 관리하기 
  const [user, setUser] = useState('');

  //input창에 정보 입력 후 새로고침 방지 처리 함수 지정하기 
  const handlesubmit = (e) => {
    e.preventDefault();
    //App.js에서 전달받은 onlogin에 입력받은 값 user 전달하기 
    onLogin(user)
  }

  return (
    <form id="login_page" onSubmit={ handlesubmit}>
      <h2>이름을 입력해주세요</h2>
      <input 
        type="text"
        value={user}
        onChange={ (e) => {
          setUser(e.target.value);
        }
      }/>
      <button type="submit">입장하기</button>
    </form>
  )
}

export default Login