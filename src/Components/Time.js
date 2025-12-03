import { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1초마다 현재 시간 갱신
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 컴포넌트 언마운트되면 타이머 제거
    return () => clearInterval(timer);
  }, []);

  // 시간 포맷 (HH:MM:SS)
  const formatted = time.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="time">
      {formatted}
    </div>
  )
}

export default Time