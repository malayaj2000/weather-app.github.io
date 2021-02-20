const api = {
    key:"b557b4c141f94c54ea5c000b3df2fa07",
    base:"http://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress",setQuery);

function setQuery(evt){
    if (evt.keyCode == 13){
        getResults(searchBox.value);
        //console.log(searchBox.value);
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(weather =>{
         return weather.json();
     }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector(".location .city");
    let temp  = document.querySelector(".current .temp");
    let humidity  = document.querySelector(".current .humidity");
    let weather_el = document.querySelector(".current .weather");
    let hilow = document.querySelector(".current .hi-low");
    if(weather.cod == "404"){
        city.innerText = `city not found`;
        temp.innerHTML = `Nan<span>°c</span>`;
        humidity.innerHTML = `Humidity:Nan%`;
        weather_el.innerText = `Nan`;
        hilow.innerText = `Nan°c / Nan°c`;

    }
    else{
        city.innerText = `${weather.name} , ${weather.sys.country}`;
        
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);

        
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
        if(weather.main.temp <= 10){
            document.body.style.backgroundImage = "url('image/background2.jpg')"
        }
        else if(weather.main.temp > 10 && weather.main.temp <=35){
            document.body.style.backgroundImage = "url('image/background3.jpg')"
        }
        else if(weather.main.temp > 35){
            document.body.style.backgroundImage = "url('image/background4.jpg')"
        }
    
        humidity.innerHTML = `Humidity:${Math.round(weather.main.humidity)}%`;

        weather_el.innerText = weather.weather[0].main;

        
        hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;
    }
    
}

function dateBuilder(d){

    let months = ["January" ,"February" ,"March","April","May","June",
    "July","August","September","October","November","December" ];
    let days = ["Sunday","Monday" ,"Tuesday","Wednesday","Thursday" ,
                 "Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}

