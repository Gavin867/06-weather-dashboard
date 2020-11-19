var apiKey = "c91773251f63db01df3cd6ca70045ea5";

var todaysDate = moment().format("MM/DD/YYYY");

function retrieveWeather() {
    console.log("Button Click")

    var citySearched = $("#searchCity").val();

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + apiKey;

    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {

            var results = response;

            var farenheitTemp = (results.main.temp - 273.15) * 1.80 + 32;

            console.log(results);

            $("#currentCityName").text(results.name);

            $("#currentDay").text(todaysDate);

            // variable to grab icon data
            // var mainIconDisplay = 

            // $("#mainIcon").text(mainIconDisplay)

            $("#currentCityTemp").text(farenheitTemp);

            $("#currenCityHumidity").text(results.main.humidity);

            $("#windSpeed").text(results.wind.speed);

            // $("#uvIndex").text(results.name)
        })
}

// Search city onclick of search button
$("#searchBtn").on("click", function () {
    retrieveWeather()

});



// City name is prepended to <ul>

// ajax call retrieves current weather data and the 5 day forceast

// render current weather data into the mainDisplay

// render 5 day forcast into each card 

