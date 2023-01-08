// const { default: axios } = require("axios");

//Buttons that take you to the different API pages
const tv_btn = document.getElementById('findShow');
if (tv_btn) {
    tv_btn.addEventListener('click', function () {
        window.location = "./index2.html";
    })
};

const flag_btn = document.getElementById('countries');
if (flag_btn) {
    flag_btn.addEventListener('click', function () {
        window.location = "./index3.html";
    })
};

const spoon_btn = document.getElementById('spoon');
if (spoon_btn) {
    spoon_btn.addEventListener('click', function () {
        window.location = "./index4.html";
    })
};


//index2.html API call and display
const searching = document.getElementById('clickShow');

if (searching) {
    searching.addEventListener('click', async () => {
        clear();
        const findShow = document.getElementById('showSearch');
        const results = document.getElementById('showOptions');
        let url = `https://api.tvmaze.com/search/shows?q=${findShow.value}`;

        await fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            let arr = [];
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].show.image) {
                    arr.push(data[i].show.image.medium)
                };
            }
            return arr;
        }).then((arr) => {
            for (let i = 0; i < arr.length; i++) {
                let pic = document.createElement('img');
                pic.src = arr[i];
                pic.style.borderRadius = '15%';
                let showPics = document.getElementById('showOptions');
                showPics.append(pic);
                findShow.value = '';
            }
        }).catch((error) => {
            console.log(error);
        })
    });

    function clear() {
        const divs = document.getElementById('showOptions');
        const remove = (parent) => {
            while (parent.lastChild) {
                parent.removeChild(parent.lastChild);
            }
        }
        remove(divs);
    }
}

//index3.html API call and display
const flag = document.getElementById('flagImage');
const countryDiv = document.getElementById('countryDiv');
const countryInfo = document.getElementById('countryInfo');
const countrySearch = document.getElementById('countrySearch');
const searchCountryBtn = document.getElementById('searchCountry');

if (searchCountryBtn) {
    searchCountryBtn.addEventListener('click', async function () {
        await fetch(`https://restcountries.com/v3.1/name/${countrySearch.value}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            flag.src = data[0].flags.svg;
            let name = document.createElement('div');
            let capital = document.createElement('div');
            let population = document.createElement('div');
            let language = document.createElement('div');
            name.innerText = `Name: ${data[0].name.common}`;
            capital.innerText = `Capital: ${data[0].capital[0]}`;
            population.innerText = `Population: ${data[0].population}`;
            countryInfo.append(name);
            countryInfo.append(capital);
            countryInfo.append(population);
        }).catch((error) => {
            console.log(error);
        })
    })
};

//Index1 API call for weather
const weatherButton = document.getElementById('getWeather');
const searchWeather = document.getElementById('inputWeather');


if (weatherButton) {
    weatherButton.addEventListener('click', function () {
        console.log(searchWeather.value);
        let temp = async function () {
            await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchWeather.value}&limit=5&appid=d411b668b32d05c6a4d7cd0e21ef2e43`)
                .then((response) => {
                    let lat = response.data[0].lat;
                    let lon = response.data[0].lon;
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d411b668b32d05c6a4d7cd0e21ef2e43`).then((response) => {
                        console.log(response);
                        let temperature = response.data.main.temp;
                        let humid = response.data.main.humidity;
                        let cities = response.data.name;
                        let clouds = response.data.weather[0].main;
                        let winds = response.data.wind.speed;
                        let icon = response.data.weather[0].icon;
                        console.log(icon);
                        let city = document.getElementById('city');
                        let tempy = document.getElementById('temp');
                        let cloudy = document.getElementById('clouds');
                        let windy = document.getElementById('wind');
                        let iconic = document.getElementById('icon');
                        let humidity = document.getElementById('humidity');
                        city.innerText = `Weather in ${cities}`;
                        tempy.innerText = `${temperature}°F`;
                        humidity.innerText = `Humidity: ${humid}%`;
                        cloudy.innerText = `${clouds}`;
                        iconic.src = `http://openweathermap.org/img/wn/${icon}.png`;
                        iconic.style.width = "35px";
                        iconic.style.height = "35px";
                        windy.innerText = `${winds} MPH Wind`
                    })
                }).catch((error) => {
                    console.log(error);
                });

        }
        temp();
    })
};

//Index4 API call for recipes
const recipeInput = document.getElementById('recipeInput');
const recipeButton = document.getElementById('recipeButton');

if (recipeButton) {
    recipeButton.addEventListener('click', async function () {
        // const config = { Headers: { 'Content-Type': 'application/json' } }
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput.value}&apiKey=b1ebac0d443249e39c5842486e07f137`).then((response) => {
            let recipeArr = [];
            let data = response.data.results[0].id;
            console.log(response.data.results);
            for (let i = 0; i < response.data.results.length; i++) {
                recipeArr.push(response.data.results[i].id);
            }
            return recipeArr;
        }).then((data) => {
            for (let j = 0; j < data.length; j++) {
                axios.get(`https://api.spoonacular.com/recipes/${data[j]}/information?includeNutrition=false&apiKey=b1ebac0d443249e39c5842486e07f137`).then((response) => {
                    let yummy = response.data.spoonacularSourceUrl;
                    let item = document.createElement('li');
                    item.append(yummy);
                    let recipe = document.getElementById('recipeList');
                    recipe.append(item);
                })
            };
        })
    })
}



