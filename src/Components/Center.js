
import Greeting from './Greeting'
import Login from './Login'
import Time from './Time'
import Goal from './Goal'

const Center = ({ userName, onLogin, onLogout }) => {
  /* Center에서 구현될 목록  */
  // Time, Login, Greeting, Goals
  return (
    <div className="center">
      {/* 큰 시계 */}
      <Time />
      {/* 이름있으면 greeting화면+ goal 입력, 없으면 Login */}
      {userName ? (
        <>
          {/* Good 어쩌구, user. */}
          <Greeting user={userName} onLogout={onLogout} />

          {/* 오늘의 주요 목표 질문 + 입력 + 목록 */}
          <Goal />
        </>) : ( // 이름 입력
        <Login onLogin={onLogin} /> )}
    </div>
  );
};

export default Center