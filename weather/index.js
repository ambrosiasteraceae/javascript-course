console.log("Hello Weather")
const dataDiv = document.querySelector(".data");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const address = document.querySelector(".address")
function prepWeatherRequest(location){
    const api_key = "XA5BVRBSVZ7NFFCJ3ZSZR4LDK";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}&unitGroup=metric`;
    const options = {
        mode : "cors"
    }
    return new Request(url, options);
}

async function getWeather(location){
    
    const request = prepWeatherRequest(location);
    fetch(request)
    .then((response) => response.json())
    .then((response)=> {
        console.log(response)
        parseWeatherResponse(response)
    })

} 

function parseWeatherResponse(json){
    response = {}
    response.adress = json.resolvedAddress;
    response.timezone = json.timezone;
    const days = [];
    json.days.forEach(day => {
        const responseDay = {}
        responseDay.datetime = day.datetime;
        responseDay.tempmax = day.tempmax;
        responseDay.tempmin = day.tempmin;
        days.push(responseDay);
    });
    response.days = days;
    // console.log(response);
    populateTempBody(response);
    
}

function populateTempBody(data){
    console.log(data)
    address.textContent = `${data.adress} - ${data.timezone}`;
    data.days.forEach(day => {
        const tr = document.createElement("tr")
        Object.values(day).forEach(val  =>{
            const td = document.createElement("td");
            td.innerHTML = val;
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    })
}



function sendLocation() {
    tbody.innerHTML = "";
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    getWeather(data.city);
  }
  
function sendDataEvent() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendLocation();
  });
}

sendDataEvent()
getWeather("london");


