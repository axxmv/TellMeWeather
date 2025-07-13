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

        const temperature = data.current.temp_f;//you looked at the json format to come up with this btw
        const condition = data.current.condition.text;
        const location = `${data.location.name}, ${data.location.region}`;
        const icon = data.current.condition.icon;

        displayWeather.innerHTML = `
        <h3>Weather for ${location}: </h3>
        <p>Temperature: ${temperature}</p>
        <p>Conditions: ${condition}</p>
        <img src = "https:${icon}" alt = ":(">
        
        
        `



    });
});

