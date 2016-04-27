var React = require('react');
var Moment
var CurrentWeather = require('./CurrentWeather.jsx');
var Forecast = require('./Forecast.jsx');

//var countries = require('country-data').countries;

var HTTP = require('../services/httpservice.js')

var CurrentWeatherURL = 'weather?id=1809858&APPID=0714f981f51874d28ea137e3c989f0a3&units=imperial';



var Weather = React.createClass({
    getInitialState: function() {
        return {
            WeatherNow:"",
            value:"",
        };
    },
    componentDidMount: function() {
        HTTP.get(CurrentWeatherURL)
        .then(function(data) {
            this.setState({WeatherNow:data});
        }.bind(this));
    },
    render: function() {
      console.log(this.state.WeatherNow);
      console.log(this.state.WeatherNow.name);
      console.log(this.state.WeatherNow.sys);
      //console.log(this.state.WeatherNow.sys.country);





      var currentWeatherBackground = {
          backgroundColor: '#ec4444',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'

      }

      var fixTable = {
          padding: 0
      }

      if (this.props.bgColor)
          currentWeatherBackground.backgroundColor = this.props.bgColor;

        return(
            <div className="col-xs-4">
                <div className="panel panel-default">
                    <div>

                    </div>
                    <div className="panel-body"  style={currentWeatherBackground}>
                        <div className="row">
                            <div className="col-xs-10">
                                <input className="form-control" placeholder={this.state.WeatherNow.name} value={this.state.value}/>
                            </div>
                            <div className="col-xs-2">
                                <button className="btn btn-default btn-xs"><span className="glyphicon glyphicon-search"></span></button>
                            </div>
                            <p>{(this.state.WeatherNow.name)}</p>
                        </div>
                        <div className="row">
                            <CurrentWeather />
                        </div>

                    </div>
                    <div className="row">
                        <div>
                            <Forecast />
                        </div>

                    </div>

                </div>
            </div>

        );
    }
});

module.exports = Weather;
