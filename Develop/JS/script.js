var apiKey = "c91773251f63db01df3cd6ca70045ea5"

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

            console.log(results);

            $("#currentCityName").text(results.name)

            var todaysDate = new Date(results.dt).toLocaleDateString("en-US")
            console.log(todaysDate);

            $("#currentDay").text(todaysDate);

            // variable to grab icon data
            // var mainIconDisplay = 

            $("#mainIcon").text(mainIconDisplay)

            $("#currentCityTemp").text(results.name)

            $("#windSpeed").text(results.name)

            $("#uvIndex").text(results.name)
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

