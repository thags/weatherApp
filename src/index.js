function weatherAPICall(location){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=44568c1fa787c46f7595556abadcb26f`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => processWeatherFetch(data));
}

async function processWeatherFetch(weather){
    let temp = weather.main.temp;

    console.log(temp)
}


const fweather = weatherAPICall("lenexa");