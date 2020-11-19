var apiKey = "c91773251f63db01df3cd6ca70045ea5";

var todaysDate = moment().format("MM/DD/YYYY");

function retrieveWeather(city) {
    console.log("Button Click")

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (results) {

            var farenheitTemp = (results.main.temp - 273.15) * 1.80 + 32;

            console.log(results);

            $("#currentCityName").text(results.name);

            $("#currentDay").text(todaysDate);

            $("#mainIcon").attr("src", "http://openweathermap.org/img/wn/" + (results.weather[0].icon) + "@2x.png");

            $("#currentCityTemp").text(farenheitTemp);

            $("#currenCityHumidity").text(results.main.humidity);

            $("#windSpeed").text(results.wind.speed);

            // $("#uvIndex").text(results.name)



            retrieveUVfiveday(results.coord.lat, results.coord.lon);
        })
}

function retrieveUVfiveday(lattitude, longitude) {



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

// City name is prepended to <ul>

// ajax call retrieves current weather data and the 5 day forceast

// render current weather data into the mainDisplay

// render 5 day forcast into each card 

