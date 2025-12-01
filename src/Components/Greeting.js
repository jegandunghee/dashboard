
const Greeting = ({user, onLogout}) => {

  return (    
    <div>
      <p id="hello_page"> 안녕하세요 {user}님.</p>
      <button onClick={onLogout}>로그아웃</button>
    </div>
  )
}

export default Greeting