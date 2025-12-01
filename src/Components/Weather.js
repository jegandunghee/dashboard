import { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
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

      //어떤 데이터가 포함되어져있는지 console.log로 확인하기
      // console.log(res.data);

      //가져온 정보에 들어있는 데이터를 불러오면 json형식으로 불러와짐
      setWeather(res.data);

      //날씨에 맞는 아이콘 정보 가져오기
      //아이콘 코드값 가져오기 (res.data에서 가져오기 )
      const iconCode = res.data.weather[0].icon;
      const ICON = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      setIconUrl(ICON);
    } catch (err) {
      setError("날씨 정보를 가져올 수 없습니다." + err.message);
    } finally {
      //다 읽고 로딩이 멈추면 false로 변환
      setLoading(false);
    }
  };

  //사용자 위치정보 불러오기
  //실행되자마자 한번만 실행되도록 설정 useEffect( () => {}, []);
  useEffect(() => {
    //.getCurrentPosition( )사용을 위한 option 설정하기
    const options = {
      enableHighAccuracy: true, //가능한 정확하게
      timeout: 5000, //5초안에 못가져오면 에러
      maximumAge: 0, //캐시된 위치를 쓰지 않기
    };

    // 위치정보 사용 가능 여부 확인하기
    if ("geolocation" in navigator) {
      /* 위치정보 사용 가능  -> .getCurrentPosition( ) 사용하기*/
      navigator.geolocation.getCurrentPosition(
        //.getCurrentPosition()사용 시 성공, 에러, option값 각각 지정하기 
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          // console.error(err);
          setError("위치 정보를 가져올 수 없습니다.");
        },
        options);
    } else {
      /* 위치정보 사용 불가능 -> error 출력 */
      alert(setError("이 브라우저에서는 위치 정보 사용이 불가능합니다."));
    }
  }, []);

  return (
    <div id="weather-page">
      {/* 로딩중일 때  */}
      {loading && <p className="loading">날씨 정보를 가져오는중..</p>}

      {/* 에러가 생겼을 때 */}
      {error && <p className="error">위치 정보 사용이 불가능합니다.😭</p>}

      {/* 위치 정보 불러오기  */}
      {!weather && <p>날씨 정보를 기다리는중..!</p>}

      {weather && (
        <>
          <h2>현재 위치 기준 날씨</h2>
          <p>도시 : {weather.name}</p>
          <p>기온 : {weather.main.temp}℃</p>
          <p>체감온도 : {weather.main.feels_like}℃</p>
          <p>날씨 설명 : {weather.weather[0].description}🌞</p>
          {iconUrl && (
            <img src={iconUrl} alt={weather.weather[0].description} />
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
