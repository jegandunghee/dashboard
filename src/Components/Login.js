import { useState } from "react";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // .trim() : 문자열의 좌우 공백 제거하는 메서드
    user.trim();
    const name = user.trim();
    if (!name) return;
    onLogin(name);
  };

  return (
    <form id="login-page" onSubmit={handleSubmit}>
      <input
        type="text"
        className="login-input"
        placeholder="이름을 입력하세요"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      {/* 접근성용, 화면에는 안 보이게 숨기는 버튼 */}
      <button type="submit" className="login-submit">
        입장하기
      </button>
    </form>
  );
};

export default Login;
