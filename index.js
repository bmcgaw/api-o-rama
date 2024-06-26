// const { default: axios } = require("axios");

//Buttons that take you to the different API pages
const tv_btn = document.getElementById("findShow");
if (tv_btn) {
  tv_btn.addEventListener("click", function () {
    window.location = "./index2.html";
  });
}

const flag_btn = document.getElementById("countries");
if (flag_btn) {
  flag_btn.addEventListener("click", function () {
    window.location = "./index3.html";
  });
}

const spoon_btn = document.getElementById("spoon");
if (spoon_btn) {
  spoon_btn.addEventListener("click", function () {
    window.location = "./index4.html";
  });
}

const pokemon = document.getElementById("pokemon");
if (pokemon) {
  pokemon.addEventListener("click", function () {
    window.location = "./index5.html";
  });
}

const seinfeld = document.getElementById("seinfeld");
if (seinfeld) {
  seinfeld.addEventListener("click", function () {
    window.location = "./index6.html";
  });
}

//Clock
const getTime = function () {
  let time = new Date();
  let hours = time.getHours();
  let mins = time.getMinutes();
  let ampm = "AM";
  if (time.getHours() >= 12) {
    ampm = "PM";
  }
  if (hours > 12) {
    hours = hours % 12;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  let clock = document.getElementById("clock");
  if (clock) {
    clock.innerText = `${hours}:${mins} ${ampm}`;
  }
};
setInterval(getTime, 500);

//Index1 API call for weather
const weatherButton = document.getElementById("getWeather");
const searchWeather = document.getElementById("inputWeather");

if (weatherButton) {
  weatherButton.addEventListener("click", function () {
    console.log(searchWeather.value);
    let temp = async function () {
      await axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchWeather.value}&limit=5&appid=d411b668b32d05c6a4d7cd0e21ef2e43`
        )
        .then((response) => {
          let lat = response.data[0].lat;
          let lon = response.data[0].lon;
          searchWeather.value = "";
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=d411b668b32d05c6a4d7cd0e21ef2e43`
            )
            .then((response) => {
              let temperature = response.data.main.temp;
              let humid = response.data.main.humidity;
              let cities = response.data.name;
              let clouds = response.data.weather[0].main;
              let winds = response.data.wind.speed;
              let icon = response.data.weather[0].icon;
              let city = document.getElementById("city");
              let tempy = document.getElementById("temp");
              let cloudy = document.getElementById("clouds");
              let windy = document.getElementById("wind");
              let iconic = document.getElementById("icon");
              let humidity = document.getElementById("humidity");
              city.innerText = `Weather in ${cities}`;
              tempy.innerText = `${temperature}°F`;
              humidity.innerText = `Humidity: ${humid}%`;
              cloudy.innerText = `${clouds}`;
              iconic.src = `http://openweathermap.org/img/wn/${icon}.png`;
              iconic.style.width = "35px";
              iconic.style.height = "35px";
              windy.innerText = `${winds} MPH Wind`;
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    temp();
  });
}

//index2.html API call and display
const searching = document.getElementById("clickShow");

if (searching) {
  searching.addEventListener("click", async () => {
    clear();
    const findShow = document.getElementById("showSearch");
    const results = document.getElementById("showOptions");
    let url = `https://api.tvmaze.com/search/shows?q=${findShow.value}`;

    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].show.image) {
            arr.push(data[i].show.image.medium);
          }
        }
        return arr;
      })
      .then((arr) => {
        for (let i = 0; i < arr.length; i++) {
          let pic = document.createElement("img");
          pic.src = arr[i];
          pic.className = "movieImg";
          pic.style.borderRadius = "15%";
          let showPics = document.getElementById("showOptions");
          showPics.append(pic);
          findShow.value = "";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function clear() {
    const divs = document.getElementById("showOptions");
    const remove = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    };
    remove(divs);
  }
}

//index3.html API call and display
const countrySearch = document.getElementById("countrySearch");
const searchCountryBtn = document.getElementById("searchCountry");
const countryDiv = document.getElementById("countryDiv");

if (searchCountryBtn) {
  searchCountryBtn.addEventListener("click", async function () {
    clearCountryFlag();
    await fetch(`https://restcountries.com/v3.1/name/${countrySearch.value}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        countrySearch.value = "";
        const flag = document.createElement("img");
        flag.id = "flagImage";
        flag.src = data[0].flags.svg;
        countryDiv.append(flag);
        let langArr = Object.values(data[0].languages);
        document.getElementById(
          "name"
        ).innerText = `Name: ${data[0].name.common}`;
        document.getElementById(
          "capital"
        ).innerText = `Capital: ${data[0].capital[0]}`;
        document.getElementById(
          "population"
        ).innerText = `Population: ${data[0].population}`;
        document.getElementById(
          "language"
        ).innerText = `Languages: ${langArr.toString()}`;
        let maps = document.getElementById("map");
        maps.href = data[0].maps.googleMaps;
        maps.innerText = `Click here to see a map!`;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

function clearCountryFlag() {
  let flagPic = document.getElementById("flagImage");
  if (flagPic) {
    countryDiv.removeChild(flagPic);
  }
}

//Index4 API call for recipes
const recipeInput = document.getElementById("recipeInput");
const recipeButton = document.getElementById("recipeButton");

if (recipeButton) {
  recipeButton.addEventListener("click", async function () {
    clearFood();
    await axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeInput.value}&apiKey=b1ebac0d443249e39c5842486e07f137`
      )
      .then((response) => {
        let recipeBook = response.data.results;
        console.log(recipeBook);
        return recipeBook;
      })
      .then((recipeBook) => {
        for (let i = 0; i < recipeBook.length; i++) {
          let iD = recipeBook[i].id;
          const menu = document.getElementById("recipe_menu");
          let card = document.createElement("div");
          card.className = "menuCard";
          let mealName = document.createElement("p");
          mealName.className = "mealTitle";
          mealName.innerText = recipeBook[i].title;
          let foodPic = document.createElement("img");
          foodPic.src = recipeBook[i].image;
          foodPic.className = "mealPic";
          card.append(mealName);
          card.append(foodPic);
          menu.append(card);
          axios
            .get(
              `https://api.spoonacular.com/recipes/${iD}/information?includeNutrition=false&apiKey=b1ebac0d443249e39c5842486e07f137`
            )
            .then((response) => {
              let link = response.data.spoonacularSourceUrl;
              let recipeBtn = document.createElement("button");
              let recipeLink = document.createElement("a");
              recipeBtn.className = "recipesBtn";
              recipeLink.className = "recipesLink";
              recipeBtn.innerText = "Get recipe!";
              recipeLink.href = link;
              recipeLink.append(recipeBtn);
              card.append(recipeLink);
            });
          recipeInput.value = "";
        }
      })
      .catch((error) => {
        console.log(error);
        let err = document.createElement("p");
        err.innerText = "Sorry please try again";
        err.style.color = "orange";
        err.style.fontWeight = "bold";
        const menu = document.getElementById("recipe_menu");
        menu.append(err);
      });
  });
}

function clearFood() {
  const divs = document.getElementById("recipe_menu");
  const remove = (parent) => {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  };
  remove(divs);
}

//Index 5 API call
const typeColor = {
  bug: "#26de81",
  dragon: "#Ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "0190FF",
};

const pokeBall = document.getElementById("poke_ball");
if (pokeBall) {
  pokeBall.addEventListener("click", async function () {
    let num = Math.floor(Math.random() * 150) + 1;
    await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .then((response) => {
        let result = response.json();
        console.log(result);
        return result;
      })
      .then((result) => {
        let name = document.getElementById("pokemon_name");
        name.innerText = result.name[0].toUpperCase() + result.name.slice(1);
        let hp = document.getElementById("pokemon_hp");
        hp.innerText = result.stats[0].base_stat + " HP";
        let pic = document.getElementById("pokemon_pic");
        pic.src = result.sprites.other.dream_world.front_default;
        let move1 = document.getElementById("move1");
        let move2 = document.getElementById("move2");
        move1.innerText =
          result.moves[0].move.name[0].toUpperCase() +
          result.moves[0].move.name.slice(1);
        move2.innerText =
          result.moves[1].move.name[0].toUpperCase() +
          result.moves[1].move.name.slice(1);
        let type = document.getElementById("type");
        type.innerText =
          result.types[0].type.name[0].toUpperCase() +
          result.types[0].type.name.slice(1);
        let card = document.getElementById("pokemon_card");
        let color = typeColor[result.types[0].type.name];
        card.style.backgroundColor = color;
        move1.style.backgroundColor = color;
        move2.style.backgroundColor = color;
        type.style.backgroundColor = color;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

//Index 6 Seinfeld API call
const quoteBtn = document.getElementById("seinfeld-quote-btn");

if (quoteBtn) {
  quoteBtn.addEventListener("click", async function () {
    await axios
      .get("http://localhost:8000/quotes")
      .then((response) => {
        let num = Math.floor(Math.random() * 20) + 1;
        let quote = response.data.data[0][num].quote;
        let character = response.data.data[0][num].character;
        const quoteText = document.getElementById("seinfeld-quote");
        quoteText.innerText = `${quote}`;
        const quoteCharacter = document.getElementById("seinfeld-character");
        quoteCharacter.innerText = `-${character}`;
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
