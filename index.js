const API_KEY = "6d8af7148d95b201735cfe8a9294c80c";

const inputi = document.querySelector("#inputi");
const butoni = document.querySelector("#butoni");
const karta = document.querySelector("#karta");
const errorDiv = document.querySelector("#error");
const loading = document.querySelector("#loading");

function getWeatherIcon(id) {
    if (id >= 200 && id < 300) return "⛈️";
    if (id >= 300 && id < 400) return "🌦️";
    if (id >= 500 && id < 600) return "🌧️";
    if (id >= 600 && id < 700) return "❄️";
    if (id >= 700 && id < 800) return "🌫️";
    if (id === 800) return "☀️";
    if (id >= 802) return "☁️";
    return "🌡️";
}

async function merreMotin() {
    const qyteti = inputi.value.trim();
    if(!qyteti) return;

    karta.style.display = "none";
    errorDiv.style.display = "none";
    loading.style.display = "block";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${qyteti}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error("Qyteti nuk u gjet");
        
        const data = await response.json();

        document.querySelector("#qyteti").textContent = data.name;
        document.querySelector("#shteti").textContent = data.sys.country;
        document.querySelector("#temperatura").textContent = `${Math.round(data.main.temp)}°`;
        document.querySelector("#ndihet").textContent = `Ndihet si ${Math.round(data.main.feels_like)}°C`;
        document.querySelector("#pershkrimi").textContent = data.weather[0].description;
        document.querySelector("#lageshti").textContent = `${data.main.humidity}%`;
        document.querySelector("#era").textContent = `${Math.round(data.wind.speed)} m/s`;
        document.querySelector("#dukshmeria").textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        document.querySelector("#ikona").textContent = getWeatherIcon(data.weather[0].id);

        loading.style.display = "none";
        karta.style.display = "block";

    } catch(error) {
        loading.style.display = "none";
        errorDiv.style.display = "block";
    }
}

butoni.addEventListener("click", merreMotin);
inputi.addEventListener("keyup", function(e) {
    if(e.key === "Enter") merreMotin();
});