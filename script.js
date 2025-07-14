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
    const url = `${baseUrl}/current.json?key=${apikey}&q=${encodeURIComponent(query)}`;

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



    });
});


const current_location = document.getElementById("current_location");
current_location.addEventListener("click", function()
{
    console.log("working");
    alert("working");

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
    const url = `${baseUrl}/current.json?key=${apikey}&q=${lat},${lon}`
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
    });

}