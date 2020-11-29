var apiKey = "c91773251f63db01df3cd6ca70045ea5";

// Locage storage
var savedSearch = JSON.parse(localStorage.getItem("PreviousForecastSearches")) || [];

// Adds title case to search term(s), solution found on https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
function titleCase(str) {

    str = str.toLowerCase().split(' ');

    for (var i = 0; i < str.length; i++) {

        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
}

// Renders the list group item buttons when the page loads based on city values contained in local storage
for (i = 0; i < savedSearch.length; i++) {

    var createBtn = $(`<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>`);

    $("#btnContainer").prepend(createBtn);
}

// Converts unix timestamp to date, solution found on https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function getDate(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + "/" + date + "/" + year;
    return time;
}

// Calls the API for current weather date, icon, temp, humidity, and windspeed
function retrieveWeather(city) {

    console.log("Button Click");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (results) {

            console.log(results);

            var currentDate = getDate(results.dt);

            $("#currentCityName").text(results.name);

            $("#currentDay").text("(" + currentDate + ")");

            $("#mainIcon").attr("src", "https://openweathermap.org/img/wn/" + (results.weather[0].icon) + "@2x.png");

            $("#currentCityTemp").text("Temperature: " + results.main.temp + "° F");

            $("#currenCityHumidity").text("Humidity: " + results.main.humidity + "%");

            $("#windSpeed").text("Wind Speed: " + results.wind.speed + " mph");

            retrieveUVfiveday(results.coord.lat, results.coord.lon);
        })
}

// retrieveWeather passes the city coordinate data into retrieveUVfiveday which retrieves/color codes uv index, and then retrieves date, icon, temp and humidity for the five day forecast
function retrieveUVfiveday(lattitude, longitude) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (oneCallResults) {

            console.log(oneCallResults);

            $("#uvIndex").removeClass();

            $("#uvIndex").text(oneCallResults.current.uvi);

            if (oneCallResults.current.uvi < 3) {

                $("#uvIndex").addClass("uv-low text-white p-1 rounded");

            }

            else if (oneCallResults.current.uvi >= 3 && oneCallResults.current.uvi < 6) {

                $("#uvIndex").addClass("uv-moderate text-black p-1 rounded");
            }

            else if (oneCallResults.current.uvi >= 6 && oneCallResults.current.uvi < 8) {

                $("#uvIndex").addClass("uv-high text-white p-1 rounded");
            }

            else if (oneCallResults.current.uvi >= 8 && oneCallResults.current.uvi < 11) {

                $("#uvIndex").addClass("uv-very-high text-white p-1 rounded");
            }

            else if (oneCallResults.current.uvi >= 11) {

                $("#uvIndex").addClass("uv-extreme text-white p-1 rounded");
            }

            for (i = 1; i < 6; i++) {

                $("#forecastDate" + i).text(getDate(oneCallResults.daily[i].dt));

                $("#forecastIcon" + i).attr("src", "https://openweathermap.org/img/wn/" + (oneCallResults.daily[i].weather[0].icon) + "@2x.png");

                $("#forecastTemp" + i).text("Temp: " + oneCallResults.daily[i].temp.day + "° F");

                $("#forecastHumidity" + i).text("Humidity: " + oneCallResults.daily[i].humidity + "%");
            }

            // Removes the "hide" class from the weather display section of the page
            $("#display-weather").removeClass("d-none");
        })
}


// Search city onclick of search button, converts form value to title case, verifies if data already exists in storage and creates a button if it is not
$("#searchBtn").on("click", function () {

    var citySearched = titleCase($("#searchCity").val());

    if (!savedSearch.includes(citySearched)) {

        var createBtn = $(`<button class="list-group-item" data-city="${citySearched}">${citySearched}</button>`);

        $("#btnContainer").prepend(createBtn);

        savedSearch.push(citySearched);

        localStorage.setItem("PreviousForecastSearches", JSON.stringify(savedSearch));
    }

    retrieveWeather(citySearched);
});

// Adds functionality to the buttons generated in the list group, uses the data-city value passed into each button to get value
$("#cities-list").on("click", "button", function () {

    var citySearched = $(this).data("city");

    retrieveWeather(citySearched);
});

// Allows the clearBtn to remove all app data stored in PreviousForecastSearches, returns its value to an empty array, removes the list group buttons and then rehides the weather display section of the page
$("#clearBtn").on("click", function () {

    localStorage.removeItem("PreviousForecastSearches");

    savedSearch = []
    
    $(".list-group-item").remove();

    $("#display-weather").addClass("d-none");
});