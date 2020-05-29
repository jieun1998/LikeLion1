//사용자의 위도 경도 받기 -> 그것에서 온도와 장소 뽑아내기 -> html에 추가해주기
const API_KEY = "6f79bee82508c9fc6f8f28a0970f85a0";
const weather = document.querySelector(".js-weather");
const COORDS = "coords";

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}//JSON 형태로 위도와 경도를 인터넷에 저장

function handlesuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    }; // coordsobj = 위도, 경도
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handlerror(){
    console.log('error');
}

function askforPosition() {
    navigator.geolocation.getCurrentPosition(handlesuccess, handlerror);
}

function getWeather(lat,long){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature =json.main.temp;
        const place = json.name;
        weather.innerText = `오늘의 온도 : ${temperature}도(섭씨) and 장소: ${place}`;

    })
}

function loadedCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askforPosition();
    }else {
        const parsecoords = JSON.parse(loadedCoords);
        getWeather(parsecoords.latitude,parsecoords.longitude);
    
}
}//위도와 경도를 집어넣어서 온도와 장소를 가져오는 함수



function init(){
    loadedCoords();
}//실행할것

init();