import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ location, isFallback }) => {
  //api key , icon 정보 가져오기
  const KEY = "daf6c925c4d9f3dcc02bc79741bc5f8d";

  /* 상태관리 useState */
  // 날씨 정보 관리
  const [weather, setWeather] = useState(null);
  //위치정보 사용 불가능 시 error 출력
  const [error, setError] = useState(null);
  //로딩화면 관리 (다 읽었는지, 읽는 중인지)
  const [loading, setLoading] = useState(false);
  //날씨 아이콘 관리
  const [iconUrl, setIconUrl] = useState(null);

  //날씨 api 호출하는 함수 지정하기, open weather의 api 따와서 저장해두기
  const fetchWeather = async (lat, long) => {
    //try-catch문 사용하기
    try {
      //시작 : 에러 x, 데이터 요청 시 url 읽기 시작
      setError("");
      setLoading(true);
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${KEY}&units=metric&lang=kr`;

      //axios.get으로 url에 있는 정보 프로미스(?) 형식으로 불러오기
      const res = await axios.get(URL);

      //가져온 정보에 들어있는 데이터를 불러오면 json형식으로 불러와짐
      setWeather(res.data);

      //날씨에 맞는 아이콘 정보 가져오기
      //아이콘 코드값 가져오기 (res.data에서 가져오기 )
      if (res.data.weather && res.data.weather.length > 0) {
        const iconCode = res.data.weather[0].icon;
        const ICON = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        setIconUrl(ICON);
      }
    } catch (err) {
      setError("날씨 정보를 가져올 수 없습니다." + err.message);
    } finally {
      //다 읽고 로딩이 멈추면 false로 변환
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  return (
    <div id="weather-page">
      {/* 로딩중일 때  */}
      {loading && <p className="loading">날씨 정보를 가져오는중..</p>}

      {/* 에러가 생겼을 때 */}
      {error && <p className="error">{error}</p>}

      {/* 위치 정보 불러오기  */}
      {!weather && !loading && !error && <p>날씨 정보를 기다리는중..!</p>}

      {weather && (
        <div className="weather-wrap">
          {iconUrl && (
            <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
          )}
          <p>도시 : {isFallback ? "서울(임시) " : weather.name}</p>
          <p>현재온도 : {weather.main.temp}℃ </p>
          <p>체감온도 : {weather.main.feels_like}℃ </p>

        </div>
      )}
    </div>
  );
};

export default Weather;
