var React = require('react');
var moment = require('moment'); // moment.js - Parse, validate, manipulate, and display dates in JavaScript.
var countries = require('country-data').countries; //used this package to convert country code to country name - https://github.com/OpenBookPrices/country-data/
var CurrentWeather = require('./CurrentWeather.jsx');
var Forecast = require('./Forecast.jsx');
var HTTP = require('../services/httpservice.js')

//URL to call current weather data by city id for default location - Guangzhou, China
var CurrentWeatherURL = 'weather?id=1809858&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial';
//URL to call 4 day / daily forecast data by city id for default location - Guangzhou, China
var ForecastWeatherURL = 'forecast/daily?id=1809858&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial&cnt=4';


var Weather = React.createClass({
    getInitialState: function() {
        var localTime = (Math.floor(Date.now() / 1000));
        //var urlAPIID = "&APPID=0714f981f51874d28ea137e3c989f0a3";
        return {
            //WeatherNow:"",
            value:"",
            //locationLookup:"",
            //LookUpCity:"",
            //LookUpCityURL:"",
            //localTime: localTime,
            //urlCurrent:"weather?id=",
            //urlCity:"1809858",
            //urlAPIID: urlAPIID,
            //urlUnits:"&units=imperial",
        };
    },
    componentWillMount: function() {
        //Call current weather data for default location
        HTTP.get(CurrentWeatherURL)
        .then(function(data) {
            this.setState({WeatherNow:data});
        }.bind(this));
        //Call forecast weather data for default location
        HTTP.get(ForecastWeatherURL)
        .then(function(data) {
            this.setState({Forecast:data});
        }.bind(this));
    },
    onChange: function(e) {
        this.setState({value: e.target.value});
    },
    getCityID: function() {
        //called when user clicks 'search' - Use the 'accurate' parameter with the users search text as the city country parameter in the URL to call OpenWeatherMap and look for the city ID - city id parameter will then be used in getWeather function
        console.log("We Got to getCityID");
        locationLookup = this.state.value;
        console.log(locationLookup);
        // example url to get city id for Beijing China - var LookUpCityURL = "find?q=beijing,china&type=accurate&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial";
        var LookUpCityURL = ("find?q=" + (locationLookup) +  "&type=accurate&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial");
        console.log(LookUpCityURL);
        HTTP.get(LookUpCityURL)
        .then(function(data) {
            this.setState({LookUpCity:data});
        }.bind(this));


    },
    getWeather: function() {
        console.log("we got to getWeather");
        //build the URL with the city id to get current weather - var CurrentWeatherURL = "weather?id=1816670&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial";
        var CurrentWeatherURL = ("weather?id=" + (this.state.LookUpCity.list[0].id) + "&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial")
        HTTP.get(CurrentWeatherURL)
        .then(function(data) {
            this.setState({WeatherNow:data});
        }.bind(this));
        //build the URL with the city id to get forecast  -var ForecastWeatherURL = 'forecast/daily?id=1809858&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial&cnt=4';
        var ForecastWeatherURL = ("forecast/daily?id=" + (this.state.LookUpCity.list[0].id) + "&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial&cnt=4");
        HTTP.get(ForecastWeatherURL)
        .then(function(data) {
            this.setState({Forecast:data});
        }.bind(this));

    },
    toTextualDescription: function(degree) {
        // Change degree to text descrition - got this code from here: http://stackoverflow.com/questions/36475255
        if (degree>337.5) return 'NORTH';
        if (degree>292.5) return 'NORTH WEST';
        if(degree>247.5) return 'WEST';
        if(degree>202.5) return 'SOUTH WEST';
        if(degree>157.5) return 'SOUTH';
        if(degree>122.5) return 'SOUTH EAST';
        if(degree>67.5) return 'EAST';
        if(degree>22.5){return 'NORTH EAST';}
        return 'NORTH';
    },
    toWindCardinal: function(windDirection) {
        if (windDirection=='NORTH') return 'wi-towards-n';
        if (windDirection=='NORTH WEST') return 'wi-towards-nw';
        if (windDirection=='WEST') return 'wi-towards-w';
        if (windDirection=='SOUTH WEST') return 'wi-towards-sw';
        if (windDirection=='SOUTH') return 'wi-towards-s';
        if (windDirection=='SOUTH EAST') return 'wi-towards-se';
        if (windDirection=='EAST') return 'wi-towards-e';
        if (windDirection=='NORTH EAST') {return 'wi-towards-ne';}
        return 'wi-towards-e';
    },
    clearState: function() {
        this.setState({LookUpCity:""});
        this.setState({value:""});
    },

    render: function() {
        //var timeTest = moment.unix(1462848402).format('dddd, MMMM Do YYYY, h:mm:ss a');
        //console.log(timeTest);
        // use moment.js to get time
        var localTime = moment().unix();
        console.log(localTime);

        if (this.state.WeatherNow) {
            //var cityID = this.state.WeatherNow.list[0].id
            var cityName = this.state.WeatherNow.name;
            var cityIDCurrent = this.state.WeatherNow.id;
            var countryCode = this.state.WeatherNow.sys.country;
            //use https://github.com/OpenBookPrices/country-data/ package to convert country code returned by OpenWeatherMap api to full country name
            var countryName= countries[countryCode].name;
            //console.log(countryName);
            //console.log(cityID);
            console.log(this.state.WeatherNow.weather[0].id);
            var weatherNowID = this.state.WeatherNow.weather[0].id;
            console.log(this.state.WeatherNow.main.temp);
            var weatherNowTemp = (Math.ceil(this.state.WeatherNow.main.temp) + "°");
            console.log(weatherNowTemp);
            var windDirection = this.toTextualDescription(this.state.WeatherNow.wind.deg);
            console.log(windDirection);
            var localTime = this.state.WeatherNow.dt;
            console.log(this.state.WeatherNow.dt);
            var windSpeed = (Math.ceil(this.state.WeatherNow.wind.speed) + " MPH");
            console.log(this.state.WeatherNow.wind.speed);
            var windCardinal = "wi wi-wind" + " " + (this.toWindCardinal(windDirection));
            console.log(windCardinal);


        } else {
                var cityName = "Loading";
                var countryName = "Loading";
        }

      if (this.state.Forecast) {
          //I should have used .map to parse the array returned for from OpenWeatherMap for the forecast call. I hope to update this later
          console.log('we got the default Forecast')
          console.log(this.state.Forecast);
          console.log(this.state.Forecast.list[0].dt);
          ForecastDate0 = moment.unix(this.state.Forecast.list[0].dt).format('D MMMM');
          console.log(ForecastDate0);
          ForecastDate1 = moment.unix(this.state.Forecast.list[1].dt).format('D MMMM');
          console.log(ForecastDate1);
          ForecastDate2 = moment.unix(this.state.Forecast.list[2].dt).format('D MMMM');
          console.log(ForecastDate2);
          ForecastDate3 = moment.unix(this.state.Forecast.list[3].dt).format('D MMMM');
          console.log(ForecastDate3);
          console.log(this.state.Forecast.list[0].weather[0].id);
          ForecastWeatherID0 = this.state.Forecast.list[0].weather[0].id;
          ForecastWeatherID1 = this.state.Forecast.list[1].weather[0].id;
          ForecastWeatherID2 = this.state.Forecast.list[2].weather[0].id;
          ForecastWeatherID3 = this.state.Forecast.list[3].weather[0].id;
          console.log(this.state.Forecast.list[0].temp.min);
          console.log(this.state.Forecast.list[0].temp.max);
          var ForecastTempMinMax0 = (Math.ceil(this.state.Forecast.list[0].temp.min) + "°" + " " + "/" + " " + Math.ceil(this.state.Forecast.list[0].temp.max)+ "°");
          var ForecastTempMinMax1 = (Math.ceil(this.state.Forecast.list[1].temp.min) + "°" + " " + "/" + " " + Math.ceil(this.state.Forecast.list[1].temp.max)+ "°");
          var ForecastTempMinMax2 = (Math.ceil(this.state.Forecast.list[2].temp.min) + "°" + " " + "/" + " " + Math.ceil(this.state.Forecast.list[2].temp.max)+ "°");
          var ForecastTempMinMax3 = (Math.ceil(this.state.Forecast.list[3].temp.min) + "°" + " " + "/" + " " + Math.ceil(this.state.Forecast.list[3].temp.max)+ "°");
          console.log(ForecastTempMinMax0);
      } else {
            var ForecastDate0 = "Loading";
            var ForecastDate1 = "Loading";
            var ForecastDate2 = "Loading";
            var ForecastDate3 = "Loading";
            var ForecastWeatherID0 = "Loading";
            var ForecastWeatherID1 = "Loading";
            var ForecastWeatherID2 = "Loading";
            var ForecastWeatherID3 = "Loading";
            var ForecastTempMinMax0 = "Loading";
            var ForecastTempMinMax1 = "Loading";
            var ForecastTempMinMax2 = "Loading";
            var ForecastTempMinMax3 = "Loading";
      }

      if (this.state.LookUpCity) {
          //The following section is to get the city id from the search parameter
          console.log(this.state.LookUpCity);
          if (this.state.LookUpCity.cod == '404') {
              console.log("The search query is invalid; openweathermap returns 404");
              alert("Your search could not be processed. Please enter a city and country sepertated by a comma. e.g. New York, USA -- Beijing, China")
              //this.setState({LookUpCity:""});
              //this.componentWillMount();
              //this.getWeather();
              this.clearState();
          } else if (this.state.LookUpCity.count == '0') {
            console.log("The search query is invalid; openweathermap returns count 0");
            alert("Your search could not be processed. Please enter a city and country sepertated by a comma. e.g. New York, USA -- Beijing, China")
            //this.setState({LookUpCity:""});
            this.clearState();
          } else {
                if (this.state.LookUpCity.list[0].id) {
                    console.log("the api returned a cityID")
                    var cityID = this.state.LookUpCity.list[0].id
                    console.log(cityID);
                    console.log(cityIDCurrent);
                    if (cityID != cityIDCurrent) {
                        this.getWeather();
                    } else {
                        console.log("evaluation failed");
                        console.log(this.state.WeatherNow);
                    }
                } else {
                    console.log("the api did NOT return a cityID")
                    alert("The system could not match a city with the city and country you entered. Check your spelling and try again. -- Please enter a city and country sepertated by a comma. e.g. New York, USA -- Beijing, China.")
                    //this.setState({LookUpCity:""});
                    //this.componentWillMount();
                    this.clearState();
                }
          }

      } else {
        console.log("we could not get LookUpCity");
      }

      var currentWeatherBackground = {
          backgroundColor: '#79b8af',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'

      }

      var fixTable = {
          padding: 0
      }

      var fixDate = {
          textAlign: 'left',
          fontSize: 12,
          marginLeft: 5
      }
      var fixSearch = {
          marginLeft: -15
      }



      if (this.props.bgColor)
          currentWeatherBackground.backgroundColor = this.props.bgColor;

        return(
            <div className="col-xs-3">
                <div className="panel panel-default">
                    <div>

                    </div>
                    <div className="panel-body"  style={currentWeatherBackground}>
                        <div className="row">
                            <div className="col-xs-10">
                                <input className="form-control" placeholder={(cityName)  + ", " + (countryName)} onChange={this.onChange} value={this.state.value}/>
                            </div>
                            <div className="col-xs-2" style={fixSearch}>
                                <button className="btn btn-default btn-sm" onClick={this.getCityID}><span className="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                            </div>

                        </div>
                        <div className="row" style={fixDate}>
                            <p>Current Weather Data for: {cityName}, {countryName} <br/>{moment.unix(localTime).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                        </div>


                        <div className="row">
                            <CurrentWeather weatherID={weatherNowID} tempNow={weatherNowTemp} windDirection={windDirection} windSpeed={windSpeed} windCardinal={windCardinal}/>
                        </div>

                    </div>
                    <div className="row">
                        <div>
                            <Forecast day1={ForecastDate0} day2={ForecastDate1} day3={ForecastDate2} day4={ForecastDate3} id1={ForecastWeatherID0} id2={ForecastWeatherID1} id3={ForecastWeatherID2} id4={ForecastWeatherID3} temp1={ForecastTempMinMax0} temp2={ForecastTempMinMax1} temp3={ForecastTempMinMax2} temp4={ForecastTempMinMax3}/>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
});

module.exports = Weather;
