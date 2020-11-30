# 06-weather-dashboard

## Project Goals

* Create an application which queries openweathermap.org and then renders weather forecast data to the dashboard
    * User inputs value for searching forecast
        * Function uses form value for search
        * Title case function corrections capitalization errors upon clicking search
    * User clicks search button and initiates API queries into openweathermap.org
        * First API call uses Current Weather API to retrieve data and icon for main card
        * Second API call uses One Call API after recieving lat long coordinate from first to retrieve UV Index and 5 day forecast
    * Searches generate a button in the side bar which persist on page reloading and can be used to pull up data on previous search values
        * Search function triggers process using template literals to generate buttons
        * City name values are parsed into an array using local storage
        * Separate function references storage and usese city values and template literals to repopulate the buttons
        * Buttons search weather when clicked
        * Application recognizes duplicate entries, it will search the weather, but not create duplicate bottons
    * Displays weather data on the dashboard
        * Removes bootstrap css 'd-none'/hide class on html 'weather display' elements
        * Weather retrieval functions modify text and css on 'weather display' elements
    * Is capable of clearing data from previous searches
        * Clear function removes all data under the application's memory key
        * Removes the html buttons that were generated
        * Reinstates the bootstrap hide on 'weather display' elements
    * Is presentable on smaller screens
        * Uses bootstrap columns with screen size values specified

## Project Location

* [GitHub Repo](https://github.com/Gavin867/06-weather-dashboard)
* [Published Site](https://gavin867.github.io/06-weather-dashboard/)

## Project Demo

![Demo](https://github.com/Gavin867/06-weather-dashboard/blob/main/Assets/Images/wd-demo-1200px.gif)