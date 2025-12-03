
import Greeting from './Greeting'
import Login from './Login'
import Time from './Time'
import Todos from './Todos'

const Center = ({ userName, onLogin, onLogout }) => {
  return (
    <div className="center">
      {/* 큰 시계 */}
      <Time />

      
      {userName ? (
        <>
          {/* Good 어쩌구, user. */}
          <Greeting user={userName} onLogout={onLogout} />

          {/* 오늘의 주요 목표 질문 + 입력 + 목록 */}
          <Todos />
        </>
      ) : (
        // 이름 입력
        <Login onLogin={onLogin} />
      )}
    </div>
  );
};

export default Center