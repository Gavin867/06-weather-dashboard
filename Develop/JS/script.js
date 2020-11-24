var apiKey = "c91773251f63db01df3cd6ca70045ea5";

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
    // console.log("Button Click")

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (results) {

            console.log(results);

            var currentDate = getDate(results.dt);

            console.log(currentDate);

            $("#currentCityName").text(results.name);

            $("#currentDay").text(currentDate);

            $("#mainIcon").attr("src", "http://openweathermap.org/img/wn/" + (results.weather[0].icon) + "@2x.png");

            $("#currentCityTemp").text(results.main.temp);

            $("#currenCityHumidity").text(results.main.humidity);

            $("#windSpeed").text(results.wind.speed);

            retrieveUVfiveday(results.coord.lat, results.coord.lon);
        })
}

function retrieveUVfiveday(lattitude, longitude) {

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&exclude=minutely,hourly,alerts&appid=" + apiKey + "&units=imperial";

    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (oneCallResults) {

            console.log(oneCallResults);

            $("#uvIndex").text(oneCallResults.current.uvi);

            for (i = 0; i < 5; i++) {

                $("#forcastDate" + i).text(getDate(oneCallResults.daily[i].dt));

                $("#forcastIcon" + i).attr("src", "http://openweathermap.org/img/wn/" + (oneCallResults.daily[i].weather[0].icon) + "@2x.png");

                $("#forcastTemp" + i).text(oneCallResults.daily[i].temp.day);

                $("#forcastHumidity" + i).text(oneCallResults.daily[i].humidity);
            }
        })
}

// Search city onclick of search button
$("#searchBtn").on("click", function () {

    var citySearched = $("#searchCity").val();

    var createBtn = $(`<button class="list-group-item" data-city="${citySearched}">${citySearched}</button>`);

    $("#btnContainer").prepend(createBtn);

    retrieveWeather(citySearched);

});

$("#cities-list").on("click", "button", function () {

    var citySearched = $(this).data("city");

    retrieveWeather(citySearched);
});

