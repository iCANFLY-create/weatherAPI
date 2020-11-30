function geoFindMe() {
    const location = document.querySelector('.location');
    function createHtml(item) {
        var date = new Date();
        return `
            <li class="weather">
                <h3 class="weather_date">${new Date(item.dt * 1000).getMonth() + 1}/${new Date(item.dt * 1000).getDate()}</h3>
                <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="" class="icon">
                <div>
                    <span class="temparature_date">${item.temp.day}°C | </span>
                    <span class="description">${item.weather[0].description}</span>
                </div>
                <div class="weather_detail">
                    <div class="wind_speed">
                        <i class="fas fa-wind"></i>
                        <p>${item.wind_speed}m/s</p>
                    </div>
                    <div class="humidity">
                        <i class="fas fa-tint"></i>
                        <p>${item.humidity}%</p>
                    </div>
                    <div class="clouds">
                        <i class="fas fa-cloud"></i>
                        <p>${item.clouds}%</p>
                    </div>
                </div>  
            </li>
        `;
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        $.getJSON(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&APPID=3fc8817dd86f1488564d2525360003ea&units=metric`,
            (data) => {
                console.log(data);
                let daily = data.daily;

                console.log(daily);
                daily.forEach(element => {
                    location.innerHTML += createHtml(element);
                });
            }
        );
    }

    function error() {
        console.log('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

window.addEventListener('load', geoFindMe);