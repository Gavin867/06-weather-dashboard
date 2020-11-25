var apiKey = "c91773251f63db01df3cd6ca70045ea5";

var savedSearch = JSON.parse(localStorage.getItem("Previous Searches")) || [];


for (i = 0; i < savedSearch.length; i++) {

    var createBtn = $(`<button class="list-group-item" data-city="${savedSearch[i]}">${savedSearch[i]}</button>`);

    $("#btnContainer").prepend(createBtn);
}


function getDate(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + "/" + date + "/" + year;
    return time;
}


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

            for (i = 0; i < 5; i++) {

                $("#forcastDate" + i).text(getDate(oneCallResults.daily[i].dt));

                $("#forcastIcon" + i).attr("src", "https://openweathermap.org/img/wn/" + (oneCallResults.daily[i].weather[0].icon) + "@2x.png");

                $("#forcastTemp" + i).text("Temp: " + oneCallResults.daily[i].temp.day + "° F");

                $("#forcastHumidity" + i).text("Humidity: " + oneCallResults.daily[i].humidity + "%");
            }
        })
}


// Search city onclick of search button
$("#searchBtn").on("click", function () {

    var citySearched = $("#searchCity").val();

    var createBtn = $(`<button class="list-group-item" data-city="${citySearched}">${citySearched}</button>`);

    $("#btnContainer").prepend(createBtn);

    savedSearch.push(citySearched);

    localStorage.setItem("Previous Searches", JSON.stringify(savedSearch));

    retrieveWeather(citySearched);
});


$("#cities-list").on("click", "button", function () {

    var citySearched = $(this).data("city");

    retrieveWeather(citySearched);
});


// $("#clearBtn").on("click", "button", function () {

//    // Clear the local storage
//    window.localStorage.clear();

//    // Remove the <ul> element from html
// //    ulElement.remove();
// });
