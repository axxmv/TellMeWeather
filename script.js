const apikey = "de9c3ad0b03842748a6154632251207";
const baseUrl = "https://api.weatherapi.com/v1";

const displayWeather = document.getElementById("displayWeather");
const cityInput = document.getElementById("cityInput");
const stateInput = document.getElementById("stateInput");
const button = document.getElementById("getData");



button.addEventListener("click", function()
{
    let city = cityInput.value;
    let state = stateInput.value;

    let query = state ? `${city},${state}` : city;
    //const url = `${baseUrl}/current.json?key=${apikey}&q=${encodeURIComponent(query)}`;
    const url = `${baseUrl}/forecast.json?key=${apikey}&q=${encodeURIComponent(query)}&days=5`;

    displayWeather.innerHTML = "Getting Weather Information";


    fetch(url) 
    .then(res => res.json())
    .then(data=>{

        const temperatureF = data.current.temp_f;//you looked at the json format to come up with this btw
        const temperatureC = data.current.temp_c;
        const condition = data.current.condition.text;
        const location = `${data.location.name}, ${data.location.region}`;
        const icon = data.current.condition.icon;

        const uom = document.getElementById("uom");


        if(uom.checked)
        {
        displayWeather.innerHTML = `
        <h3>Weather for ${location}: </h3>
        <p>Temperature: ${temperatureC}</p>
        <p>Conditions: ${condition}</p>
        <img src = "https:${icon}" alt = ":(">
        `
        }
        else
        {
            displayWeather.innerHTML = `
            <h3>Weather for ${location}: </h3>
            <p>Temperature: ${temperatureF}</p>
            <p>Conditions: ${condition}</p>
            <img src = "https:${icon}" alt = ":(">
            `

        }
        display5day(data, uom.checked);


    });
});


const current_location = document.getElementById("current_location");
current_location.addEventListener("click", function()
{

    //navigator is an object in all browsers
    //geolocation is a property of navigator
    //getCurrentPosition is the function
    navigator.geolocation.getCurrentPosition(success, error); //success is a function( a callback function)

});

function success(position)
{
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    lonlatweather(lat, lon);

};
function error(err) //required in order for the geolocation to work
{
    displayWeather.innerHTML = `<p>Geolocation error: ${err.message}</p>`;
    console.error("Geolocation error:", err);
}
function lonlatweather(lat, lon)
{
    //const url = `${baseUrl}/current.json?key=${apikey}&q=${lat},${lon}`
    const url = `${baseUrl}/forecast.json?key=${apikey}&q=${lat},${lon}&days=5`;
    console.log("Fetching weather from:", url);


    fetch(url)
    .then(res => res.json())
    .then(data =>{

        const temperatureF = data.current.temp_f;//you looked at the json format to come up with this btw
        const temperatureC = data.current.temp_c;
        const condition = data.current.condition.text;
        const location = `${data.location.name}, ${data.location.region}`;
        const icon = data.current.condition.icon;

        const uom = document.getElementById("uom");

        if(uom.checked)
        {
        displayWeather.innerHTML = `
        <h3>Weather for ${location}: </h3>
        <p>Temperature: ${temperatureC}</p>
        <p>Conditions: ${condition}</p>
        <img src = "https:${icon}" alt = ":(">
        `
        }
        else
        {
            displayWeather.innerHTML = `
            <h3>Weather for ${location}: </h3>
            <p>Temperature: ${temperatureF}</p>
            <p>Conditions: ${condition}</p>
            <img src = "https:${icon}" alt = ":(">
            `
        }
        display5day(data, uom.checked);
    });

}

function display5day(data, useCelsius)
{
    //forecastday is an array property provided by the api

    //now days is an array we defined using the info from the api
    let days = data.forecast.forecastday;
    let unit = useCelsius ? "°C" : "°F";
    let forecastHTML = "";

    days.forEach(function(day)//forEach expects a function so it can call it for each item
    {
        let rawDate = new Date(day.date);// Convert the date string from API into a JavaScript Date object

        let weekday = rawDate.toLocaleDateString(undefined, {weekday:'short'});
        let month = rawDate.toLocaleDateString(undefined, { month: 'short' });
        let dateNumber = rawDate.getDate(); // just the number of the day (e.g. 14)

        let icon = day.day.condition.icon;
        let text = day.day.condition.text;
        let max = useCelsius ? day.day.maxtemp_c : day.day.maxtemp_f;
        let min = useCelsius ? day.day.mintemp_c : day.day.mintemp_f;

        forecastHTML +=
        `
        <p><strong>${weekday}, ${month} ${dateNumber}</strong></p>
        <img src = "https:${icon}">
        <p>${text}</p>
        <p>↑ ${max}${unit}</p>
        <p>↓ ${min}${unit}</p>
        `;

        
    });

    let forecastWeather = document.getElementById("forecastWeather");
    forecastWeather.innerHTML = forecastHTML;

}