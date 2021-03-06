import "./styles.css";

class weatherObject {
    constructor(description, icon, feelsLike, humidity, temp, tempMax, tempMin, location){
        this.description = description;
        this.icon = icon;
        this.feelsLike = feelsLike;
        this.humidity = humidity;
        this.temp = temp;
        this.tempMax = tempMax;
        this.tempMin = tempMin;
        this.location = location;
        this.domUpdateWeatherIcon();
        this.domUpdateInfo();
    };
    async domUpdateWeatherIcon(){
        const weatherIconLocation = document.querySelector('#weatherIcon');
        weatherIconLocation.src = `https://openweathermap.org/img/wn/${this.icon}@2x.png`
        
    }
    domUpdateInfo(){
        const locationCon = document.querySelector('#locationName');
        const tempCon = document.querySelector('#temp');
        const feelsLikeCon = document.querySelector('#feelsLike');
        const descriptionCon = document.querySelector('#description');

        locationCon.innerText = this.location;
        tempCon.innerText = this.temp;
        feelsLikeCon.innerText = this.feelsLike;
        descriptionCon.innerText = this.description;

    }
};

function weatherAPICall(location, units="imperial"){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=44568c1fa787c46f7595556abadcb26f&units=${units}`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => processWeatherFetch(data));
}

async function processWeatherFetch(weather){
    const description = weather.weather[0].description;
    const icon = weather.weather[0].icon;
    const feelsLike = weather.main.feels_like;
    const humidity = weather.main.humidity;
    const temp = weather.main.temp;
    const tempMax = weather.main.temp_max;
    const tempMin = weather.main.temp_min;
    const location = weather.name;

    new weatherObject(description, icon, feelsLike, humidity, temp, tempMax, tempMin, location);
}

function submitButtonPressed(){
    const input = document.querySelector('#location');
    weatherAPICall(input.value);
    switchInput();
}

function searchButtonPressed(){
    const locationName = document.querySelector('#locationName').style.display;
    if (locationName === "" || locationName === "flex"){
        switchInput();
    };
};


function switchInput(){
    const inputForm = document.querySelector('#inputForm');
    const locationName = document.querySelector('#locationName');
    const inputDisplay = inputForm.style.display;
    if (inputDisplay === "" || inputDisplay === "none"){
        inputForm.style.display = "flex";
        locationName.style.display = "none";
        console.log(inputForm.style.display)
    } else if (inputDisplay === "flex"){
        inputForm.style.display = "none";
        locationName.style.display = "flex";
    }
}

document.querySelector('.inputButton').addEventListener('click', submitButtonPressed);
document.querySelector('#searchSpan').addEventListener('click', searchButtonPressed);
const fweather = weatherAPICall("Los Angeles", "imperial");