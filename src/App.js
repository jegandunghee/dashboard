
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

  const [userName, setUserName] = useState(null);
  const [location, setLocation] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    // Theme logic
    const updateTheme = () => {
      const currentHour = new Date().getHours();
      // 06:00 to 17:59:59 is Light mode
      if (currentHour >= 6 && currentHour < 18) {
        document.body.className = "light";
      } else {
        document.body.className = "dark";
      }
    };
    updateTheme();
    const themeTimer = setInterval(updateTheme, 60000);

    // Check geolocation
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
          setIsFallback(false);
        },
        (err) => {
          // Fallback to Seoul
          setLocation({ lat: 37.5665, lon: 126.9780 });
          setIsFallback(true);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Fallback to Seoul
      setLocation({ lat: 37.5665, lon: 126.9780 });
      setIsFallback(true);
    }

    // Check user info
    const saved = localStorage.getItem("USER_NAME");
    if(saved){
      setUserName(saved);
    }

    return () => clearInterval(themeTimer);
  }, []);

  const handleLogin = (data) => {
    setUserName(data);
    localStorage.setItem("USER_NAME", data);
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div id='app'>
      <div className="left-menus">
        <Focus/>
        <BookMark/>
        <Schedule/>
        <Todo/>
      </div>
      {/* 가운데 영역 */}
      <Center 
        userName={userName}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isFallback={isFallback}
      />

      <Weather location={location} isFallback={isFallback} />
      <Quotes/>
    </div>
  )
}

export default App
